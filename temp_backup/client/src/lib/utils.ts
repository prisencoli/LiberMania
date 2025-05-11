import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function loadCSSFromString(cssString: string) {
  // Create a style element
  const style = document.createElement('style');
  style.textContent = cssString;
  
  // Append to the document head
  document.head.appendChild(style);
  
  return style;
}
