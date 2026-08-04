import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely, so conditional classes never conflict.
 * Used throughout every component: cn("base-class", condition && "extra-class")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
