export type BookStatus = "reading" | "wishlist" | "finished";

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
  status: BookStatus;
  coverImage?: string; // data URL from an uploaded image
}