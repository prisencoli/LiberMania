// Book type
export type Book = {
  id: string;
  title: string;
  author: string;
  genre?: string;
  coverUrl: string;
  currentPage?: number;
  totalPages?: number;
};

// Collection type
export type Collection = {
  id: string;
  name: string;
  coverUrl: string;
  books: {
    id: string;
    title: string;
    coverUrl: string;
  }[];
};

// User type
export type User = {
  id: string;
  username: string;
  email: string;
  profileImageUrl?: string;
};

// Reading Progress type
export type ReadingProgress = {
  id: string;
  bookId: string;
  userId: string;
  currentPage: number;
  totalPages: number;
  lastReadAt: Date;
};

// Category type
export type Category = {
  id: string;
  name: string;
  count: number;
};

// Reading Statistics type
export type ReadingStatistics = {
  booksRead: number;
  booksReadTrend: {
    value: string;
    isPositive: boolean;
  };
  readingTime: string;
  pagesRead: number;
  pagesReadTrend: {
    value: string;
    isPositive: boolean;
  };
};
