import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export function Survey() {
  const [submitted, setSubmitted] = useState(false);
  const [ratings, setRatings] = useState({
    evento: 0,
    organizacion: 0,
    productos: 0,
    experiencia: 0,
  });
  const [comentarios, setComentarios] = useState("");

  const handleRating = (category: string, value: number) => {
    setRatings({
      ...ratings,
      [category]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const StarRating = ({ value, onChange, label }: any) => {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= value
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-4">¡Gracias por tu Opinión!</h2>
            <p className="text-muted-foreground mb-8">
              Tu feedback es muy valioso para nosotros y nos ayuda a mejorar 
              nuestros eventos y productos. Apreciamos el tiempo que tomaste 
              para compartir tu experiencia con Hajsú Etnomoda.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-primary text-primary"
            >
              Enviar Otra Respuesta
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="mb-4">Encuesta de Satisfacción</h1>
        <p className="text-muted-foreground">
          Nos encantaría conocer tu opinión sobre el evento y nuestros productos. 
          Tu feedback nos ayuda a mejorar y seguir ofreciendo experiencias excepcionales.
        </p>
      </div>

      {/* Formulario */}
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Calificación del Evento */}
            <div className="space-y-6">
              <h2 className="pb-4 border-b border-border">
                Calificación del Evento
              </h2>

              <StarRating
                label="¿Cómo calificarías el evento en general?"
                value={ratings.evento}
                onChange={(value: number) => handleRating("evento", value)}
              />

              <StarRating
                label="¿Qué te pareció la organización del evento?"
                value={ratings.organizacion}
                onChange={(value: number) => handleRating("organizacion", value)}
              />
            </div>

            {/* Calificación de Productos */}
            <div className="space-y-6">
              <h2 className="pb-4 border-b border-border">
                Calificación de Productos
              </h2>

              <StarRating
                label="¿Cómo calificarías la calidad de nuestros productos?"
                value={ratings.productos}
                onChange={(value: number) => handleRating("productos", value)}
              />

              <StarRating
                label="¿Qué tan satisfecho estás con tu experiencia general?"
                value={ratings.experiencia}
                onChange={(value: number) => handleRating("experiencia", value)}
              />
            </div>

            {/* Comentarios */}
            <div className="space-y-2">
              <Label htmlFor="comentarios">
                Comentarios y Sugerencias (Opcional)
              </Label>
              <Textarea
                id="comentarios"
                placeholder="Comparte tus comentarios, sugerencias o experiencia con nosotros..."
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                className="min-h-[150px] bg-input-background resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Tus comentarios nos ayudan a mejorar nuestros productos y servicios.
              </p>
            </div>

            {/* Botón de Envío */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Enviar Encuesta
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <div className="mt-12 max-w-3xl mx-auto">
        <Card className="bg-secondary/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Tu privacidad es importante para nosotros. Tus respuestas son confidenciales 
              y se utilizan únicamente para mejorar nuestros servicios.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
