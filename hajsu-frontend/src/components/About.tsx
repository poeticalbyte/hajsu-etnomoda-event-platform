import { Heart, Target, Eye, Award, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import heroImage from "figma:asset/fd2bb5fb0ba1b4b97b059bbf8065c484f55256a6.png";

export function About({ onNavigate }: { onNavigate: (page: string) => void }) {
  const values = [
    {
      icon: Heart,
      title: "Autenticidad",
      description: "Preservamos las técnicas ancestrales en cada tejido",
    },
    {
      icon: Target,
      title: "Calidad",
      description: "Productos artesanales de la más alta calidad",
    },
    {
      icon: Eye,
      title: "Sostenibilidad",
      description: "Prácticas responsables con el medio ambiente",
    },
    {
      icon: Award,
      title: "Comercio Justo",
      description: "Compensación justa para nuestros artesanos",
    },
  ];

  // Images to distribute throughout the page
  const decorativeImages = [
    "https://images.unsplash.com/photo-1723549644189-c669e6f0e227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd2VhdmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MjgyNzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1762111908782-fabda1a1fe1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwdGV4dGlsZSUyMGRldGFpbHxlbnwxfHx8fDE3NjI4Mjc0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd292ZW4lMjB0ZXh0aWxlJTIwcGF0dGVybnN8ZW58MXx8fHwxNzYyODI3NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Hajsú Etnomoda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl mb-4">
              Sobre Hajsú Etnomoda
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Tejiendo historias, preservando tradiciones
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-left mb-8">
              <h2 className="mb-6">Nuestra Historia</h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <p>
                Hajsú Etnomoda nació del sueño de preservar y celebrar el arte textil ancestral 
                de las comunidades indígenas de Nariño, Colombia. Fundada en 2018, nuestra empresa es el 
                resultado de la colaboración entre artesanos tradicionales y diseñadores contemporáneos 
                que comparten una visión común: mantener vivas las técnicas de tejido que han pasado 
                de generación en generación durante siglos.
              </p>

              <p>
                El nombre "Hajsú" proviene del kichwa y significa "tejer" o "entretejer", 
                representando no solo el acto físico de crear textiles, sino también el entrelazamiento 
                de culturas, tradiciones y tiempos. Cada pieza que creamos es un puente entre el pasado 
                y el presente, entre lo ancestral y lo moderno.
              </p>

              <p>
                Desde nuestro taller en Carlosama, Nariño, trabajamos directamente con comunidades 
                indígenas de la región, asegurando que cada artesano reciba una compensación justa 
                por su trabajo y que las técnicas tradicionales se preserven para las futuras generaciones.
              </p>
            </div>
          </div>
          <div className="h-[400px] rounded-lg overflow-hidden shadow-xl">
             <ImageWithFallback
              src={decorativeImages[0]}
              alt="Tejido ancestral"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-primary/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="mb-4">Nuestra Misión</h2>
                <p className="text-muted-foreground mb-6">
                  Preservar y promover el arte textil ancestral de las comunidades indígenas 
                  ecuatorianas, creando prendas únicas que fusionan tradición y modernidad, 
                  mientras aseguramos prácticas de comercio justo y sostenibilidad ambiental.
                </p>
                <div className="h-48 rounded-md overflow-hidden mt-4">
                  <ImageWithFallback
                    src={decorativeImages[1]}
                    alt="Misión"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h2 className="mb-4">Nuestra Visión</h2>
                <p className="text-muted-foreground mb-6">
                  Ser reconocidos a nivel nacional e internacional como líderes en moda 
                  artesanal indígena, inspirando a nuevas generaciones a valorar y continuar 
                  las tradiciones textiles ancestrales del Ecuador.
                </p>
                <div className="h-48 rounded-md overflow-hidden mt-4">
                   <ImageWithFallback
                    src={decorativeImages[2]}
                    alt="Visión"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="mb-4">Nuestros Valores</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Los principios que guían cada decisión y cada puntada
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section className="container mx-auto px-4 py-20 bg-accent/5">
        <Card className="max-w-3xl mx-auto border-accent border-2">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4">¿Quieres Conocer Más?</h2>
            <p className="text-muted-foreground mb-8">
              Estamos siempre abiertos a compartir nuestra historia y nuestro trabajo. 
              Visítanos en nuestro taller o contáctanos para más información.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p>info@hajsuetnomoda.com</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">Teléfono</p>
                <p>+593 99 999 9999</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
