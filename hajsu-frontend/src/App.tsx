import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
import { Event } from "./components/Event";
import { Catalog } from "./components/Catalog";
import { ProductDetail } from "./components/ProductDetail";
import { Survey } from "./components/Survey";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { AdminPanel } from "./components/AdminPanel";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "register":
        return <Register onNavigate={handleNavigate} />;
      case "event":
        return <Event onNavigate={handleNavigate} />;
      case "catalog":
        return <Catalog onNavigate={handleNavigate} />;
      case "survey":
        return <Survey />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "admin":
        return <AdminPanel />;
      default:
        if (currentPage.startsWith("product-")) {
          return <ProductDetail productId={currentPage} onNavigate={handleNavigate} />;
        }
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col textile-pattern">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}