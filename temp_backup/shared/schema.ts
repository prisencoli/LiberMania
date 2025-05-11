import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Books table
export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  genre: text("genre"),
  coverUrl: text("cover_url").notNull(),
  totalPages: integer("total_pages").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookSchema = createInsertSchema(books).omit({
  id: true,
  createdAt: true,
});

// Reading Progress table
export const readingProgress = pgTable("reading_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  bookId: integer("book_id").notNull().references(() => books.id),
  currentPage: integer("current_page").notNull().default(0),
  lastReadAt: timestamp("last_read_at").defaultNow().notNull(),
});

export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({
  id: true,
  lastReadAt: true,
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

// Book Categories table (many-to-many)
export const bookCategories = pgTable("book_categories", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull().references(() => books.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
});

export const insertBookCategorySchema = createInsertSchema(bookCategories).omit({
  id: true,
});

// Collections table
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id").notNull().references(() => users.id),
  coverUrl: text("cover_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  createdAt: true,
});

// Collection Books table (many-to-many)
export const collectionBooks = pgTable("collection_books", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").notNull().references(() => collections.id),
  bookId: integer("book_id").notNull().references(() => books.id),
});

export const insertCollectionBookSchema = createInsertSchema(collectionBooks).omit({
  id: true,
});

// Reading Statistics table
export const readingStatistics = pgTable("reading_statistics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  booksRead: integer("books_read").notNull().default(0),
  readingTime: integer("reading_time").notNull().default(0), // in minutes
  pagesRead: integer("pages_read").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  monthlyStats: jsonb("monthly_stats").default({}).notNull(), // Store monthly statistics as JSON
});

export const insertReadingStatisticsSchema = createInsertSchema(readingStatistics).omit({
  id: true,
  updatedAt: true,
});

// Define types for all schemas
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Book = typeof books.$inferSelect;
export type InsertBook = z.infer<typeof insertBookSchema>;

export type ReadingProgress = typeof readingProgress.$inferSelect;
export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type BookCategory = typeof bookCategories.$inferSelect;
export type InsertBookCategory = z.infer<typeof insertBookCategorySchema>;

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type CollectionBook = typeof collectionBooks.$inferSelect;
export type InsertCollectionBook = z.infer<typeof insertCollectionBookSchema>;

export type ReadingStatistic = typeof readingStatistics.$inferSelect;
export type InsertReadingStatistic = z.infer<typeof insertReadingStatisticsSchema>;
