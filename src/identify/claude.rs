use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct Message {
    role: String,
    content: String,
}

#[derive(Serialize)]
struct MessageRequest {
    model: String,
    max_tokens: u32,
    system: String,
    messages: Vec<Message>,
}

#[derive(Deserialize)]
struct TextContent {
    #[serde(rename = "type")]
    content_type: String,
    text: String,
}

#[derive(Deserialize)]
struct MessageResponse {
    content: Vec<TextContent>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryIdentification {
    pub library_name: Option<String>,
    pub module_path: Option<String>,
    pub cleartext_name: Option<String>,
    pub confidence: f64,
    pub reasoning: String,
}

pub struct ClaudeClient {
    client: reqwest::Client,
    api_key: String,
    model: String,
}

impl ClaudeClient {
    pub fn new(api_key: String) -> Self {
        Self {
            client: reqwest::Client::new(),
            api_key,
            model: "claude-sonnet-4-20250514".to_string(), // Fast and capable
        }
    }

    pub fn with_model(mut self, model: &str) -> Self {
        self.model = model.to_string();
        self
    }

    pub async fn identify_library(
        &self,
        minified_name: &str,
        module_code: &str,
        strings: &[String],
        signature: Option<&str>,
    ) -> Result<LibraryIdentification> {
        let system_prompt = r#"You are an expert at identifying JavaScript libraries from minified code.
Given a minified module from a webpack bundle, identify what library/package it comes from.

You MUST respond with valid JSON in this exact format:
{
  "library_name": "library-name or null if unknown",
  "module_path": "original/module/path or null",
  "cleartext_name": "originalFunctionName or null",
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation"
}

Common libraries to look for:
- rxjs (Observable, Subject, operators like map, filter, switchMap)
- lodash (utility functions like debounce, throttle, merge, cloneDeep)
- @anthropic-ai/sdk (Claude API client)
- zod (schema validation)
- commander/yargs (CLI parsing)
- chalk/colors (terminal colors)
- express/fastify/koa (web frameworks)
- node core modules (fs, path, http, crypto, etc.)
- typescript helpers (__awaiter, __generator, __spreadArray)

Look for:
1. Distinctive error messages
2. Export patterns (__esModule, Object.defineProperty)
3. Function signatures and patterns
4. String literals that reveal purpose"#;

        let strings_preview: Vec<&str> = strings.iter().take(20).map(|s| s.as_str()).collect();
        let code_preview = if module_code.len() > 2000 {
            &module_code[..2000]
        } else {
            module_code
        };

        let user_prompt = format!(
            r#"Identify this minified module:

Minified name: {}
Signature: {}
Key strings: {:?}

Code snippet:
```javascript
{}
```

Respond with JSON only."#,
            minified_name,
            signature.unwrap_or("unknown"),
            strings_preview,
            code_preview
        );

        let request = MessageRequest {
            model: self.model.clone(),
            max_tokens: 500,
            system: system_prompt.to_string(),
            messages: vec![Message {
                role: "user".to_string(),
                content: user_prompt,
            }],
        };

        let response = self
            .client
            .post("https://api.anthropic.com/v1/messages")
            .header("x-api-key", &self.api_key)
            .header("anthropic-version", "2023-06-01")
            .header("content-type", "application/json")
            .json(&request)
            .send()
            .await
            .context("Failed to send request to Claude API")?;

        if !response.status().is_success() {
            let status = response.status();
            let body = response.text().await.unwrap_or_default();
            anyhow::bail!("Claude API error {}: {}", status, body);
        }

        let message: MessageResponse = response
            .json()
            .await
            .context("Failed to parse Claude response")?;

        let text = message
            .content
            .first()
            .map(|c| c.text.as_str())
            .unwrap_or("{}");

        // Extract JSON from response (handle markdown code blocks)
        let json_text = if text.contains("```json") {
            text.split("```json")
                .nth(1)
                .and_then(|s| s.split("```").next())
                .unwrap_or(text)
        } else if text.contains("```") {
            text.split("```")
                .nth(1)
                .and_then(|s| s.split("```").next())
                .unwrap_or(text)
        } else {
            text
        };

        let identification: LibraryIdentification = serde_json::from_str(json_text.trim())
            .with_context(|| format!("Failed to parse identification JSON: {}", json_text))?;

        Ok(identification)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_identification() {
        let json = r#"{
            "library_name": "rxjs",
            "module_path": "rxjs/internal/util/isFunction",
            "cleartext_name": "isFunction",
            "confidence": 0.95,
            "reasoning": "The function checks typeof === 'function'"
        }"#;

        let id: LibraryIdentification = serde_json::from_str(json).unwrap();
        assert_eq!(id.library_name, Some("rxjs".to_string()));
        assert_eq!(id.cleartext_name, Some("isFunction".to_string()));
    }
}
