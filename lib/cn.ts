/**
 * Join class names, dropping falsy values.
 *
 * Deliberately dependency-free so the project builds before shadcn/ui is
 * installed. Once `npm install clsx tailwind-merge` has run (shadcn init does
 * this for you), this can become the standard implementation:
 *
 *   import { clsx, type ClassValue } from "clsx";
 *   import { twMerge } from "tailwind-merge";
 *   export function cn(...inputs: ClassValue[]) {
 *     return twMerge(clsx(inputs));
 *   }
 *
 * Until then: do not rely on later classes overriding earlier ones. Conflicting
 * Tailwind utilities are not resolved here — write them so they don't collide.
 */
export type ClassValue = string | number | null | false | undefined;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
