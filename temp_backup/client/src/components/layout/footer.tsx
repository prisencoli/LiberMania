import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white shadow-inner py-4 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="material-icons text-primary-600 text-2xl mr-2">auto_stories</span>
            <span className="text-primary-600 text-lg font-condensed font-bold">LiberMania</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-primary-600">About</Link>
            <Link href="/privacy" className="text-gray-600 hover:text-primary-600">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-primary-600">Terms</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600">Contact</Link>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} LiberMania. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
