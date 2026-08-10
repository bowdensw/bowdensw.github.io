export const connections = [
    // Foundation to Hub (single direction only)
    ["java", "git"],
    ["java", "dsa"],
    ["java", "discrete"],
    ["java", "oop"],
    ["oop", "git"],
    ["oop", "dsa"],
    ["dsa", "discrete"],
    ["oop", "despatterns"],

    // Academic Path - Expanded Math Section
    ["discrete", "multicalc"],
    ["discrete", "linalg"],
    ["discrete", "probstats"],
    ["multicalc", "linalg"],
    ["linalg", "probstats"],
    ["probstats", "r"],
    ["r", "dataAnal"],
    ["dataAnal", "python"],
    ["python", "pytorch"],
    ["pytorch", "nn"],
    ["nn", "cogpsych"],


    // Systems Path (right arc) - single direction only
    ["oop", "arch"],
    ["arch", "assembly"],
    ["assembly", "c"],
    ["c", "cpp"],
    ["cpp", "csharp"],
    ["cpp", "despatterns"],
    ["csharp", "godot"],
    ["godot", "unreal"],
    ["unreal", "cpp"],
    ["cpp", "dsa"],
    ["cpp", "oop"],

    // Web Dev Path (bottom arc)
    ["java", "html"],
    ["html", "css"],
    ["css", "js"],
    ["js", "typescript"],
    ["typescript", "react"],
    ["react", "node"],
    ["react", "nextjs"],
    ["node", "nextjs"],
    ["node", "rest"],
    ["node", "express"],
    ["rest", "express"],
    ["node", "sql"],
    ["sql", "mongo"],
    ["mongo", "redis"],
    ["sql", "docker"],
    ["mongo", "docker"],
    ["docker", "redis"],

    // Design & Testing Branch
    ["react", "figma"],
    ["figma", "testing"],
    ["git", "testing"],

    // Key Hub Connections
    ["python", "git"],
    ["cpp", "git"],
    ["js", "git"],

    // Meaningful Cross-Connections
    ["cogpsych", "unreal"],     // Cognitive Psychology + Game Design (UX/player psychology)
    ["cogpsych", "figma"],      // Cognitive Psychology + HCI/Design
    ["python", "js"],           // Python to JavaScript (both scripting)
    ["express", "mongo"],       // Backend stack
    ["typescript", "testing"],  // TypeScript supports better testing
    ["redis", "testing"],       // Redis used in testing environments

    //TBD connections
    ["express", "tbd_web1"],
    ["tbd_web1", "mongo"],
    ["tbd_web1", "tbd_web2"],
    ["redis", "tbd_web2"],
    ["tbd_web2", "tbd_web3"],
    ["tbd_web3", "testing"],
    ["tbd_web3", "tbd_web4"],
    ["tbd_web4", "testing"],
    ["tbd_web3", "tbd_web5"],
    ["tbd_web4", "tbd_web5"],

    ["figma", "tbd_des1"],
    ["figma", "tbd_des2"],
    ["tbd_des1", "tbd_des3"],
    ["tbd_des2", "tbd_des3"],

    ["c", "tbd_sys1"],
    ["cpp", "tbd_sys1"],
    ["cpp", "tbd_sys2"],
    ["csharp", "tbd_sys2"],
    ["tbd_sys1", "tbd_sys3"],
    ["tbd_sys2", "tbd_sys3"],

    ["dataAnal", "tbd_aca1"],
    ["python", "tbd_aca1"],
    ["pytorch", "tbd_aca1"],
    ["nn", "tbd_aca1"],


];