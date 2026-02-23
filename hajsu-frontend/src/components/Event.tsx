import { Calendar, MapPin, Clock, Info, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Asset imports
import heroImage from "figma:asset/9f6d7ebee24edda86278bf019a0278f530cc3fb2.png";
import imgPonchoNegro from "figma:asset/b1a69e7545c222daad26efccae87fec1fde6097f.png";
import imgCapaMagenta from "figma:asset/07854432f17676c10fb1def7caea4aa0e23e3624.png";
import imgPonchoVerde from "figma:asset/4f4aa45a62b536a863712fd8b3949d236cef3bf0.png";

interface EventProps {
  onNavigate: (page: string) => void;
}

const prendas = [
  {
    id: "maxi-capa-noche-oscura",
    nombre: "Maxi capa noche oscura el canto del colibrí",
    imagen: imgPonchoNegro,
  },
  {
    id: "maxi-capa-pachamama",
    nombre: "Maxi capa pachamama el vuelo del colibrí",
    imagen: imgCapaMagenta,
  },
  {
    id: "capa-fuego-verde",
    nombre: "Capa fuego verde el canto del colibrí",
    imagen: imgPonchoVerde,
  },
];

export function Event({ onNavigate }: EventProps) {
  const handleSurveyClick = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLScx1T_fRDHKiYWcng7y3V3nrOyuE58oO7vUSez-iLNyeGCcwA/viewform?usp=dialog", "_blank");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Desfile Universitario"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl mb-4">
              Desfile Universitario de Etnomoda 2025
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Hajsú Etnomoda: Tejiendo Historias Ancestrales
            </p>
          </div>
        </div>
      </section>

      {/* Información del Evento */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-4">Detalles del Evento</h2>
          </div>

          {/* Consolidated Event Details Card */}
          <Card className="mb-12 shadow-md border-primary/20">
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Fecha */}
                <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Fecha</h3>
                  <p className="text-muted-foreground">
                    Viernes, 21 de Noviembre de 2025
                  </p>
                </div>

                {/* Horario */}
                <div className="flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Horario</h3>
                  <p className="text-muted-foreground">
                    8:00 a.m - 12:00 p.m
                  </p>
                </div>

                {/* Ubicación */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Ubicación</h3>
                  <p className="text-muted-foreground">
                    Universidad de Nariño<br />
                    Sede Regional Ipiales
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12 bg-secondary/30">
            <CardContent className="p-8">
              <h3 className="mb-4">Sobre el Evento</h3>
              <p className="text-muted-foreground mb-4">
                Prepárate para vivir una experiencia única donde la moda ancestral cobra vida. 
                Este desfile universitario presentará las creaciones más emblemáticas de Hajsú Etnomoda, 
                cada una tejida con técnicas transmitidas por generaciones de artesanos indígenas de Nariño.
              </p>
              <p className="text-muted-foreground">
                Serás testigo de cómo el arte textil ancestral se fusiona con el diseño contemporáneo, 
                creando piezas únicas que honran nuestra herencia cultural mientras celebran la innovación.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Prendas del Evento */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Prendas que se Presentarán</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conoce las piezas únicas que desfilarán en el evento. Cada una con su propia historia y significado.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {prendas.map((prenda) => (
              <Card
                key={prenda.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => onNavigate(`product-${prenda.id}`)}
              >
                <div className="relative h-[400px] overflow-hidden bg-white">
                  <ImageWithFallback
                    src={prenda.imagen}
                    alt={prenda.nombre}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6 text-center bg-white">
                  <h3 className="mb-4 font-bold text-xl">{prenda.nombre}</h3>
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium"
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Botón Conoce Más - Moved Here */}
      <section className="container mx-auto px-4 py-12 text-center">
        <Button
          onClick={() => onNavigate("about")}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-all"
          size="lg"
        >
          <Info className="w-6 h-6 mr-2" />
          Conoce Más Sobre Nosotros
        </Button>
      </section>

      {/* Encuesta */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="max-w-3xl mx-auto border-accent border-2">
          <CardContent className="p-12 text-center">
            <h2 className="mb-8">¿Qué te pareció el evento?</h2>
            <Button
              onClick={handleSurveyClick}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Queremos saber tu opinión
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
