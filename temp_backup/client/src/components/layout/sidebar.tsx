import { Link, useLocation } from "wouter";
import { useSidebar } from "@/hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

type Category = {
  name: string;
  count: number;
};

type RecentBook = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: "dashboard" },
  { href: "/library", label: "My Library", icon: "collections_bookmark" },
  { href: "/discover", label: "Discover", icon: "explore" },
  { href: "/favorites", label: "Favorites", icon: "favorite" },
  { href: "/history", label: "Reading History", icon: "history" },
];

const categories: Category[] = [
  { name: "Fiction", count: 42 },
  { name: "Science", count: 28 },
  { name: "History", count: 19 },
  { name: "Philosophy", count: 15 },
  { name: "Biography", count: 11 },
];

const recentBooks: RecentBook[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=150"
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=150"
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=150"
  }
];

export default function Sidebar() {
  const [location] = useLocation();
  const { isOpen } = useSidebar();
  const isMobile = useIsMobile();

  if (!isOpen && isMobile) {
    return null;
  }

  return (
    <aside className={cn(
      "w-64 bg-white shadow-md h-full fixed left-0 top-16 bottom-0 transition-transform duration-300 ease-in-out z-20",
      isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
    )}>
      <nav className="p-4 h-full overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3">Browse</h2>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <a className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    location === item.href 
                      ? "bg-primary-50 text-primary-700" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary-700"
                  )}>
                    <span className={cn(
                      "material-icons mr-3",
                      location === item.href ? "text-primary-500" : "text-gray-400"
                    )}>
                      {item.icon}
                    </span>
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3">Categories</h2>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.name}>
                <Link href={`/category/${category.name.toLowerCase()}`}>
                  <a className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-primary-700">
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {category.count}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3">Recently Added</h2>
          <ul className="space-y-3">
            {recentBooks.map((book) => (
              <li key={book.id} className="flex items-start space-x-3">
                <img 
                  src={book.coverUrl} 
                  alt={`${book.title} cover`} 
                  className="w-10 h-14 object-cover rounded-md shadow-sm"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-800">{book.title}</h3>
                  <p className="text-xs text-gray-500">{book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
