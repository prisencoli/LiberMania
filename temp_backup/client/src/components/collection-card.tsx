import { Collection } from "@/lib/types";
import { Link } from "wouter";

type CollectionCardProps = {
  collection: Collection;
};

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img 
        src={collection.coverUrl} 
        alt={`${collection.name} collection cover`} 
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{collection.name}</h3>
        <p className="text-gray-600 text-sm">{collection.books.length} books</p>
        <div className="mt-3 flex -space-x-2">
          {collection.books.slice(0, 3).map((book, index) => (
            <img 
              key={index}
              src={book.coverUrl} 
              alt={`${book.title} cover`} 
              className="w-6 h-8 object-cover rounded-md shadow-sm border border-white"
            />
          ))}
          {collection.books.length > 3 && (
            <div className="w-6 h-8 bg-gray-200 rounded-md flex items-center justify-center text-xs font-medium text-gray-500 border border-white">
              +{collection.books.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
