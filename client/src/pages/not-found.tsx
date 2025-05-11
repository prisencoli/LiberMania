import React from "react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Pagina non trovata
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Ci dispiace, la pagina che stai cercando non esiste o potrebbe essere stata spostata.
        </p>
        <Link href="/">
          <a className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
            Torna alla Home
          </a>
        </Link>
      </div>
    </div>
  );
}