import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertBookSchema, 
  insertUserSchema, 
  insertReadingProgressSchema, 
  insertCollectionSchema 
} from "../shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up API route prefix
  const api = '/api';

  // ==== User Routes ====
  // Register a new user
  app.post(`${api}/users/register`, async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      
      // Remove the password from the response for security
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  // Login user
  app.post(`${api}/users/login`, async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Remove the password from the response for security
      const { password: _, ...userWithoutPassword } = user;
      
      // Store user in session
      (req.session as any).user = userWithoutPassword;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // Get current authenticated user
  app.get(`${api}/users/me`, async (req: Request, res: Response) => {
    try {
      const user = (req.session as any).user;
      if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Logout user
  app.post(`${api}/users/logout`, (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  // ==== Book Routes ====
  // Get all books
  app.get(`${api}/books`, async (_req: Request, res: Response) => {
    try {
      const books = await storage.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      console.error("Error getting books:", error);
      res.status(500).json({ message: "Failed to get books" });
    }
  });

  // Get book by ID
  app.get(`${api}/books/:id`, async (req: Request, res: Response) => {
    try {
      const bookId = parseInt(req.params.id);
      if (isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid book ID" });
      }
      
      const book = await storage.getBookById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.status(200).json(book);
    } catch (error) {
      console.error("Error getting book:", error);
      res.status(500).json({ message: "Failed to get book" });
    }
  });

  // Create a new book
  app.post(`${api}/books`, async (req: Request, res: Response) => {
    try {
      const bookData = insertBookSchema.parse(req.body);
      const book = await storage.createBook(bookData);
      res.status(201).json(book);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid book data", errors: error.errors });
      }
      console.error("Error creating book:", error);
      res.status(500).json({ message: "Failed to create book" });
    }
  });

  // ==== Reading Progress Routes ====
  // Get reading progress by user ID
  app.get(`${api}/reading-progress/user/:userId`, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const progress = await storage.getReadingProgressByUserId(userId);
      res.status(200).json(progress);
    } catch (error) {
      console.error("Error getting reading progress:", error);
      res.status(500).json({ message: "Failed to get reading progress" });
    }
  });

  // Create or update reading progress
  app.post(`${api}/reading-progress`, async (req: Request, res: Response) => {
    try {
      const progressData = insertReadingProgressSchema.parse(req.body);
      const progress = await storage.updateReadingProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      console.error("Error updating reading progress:", error);
      res.status(500).json({ message: "Failed to update reading progress" });
    }
  });

  // ==== Collections Routes ====
  // Get user collections
  app.get(`${api}/collections/user/:userId`, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const collections = await storage.getCollectionsByUserId(userId);
      res.status(200).json(collections);
    } catch (error) {
      console.error("Error getting collections:", error);
      res.status(500).json({ message: "Failed to get collections" });
    }
  });

  // Create a new collection
  app.post(`${api}/collections`, async (req: Request, res: Response) => {
    try {
      const collectionData = insertCollectionSchema.parse(req.body);
      const collection = await storage.createCollection(collectionData);
      res.status(201).json(collection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid collection data", errors: error.errors });
      }
      console.error("Error creating collection:", error);
      res.status(500).json({ message: "Failed to create collection" });
    }
  });

  // Add book to collection
  app.post(`${api}/collections/:collectionId/books/:bookId`, async (req: Request, res: Response) => {
    try {
      const collectionId = parseInt(req.params.collectionId);
      const bookId = parseInt(req.params.bookId);
      
      if (isNaN(collectionId) || isNaN(bookId)) {
        return res.status(400).json({ message: "Invalid collection or book ID" });
      }
      
      await storage.addBookToCollection(collectionId, bookId);
      res.status(200).json({ message: "Book added to collection" });
    } catch (error) {
      console.error("Error adding book to collection:", error);
      res.status(500).json({ message: "Failed to add book to collection" });
    }
  });

  // ==== Categories Routes ====
  // Get all categories
  app.get(`${api}/categories`, async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error getting categories:", error);
      res.status(500).json({ message: "Failed to get categories" });
    }
  });

  // ==== Reading Statistics Routes ====
  // Get user reading statistics
  app.get(`${api}/reading-statistics/user/:userId`, async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const statistics = await storage.getReadingStatisticsByUserId(userId);
      res.status(200).json(statistics);
    } catch (error) {
      console.error("Error getting reading statistics:", error);
      res.status(500).json({ message: "Failed to get reading statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}