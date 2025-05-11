import { ReactNode, useEffect } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { isOpen, close } = useSidebar();
  const isMobile = useIsMobile();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.querySelector('aside');
      const menuButton = document.querySelector('[class*="md:hidden mr-3"]');

      if (sidebar && 
          !sidebar.contains(target) && 
          menuButton && 
          !menuButton.contains(target) && 
          isOpen) {
        close();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, close, isMobile]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
