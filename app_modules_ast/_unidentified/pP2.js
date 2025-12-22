// Module: pP2
// Type: U
// Lines: 421142-421174
//
var pP2 = U((inZ, cP2)=>{
    cP2.exports = {
        $ref: BP2(),
        allOf: abortTask(),
        anyOf: abortTask(),
        $comment: useActionState(),
        const: KP2(),
        contains: abortTask(),
        dependencies: abortTask(),
        enum: zP2(),
        format: renderElement(),
        if: abortTask(),
        items: abortTask(),
        maximum: pushAttribute(),
        minimum: pushAttribute(),
        maxItems: trackPostpone(),
        minItems: trackPostpone(),
        maxLength: trackPostpone(),
        minLength: trackPostpone(),
        maxProperties: trackPostpone(),
        minProperties: trackPostpone(),
        multipleOf: trackPostpone(),
        not: abortTask(),
        oneOf: abortTask(),
        pattern: vP2(),
        properties: abortTask(),
        propertyNames: abortTask(),
        required: abortTask(),
        uniqueItems: preload(),
        validate: createRenderState()
    };
});
