import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import heroImage from "figma:asset/d084c051fca3aa84e0f3771817e8c9ac4ebcff79.png";
import tejidoImage from "figma:asset/2146aebf4ccfda8860f01c23f2e70e23dc733c72.png";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Desfile Hajsú Etnomoda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl mb-6">
              ¡Bienvenidos al Desfile Universitario de Etnomoda!
            </h1>
            <p className="text-lg md:text-xl mb-4 text-white/90">
              Te invitamos a ser parte de un evento único donde la tradición ancestral 
              se encuentra con el diseño contemporáneo. Hajsú Etnomoda presenta su colección 
              inspirada en la cultura indígena de Nariño.
            </p>
            <p className="text-lg mb-8 text-white/90">
              Únete a nosotros el 21 de noviembre en la Universidad de Nariño, 
              sede regional Ipiales. ¡Asegura tu lugar ahora!
            </p>
            <Button
              onClick={() => onNavigate("register")}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Registrarme Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="container mx-auto px-4 py-20">
        <Card className="overflow-hidden border-accent border-2">
          <div className="grid md:grid-cols-2">
            <div className="relative h-[300px] md:h-auto">
              <img
                src={tejidoImage}
                alt="Evento"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm mb-4 w-fit">
                Evento Especial
              </div>
              <h2 className="mb-4">Un Evento Imperdible</h2>
              <p className="text-muted-foreground mb-6">
                Experimenta la magia del tejido ancestral en vivo. Conoce a nuestros artesanos, 
                descubre las historias detrás de cada prenda y sé testigo de cómo la tradición 
                se transforma en moda contemporánea.
              </p>
              <p className="text-muted-foreground mb-6">
                El registro es completamente gratuito y te garantiza acceso al evento más 
                esperado del año en etnomoda. ¡No te lo pierdas!
              </p>
              <Button
                onClick={() => onNavigate("register")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground w-fit"
                size="lg"
              >
                Quiero Registrarme
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </div>
        </Card>
      </section>
    </div>
  );
}