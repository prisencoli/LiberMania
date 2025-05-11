import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/book-card";
import CollectionCard from "@/components/collection-card";
import StatsCard from "@/components/stats-card";
import { Book, Collection } from "@/lib/types";

// Sample data - in a real app this would come from API
const currentlyReadingBooks: Book[] = [
  {
    id: "1",
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    coverUrl: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=230",
    currentPage: 231,
    totalPages: 548
  },
  {
    id: "2",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    coverUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=230",
    currentPage: 342,
    totalPages: 443
  },
  {
    id: "3",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    coverUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=230",
    currentPage: 54,
    totalPages: 208
  }
];

const bookCollections: Collection[] = [
  {
    id: "1",
    name: "Must Read Classics",
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=160",
    books: [
      {
        id: "classic1",
        title: "The Great Gatsby",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "classic2",
        title: "To Kill a Mockingbird",
        coverUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "classic3",
        title: "1984",
        coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      // Other books would be here
    ]
  },
  {
    id: "2",
    name: "Science Fiction",
    coverUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=160",
    books: [
      {
        id: "scifi1",
        title: "Dune",
        coverUrl: "https://images.unsplash.com/photo-1531901599143-df5010ab9438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "scifi2",
        title: "Foundation",
        coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "scifi3",
        title: "Neuromancer",
        coverUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      // Other books would be here
    ]
  },
  {
    id: "3",
    name: "Self Development",
    coverUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=160",
    books: [
      {
        id: "self1",
        title: "Atomic Habits",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "self2",
        title: "Deep Work",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "self3",
        title: "Mindset",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      // Other books would be here
    ]
  },
  {
    id: "4",
    name: "History Books",
    coverUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=160",
    books: [
      {
        id: "history1",
        title: "Sapiens",
        coverUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "history2",
        title: "Guns, Germs, and Steel",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      {
        id: "history3",
        title: "Salt: A World History",
        coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40",
      },
      // Other books would be here
    ]
  }
];

export default function Dashboard() {
  const [books, setBooks] = useState<Book[]>(currentlyReadingBooks);
  const [collections, setCollections] = useState<Collection[]>(bookCollections);
  
  const handleContinueReading = (bookId: string) => {
    // In a real app, this would navigate to a reader view for the specific book
    console.log("Continue reading book with ID:", bookId);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-condensed font-bold text-gray-800">Dashboard</h1>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white inline-flex items-center">
          <span className="material-icons mr-1">add</span>
          Add Book
        </Button>
      </div>

      {/* Reading Progress Section */}
      <section className="mb-8">
        <h2 className="text-xl font-condensed font-semibold text-gray-800 mb-4">Continue Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onContinueReading={handleContinueReading}
            />
          ))}
        </div>
      </section>

      {/* Reading Stats */}
      <section className="mb-8">
        <h2 className="text-xl font-condensed font-semibold text-gray-800 mb-4">Reading Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Books Read"
            value={24}
            icon="menu_book"
            trend={{ value: "12% from last month", isPositive: true }}
          />
          
          <StatsCard
            title="Reading Time"
            value="47h"
            icon="schedule"
            suffix="this month"
          />
          
          <StatsCard
            title="Pages Read"
            value={1842}
            icon="auto_stories"
            trend={{ value: "8% from last month", isPositive: true }}
          />
        </div>
      </section>

      {/* Book Collections */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-condensed font-semibold text-gray-800">Your Collections</h2>
          <a href="#" className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
            View All
            <span className="material-icons ml-1 text-sm">chevron_right</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>
    </div>
  );
}
