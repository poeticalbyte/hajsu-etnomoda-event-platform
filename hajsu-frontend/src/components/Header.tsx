import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoHajsu from "figma:asset/94f29952fe1213d092c6bbff69303431b339c219.png";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Inicio", page: "home" },
    { name: "Evento", page: "event" },
    { name: "Sobre Nosotros", page: "about" },
    { name: "Contacto", page: "contact" },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img 
              src={logoHajsu} 
              alt="Hajsú Etnomoda" 
              className="h-16 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation - REMOVED as per request to use menu on all devices */}
          {/* Admin Button - Desktop - Kept for convenience or move to menu? User said "todo en un menú... como aparece en la versión del teléfono" */}
          
          {/* Mobile Menu Button - Visible on all screens */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground ml-auto" 
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Menu (formerly Mobile) */}
        {mobileMenuOpen && (
          <nav className="py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 transition-colors ${
                    currentPage === item.page
                      ? "text-primary bg-secondary/50"
                      : "text-foreground hover:bg-secondary/30"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  onNavigate("admin");
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity text-sm"
              >
                Estadísticas (Administrador)
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}