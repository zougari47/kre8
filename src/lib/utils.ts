import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

/**
 * Returns an array of page numbers (1-based) and ellipsis strings to render
 * in a pagination control. Always shows the first and last page, the current
 * page and its immediate neighbours, and collapses the rest with "...".
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  const addRange = (start: number, end: number) => {
    for (let i = start; i <= end; i++) pages.push(i);
  };

  pages.push(1);

  if (currentPage <= 4) {
    addRange(2, 5);
    pages.push("...");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push("...");
    addRange(totalPages - 4, totalPages);
  } else {
    pages.push("...");
    addRange(currentPage - 1, currentPage + 1);
    pages.push("...");
    pages.push(totalPages);
  }

  return pages;
}
