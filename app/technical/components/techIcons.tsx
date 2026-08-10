// Import skills data to automatically extract icon mappings
import {skills} from "./skills";

// Automatically build icon mapping from skills data
export const techIcons: Record<string, string> = skills.reduce((acc, skill) => {
    if (skill.img) {
        // Use the skill ID as the key
        acc[skill.id.toLowerCase()] = skill.img;

        // Also add the label as a key for easier matching
        const labelKey = skill.label.toLowerCase().replace(/[.\s+/]/g, "");
        acc[labelKey] = skill.img;
    }
    return acc;
}, {} as Record<string, string>);

// Helper function to get icon by skill ID or name (case-insensitive)
export function getTechIcon(techName: string): string | undefined {
    // Normalize the input (lowercase, remove spaces/dots/slashes)
    const normalized = techName.toLowerCase().replace(/[.\s+/]/g, "");

    // Try direct match first
    if (techIcons[normalized]) {
        return techIcons[normalized];
    }

    // Try partial matches for common variations
    const partialMatches: Record<string, string> = {
        "js": "javascript",
        "ts": "typescript",
        "nodejs": "node",
        "nextjs": "nextjs",
        "mongodb": "mongo",
        "restapi": "rest",
        "restfulapis": "rest",
    };

    if (partialMatches[normalized]) {
        return techIcons[partialMatches[normalized]];
    }

    return undefined;
}

// Helper to check if a tech has an icon
export function hasTechIcon(techName: string): boolean {
    return getTechIcon(techName) !== undefined;
}