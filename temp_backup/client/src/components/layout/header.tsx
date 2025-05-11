import { useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Header() {
  const { toggle } = useSidebar();
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <button 
              type="button" 
              className="text-gray-500 md:hidden mr-3"
              onClick={toggle}
            >
              <span className="material-icons">menu</span>
            </button>
          )}
          <Link href="/" className="flex items-center">
            <span className="material-icons text-primary-600 text-3xl mr-2">auto_stories</span>
            <h1 className="text-primary-600 text-xl font-condensed font-bold">LiberMania</h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center flex-1 mx-6">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search for books, authors, genres..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="material-icons absolute right-3 top-2 text-gray-400">search</span>
          </div>
        </div>
        <div className="flex items-center">
          {isMobile && (
            <button 
              type="button" 
              className="md:hidden text-gray-500 mr-2"
              onClick={toggleSearch}
            >
              <span className="material-icons">search</span>
            </button>
          )}
          
          {!isAuthenticated ? (
            <Button className="hidden md:inline-flex bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out">
              Sign In
            </Button>
          ) : (
            <div className="relative">
              <button 
                className="flex items-center space-x-1"
                onClick={toggleUserMenu}
              >
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100" 
                  alt="User profile" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary-500"
                />
                <span className="material-icons text-gray-600 text-sm">arrow_drop_down</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <Link href="/library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Library</Link>
                  <Link href="/statistics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reading Statistics</Link>
                  <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isMobile && isSearchOpen && (
        <div className="md:hidden bg-gray-50 px-4 py-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="material-icons absolute right-3 top-2 text-gray-400">search</span>
          </div>
        </div>
      )}
    </header>
  );
}
