import {
  User, InsertUser, Book, InsertBook, ReadingProgress, InsertReadingProgress,
  Category, InsertCategory, Collection, InsertCollection, ReadingStatistic,
  CollectionBook, BookCategory
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Book operations
  getBookById(id: number): Promise<Book | undefined>;
  getAllBooks(): Promise<Book[]>;
  createBook(book: InsertBook): Promise<Book>;
  
  // Reading progress operations
  getReadingProgressByUserId(userId: number): Promise<ReadingProgress[]>;
  updateReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress>;
  
  // Category operations
  getCategoryById(id: number): Promise<Category | undefined>;
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Collection operations
  getCollectionById(id: number): Promise<Collection | undefined>;
  getCollectionsByUserId(userId: number): Promise<Collection[]>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  addBookToCollection(collectionId: number, bookId: number): Promise<void>;
  
  // Reading statistics operations
  getReadingStatisticsByUserId(userId: number): Promise<ReadingStatistic | undefined>;
  updateReadingStatistics(userId: number, pages: number): Promise<ReadingStatistic>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private readingProgress: Map<number, ReadingProgress>;
  private categories: Map<number, Category>;
  private bookCategories: Map<number, BookCategory>;
  private collections: Map<number, Collection>;
  private collectionBooks: Map<number, CollectionBook>;
  private readingStatistics: Map<number, ReadingStatistic>;
  
  // Auto-increment IDs
  private userId: number;
  private bookId: number;
  private progressId: number;
  private categoryId: number;
  private bookCategoryId: number;
  private collectionId: number;
  private collectionBookId: number;
  private statisticsId: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.readingProgress = new Map();
    this.categories = new Map();
    this.bookCategories = new Map();
    this.collections = new Map();
    this.collectionBooks = new Map();
    this.readingStatistics = new Map();
    
    this.userId = 1;
    this.bookId = 1;
    this.progressId = 1;
    this.categoryId = 1;
    this.bookCategoryId = 1;
    this.collectionId = 1;
    this.collectionBookId = 1;
    this.statisticsId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample categories
    const categories = [
      { name: "Fiction" },
      { name: "Science Fiction" },
      { name: "History" },
      { name: "Philosophy" },
      { name: "Biography" }
    ];
    
    categories.forEach(category => {
      this.createCategory({
        name: category.name
      });
    });
    
    // Sample books will be added when needed
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }
  
  // Book operations
  async getBookById(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }
  
  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }
  
  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.bookId++;
    const createdAt = new Date();
    const book: Book = { ...insertBook, id, createdAt };
    this.books.set(id, book);
    return book;
  }
  
  // Reading progress operations
  async getReadingProgressByUserId(userId: number): Promise<ReadingProgress[]> {
    return Array.from(this.readingProgress.values()).filter(
      (progress) => progress.userId === userId
    );
  }
  
  async updateReadingProgress(insertProgress: InsertReadingProgress): Promise<ReadingProgress> {
    // Check if progress exists for this user and book
    const existingProgress = Array.from(this.readingProgress.values()).find(
      (progress) => progress.userId === insertProgress.userId && progress.bookId === insertProgress.bookId
    );
    
    if (existingProgress) {
      // Update existing progress
      const updatedProgress: ReadingProgress = {
        ...existingProgress,
        currentPage: insertProgress.currentPage,
        lastReadAt: new Date()
      };
      this.readingProgress.set(existingProgress.id, updatedProgress);
      
      // Update reading statistics
      const pagesRead = insertProgress.currentPage - existingProgress.currentPage;
      if (pagesRead > 0) {
        await this.updateReadingStatistics(insertProgress.userId, pagesRead);
      }
      
      return updatedProgress;
    } else {
      // Create new progress
      const id = this.progressId++;
      const lastReadAt = new Date();
      const progress: ReadingProgress = {
        ...insertProgress,
        id,
        lastReadAt
      };
      this.readingProgress.set(id, progress);
      
      // Update reading statistics for new pages read
      await this.updateReadingStatistics(insertProgress.userId, insertProgress.currentPage);
      
      return progress;
    }
  }
  
  // Category operations
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Collection operations
  async getCollectionById(id: number): Promise<Collection | undefined> {
    return this.collections.get(id);
  }
  
  async getCollectionsByUserId(userId: number): Promise<Collection[]> {
    return Array.from(this.collections.values()).filter(
      (collection) => collection.userId === userId
    );
  }
  
  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = this.collectionId++;
    const createdAt = new Date();
    const collection: Collection = { ...insertCollection, id, createdAt };
    this.collections.set(id, collection);
    return collection;
  }
  
  async addBookToCollection(collectionId: number, bookId: number): Promise<void> {
    // Check if collection and book exist
    const collection = await this.getCollectionById(collectionId);
    const book = await this.getBookById(bookId);
    
    if (!collection || !book) {
      throw new Error("Collection or book not found");
    }
    
    // Check if book is already in collection
    const existingEntry = Array.from(this.collectionBooks.values()).find(
      (entry) => entry.collectionId === collectionId && entry.bookId === bookId
    );
    
    if (!existingEntry) {
      const id = this.collectionBookId++;
      const collectionBook: CollectionBook = {
        id,
        collectionId,
        bookId
      };
      this.collectionBooks.set(id, collectionBook);
    }
  }
  
  // Reading statistics operations
  async getReadingStatisticsByUserId(userId: number): Promise<ReadingStatistic | undefined> {
    return Array.from(this.readingStatistics.values()).find(
      (stats) => stats.userId === userId
    );
  }
  
  async updateReadingStatistics(userId: number, pages: number): Promise<ReadingStatistic> {
    // Get existing stats or create new ones
    let stats = await this.getReadingStatisticsByUserId(userId);
    
    if (stats) {
      // Update existing stats
      const updatedStats: ReadingStatistic = {
        ...stats,
        pagesRead: stats.pagesRead + pages,
        updatedAt: new Date()
      };
      
      // If the user finished a book, increment booksRead
      const progress = Array.from(this.readingProgress.values()).find(
        (p) => p.userId === userId && p.currentPage === (this.books.get(p.bookId)?.totalPages || 0)
      );
      
      if (progress) {
        updatedStats.booksRead += 1;
      }
      
      this.readingStatistics.set(stats.id, updatedStats);
      return updatedStats;
    } else {
      // Create new stats
      const id = this.statisticsId++;
      const newStats: ReadingStatistic = {
        id,
        userId,
        booksRead: 0,
        readingTime: 0,
        pagesRead: pages,
        updatedAt: new Date(),
        monthlyStats: {}
      };
      this.readingStatistics.set(id, newStats);
      return newStats;
    }
  }
}

export const storage = new MemStorage();
