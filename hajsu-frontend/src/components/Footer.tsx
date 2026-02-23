import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre Hajsú */}
          <div>
            <h3 className="mb-4">Hajsú Etnomoda</h3>
            <p className="text-sm opacity-90 mb-4">
              Tejiendo tradición ancestral con diseño contemporáneo. Cada prenda cuenta una historia de nuestra cultura indígena.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  Evento
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 opacity-90">
                <Mail className="w-4 h-4" />
                <span>Email: compras@hajsu.com.co</span>
              </div>
              <div className="flex items-center gap-2 opacity-90">
                <Phone className="w-4 h-4" />
                <span>Cel: 321 721 2545</span>
              </div>
              <div className="flex items-center gap-2 opacity-90">
                <MapPin className="w-4 h-4" />
                <span>Carlosama, Nariño, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* NEW DEVELOPERS SECTION - Added after Contact info but before social icons/copyright bottom bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Desarrolladores:</h3>
              <ul className="space-y-2 text-white/90 text-sm">
                <li className="hover:text-white transition-colors">
                  Nelson Francisco Diaz Oña <span className="text-white/70 ml-1">@nelson._.15</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Daniel Felipe Criollo Calpa <span className="text-white/70 ml-1">@daniel_calpa10</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Franklin Steven Ordóñez <span className="text-white/70 ml-1">@frannkk_</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Carlos David Terán Martínez <span className="text-white/70 ml-1">@davimz</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Asesorados por:</h3>
              <p className="text-white/90 hover:text-white transition-colors font-medium text-sm">
                Sandra Vallejo Chamorro
              </p>
            </div>
          </div>
        </div>

        {/* Redes Sociales & Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-90">
              © 2025 Hajsú Etnomoda. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/1HNQzvx1cZ/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/hajsu_etnomoda/?hl=es-la"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
