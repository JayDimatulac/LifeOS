import type { LibraryBook } from "./types";

export function progressPercent(book: LibraryBook): number {
  if (book.totalPages <= 0) return 0;
  return Math.round((book.currentPage / book.totalPages) * 100);
}