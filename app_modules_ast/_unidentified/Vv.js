// Module: Vv
// Type: L
// Lines: 190486-190522
//
var Vv = L(()=>{
    aQ();
    i0();
    v2();
    g1();
    s1();
    ((Dj8 = l(renderElement(), 1)), (dl1 = new Set()));
    ((Fj8 = u.enum([
        "open",
        "resolved"
    ])), (Ej8 = u.object({
        author: u.string(),
        content: u.string()
    })), (zj8 = u.object({
        id: u.string(),
        subject: u.string(),
        description: u.string(),
        owner: u.string().optional(),
        status: Fj8,
        references: u.array(u.string()),
        blocks: u.array(u.string()),
        blockedBy: u.array(u.string()),
        comments: u.array(Ej8)
    })));
    vYB = new Map();
});
var Uj8 = `**DEPRECATED**: This tool is deprecated. Prefer using the new task management tools instead:
- TaskCreate: Create new tasks
- TaskGet: Retrieve task details by ID
- TaskUpdate: Update task status, add comments, or set dependencies
- TaskList: List all tasks

The new tools support team collaboration, task dependencies, and persistent task storage across sessions.

---

`, wj8, qj8, fX;
