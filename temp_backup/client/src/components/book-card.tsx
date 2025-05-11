import { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type BookCardProps = {
  book: Book;
  onContinueReading?: (bookId: string) => void;
};

export default function BookCard({ book, onContinueReading }: BookCardProps) {
  const progressPercentage = Math.round((book.currentPage / book.totalPages) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img 
            src={book.coverUrl} 
            alt={`${book.title} cover`} 
            className="h-48 w-full md:w-36 object-cover md:h-full"
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-wide text-sm text-accent-500 font-semibold">
              {book.genre}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{book.title}</h3>
            <p className="text-gray-600 text-sm">{book.author}</p>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-700">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Page {book.currentPage} of {book.totalPages}
              </span>
              <Button 
                size="sm"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-3 py-1 text-sm transition-colors duration-200 ease-in-out"
                onClick={() => onContinueReading && onContinueReading(book.id)}
              >
                <span className="material-icons text-sm mr-1">play_arrow</span>
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
