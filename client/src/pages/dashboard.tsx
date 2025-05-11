import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";

// Temporaneamente definiamo i tipi qui finché non risolviamo l'import
interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl?: string;
  totalPages: number;
}

interface ReadingStatistic {
  userId: number;
  booksRead: number;
  pagesRead: number;
  readingTime: number;
}

export default function Dashboard() {
  // Fetch books
  const { data: books, isLoading: isBooksLoading } = useQuery({
    queryKey: ["/api/books"],
    queryFn: () => apiRequest<Book[]>("/api/books"),
  });

  // Fetch user reading statistics - assuming user is logged in
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["/api/reading-statistics/user/1"], // Hardcoded user ID for demo
    queryFn: () => apiRequest<ReadingStatistic>("/api/reading-statistics/user/1"),
    enabled: false, // Disabled until authentication is implemented
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          LiberMania
        </h1>
        <p className="text-gray-600 mt-2">
          La tua biblioteca personale di libri digitali
        </p>
      </header>

      <main>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">I tuoi libri recenti</h2>
          {isBooksLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : books && books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {books.slice(0, 6).map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200 relative">
                    {book.coverUrl && (
                      <img
                        src={book.coverUrl}
                        alt={`Copertina di ${book.title}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
                    <p className="text-gray-600 text-sm">{book.author}</p>
                    <div className="mt-4 flex justify-between">
                      <span className="text-sm text-gray-500">
                        {book.totalPages} pagine
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Continua lettura
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">
                Non hai ancora aggiunto nessun libro alla tua libreria.
              </p>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg">
                Aggiungi un libro
              </button>
            </div>
          )}
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Le tue statistiche</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 font-medium">Libri letti</h3>
                <span className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {isStatsLoading ? "..." : stats?.booksRead || 0}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 font-medium">Pagine lette</h3>
                <span className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {isStatsLoading ? "..." : stats?.pagesRead || 0}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 font-medium">Tempo di lettura</h3>
                <span className="p-2 bg-purple-100 rounded-full text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {isStatsLoading ? "..." : `${Math.floor((stats?.readingTime || 0) / 60)}h ${(stats?.readingTime || 0) % 60}m`}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Le tue collezioni</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Preferiti</h3>
              <p className="text-gray-600 text-sm mb-4">I tuoi libri preferiti</p>
              <p className="text-sm text-gray-500">8 libri</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Da leggere</h3>
              <p className="text-gray-600 text-sm mb-4">Libri da leggere in futuro</p>
              <p className="text-sm text-gray-500">12 libri</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}