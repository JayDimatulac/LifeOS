import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BookStatus, LibraryBook } from './types';

interface BooksState {
  books: LibraryBook[];
  addBook: (
    title: string,
    author: string,
    totalPages: number,
    status: BookStatus,
    coverImage?: string
  ) => void;
  updateProgress: (id: string, currentPage: number) => void;
  setStatus: (id: string, status: BookStatus) => void;
  setCoverImage: (id: string, coverImage: string) => void;
  removeBook: (id: string) => void;
}

const defaultBooks: LibraryBook[] = [];

export const useBooksStore = create<BooksState>()(
  persist(
    (set) => ({
      books: defaultBooks,

      addBook: (title, author, totalPages, status, coverImage) =>
        set((state) => ({
          books: [
            ...state.books,
            {
              id: crypto.randomUUID(),
              title,
              author,
              totalPages: Math.max(1, totalPages),
              currentPage: 0,
              status,
              coverImage,
            },
          ],
        })),

      updateProgress: (id, currentPage) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === id ? { ...b, currentPage: Math.min(Math.max(0, currentPage), b.totalPages) } : b
          ),
        })),

      setStatus: (id, status) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === id ? { ...b, status } : b)),
        })),

      setCoverImage: (id, coverImage) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === id ? { ...b, coverImage } : b)),
        })),

      removeBook: (id) =>
        set((state) => ({ books: state.books.filter((b) => b.id !== id) })),
    }),
    { name: 'lifeos-library' }
  )
);