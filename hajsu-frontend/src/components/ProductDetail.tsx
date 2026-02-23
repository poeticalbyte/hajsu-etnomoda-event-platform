import { ChevronLeft, Star, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Asset imports
import imgPonchoNegro from "figma:asset/b1a69e7545c222daad26efccae87fec1fde6097f.png";
import imgCapaMagenta from "figma:asset/07854432f17676c10fb1def7caea4aa0e23e3624.png";
import imgPonchoVerde from "figma:asset/4f4aa45a62b536a863712fd8b3949d236cef3bf0.png";

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: string) => void;
}

const productData: { [key: string]: any } = {
  "product-maxi-capa-noche-oscura": {
    nombre: "Maxi capa noche oscura el canto del colibrí",
    precio: "$185.000 COP",
    categoria: "Ruanas",
    imagenes: [imgPonchoNegro],
    historia: "Esta ruana negra profunda representa la tierra fértil y el misterio de la noche andina. Sus franjas grises y blancas, con patrones geométricos, simbolizan los caminos ancestrales y la dualidad de la vida. Es una prenda de autoridad y respeto, tejida para proteger no solo del frío, sino para portar la identidad de quien la viste.",
    materiales: [
      "Lana de oveja negra natural (sin teñir)",
      "Detalles en hilo de algodón mercerizado",
      "Acabado cepillado suave",
      "Tejido en telar de pedal tradicional",
    ],
    artesano: "Maestro Juan Carlos - Ipiales",
    tiempo: "3 semanas de elaboración",
    disponibilidad: "Disponible - Pieza Única",
    calificacion: 4.9,
  },
  "product-maxi-capa-pachamama": {
    nombre: "Maxi capa pachamama el vuelo del colibrí",
    precio: "$165.000 COP",
    categoria: "Capas",
    imagenes: [imgCapaMagenta],
    historia: "Vibrante y llena de energía, esta capa magenta está inspirada en las flores silvestres que adornan las laderas del volcán Chiles. Sus franjas verticales en tonos rojizos y negros evocan la pasión y la fuerza de la mujer andina. El diseño cruzado y la faja tejida permiten un ajuste elegante y versátil.",
    materiales: [
      "Lana industrial de alta calidad",
      "Tintes anilinas de alta fijación",
      "Faja tejida a mano en telar de cintura",
      "Terminaciones en flecos anudados a mano",
    ],
    artesano: "Sra. Elena Cuasquer - Carlosama",
    tiempo: "2 semanas de elaboración",
    disponibilidad: "Disponible - 3 unidades",
    calificacion: 5.0,
  },
  "product-capa-fuego-verde": {
    nombre: "Capa fuego verde el canto del colibrí",
    precio: "$140.000 COP",
    categoria: "Ponchos",
    imagenes: [imgPonchoVerde],
    historia: "Este poncho captura la esencia de nuestros páramos. El verde profundo se funde con amarillos y naranjas que representan los rayos del sol al amanecer sobre los cultivos. Sus patrones geométricos laterales son un homenaje a la siembra y la cosecha, ciclos vitales de nuestra comunidad.",
    materiales: [
      "Hilo orlón resistente y cálido",
      "Combinación de colores inspirada en la naturaleza",
      "Tejido denso para máxima protección térmica",
      "Flecos largos tradicionales",
    ],
    artesano: "Taller Familiar Los Pastos",
    tiempo: "2.5 semanas de elaboración",
    disponibilidad: "Disponible - Bajo pedido",
    calificacion: 4.8,
  },
};

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  // Fallback to first product if ID not found
  const product = productData[productId] || productData["product-maxi-capa-noche-oscura"];
  const [selectedImage, setSelectedImage] = useState(0);
  const [userRating, setUserRating] = useState(0);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <button
        onClick={() => onNavigate("event")}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ChevronLeft className="w-5 h-5" />
        Volver al Evento
      </button>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Galería de Imágenes */}
        <div>
          <div className="relative h-[600px] mb-4 rounded-lg overflow-hidden bg-white border border-gray-200">
            <ImageWithFallback
              src={product.imagenes[selectedImage]}
              alt={product.nombre}
              className="w-full h-full object-contain p-4"
            />
          </div>
          
          {/* Thumbnails - Only show if more than 1 image */}
          {product.imagenes.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.imagenes.map((imagen: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-32 rounded-lg overflow-hidden border bg-white ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <ImageWithFallback
                    src={imagen}
                    alt={`${product.nombre} ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del Producto */}
        <div>
          <div className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm mb-4">
            {product.categoria}
          </div>
          
          <h1 className="mb-4 text-3xl md:text-4xl font-bold">{product.nombre}</h1>
          <p className="text-primary text-3xl font-bold mb-2">{product.precio}</p>
          <p className="text-sm text-muted-foreground mb-8">Precio estimado - Venta directa</p>
          
          {/* Golden Back Button inside details section */}
          <div className="mb-8">
            <Button
              onClick={() => onNavigate("event")}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold w-full sm:w-auto"
              size="lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Catálogo del Evento
            </Button>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Historia de la Prenda</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.historia}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 font-semibold">Materiales</h3>
                <ul className="space-y-2">
                  {product.materiales.map((material: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-muted-foreground">{material}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-secondary/30 border-accent/50">
              <CardContent className="p-6">
                <h4 className="mb-2 font-semibold">Artesano</h4>
                <p className="text-muted-foreground mb-3">{product.artesano}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">Tiempo de elaboración:</span> {product.tiempo}
                </p>
              </CardContent>
            </Card>
            
            {/* Calificación */}
            <Card className="bg-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Calificación</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{product.calificacion}</span>
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-2">Califica esta prenda:</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= userRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => onNavigate("contact")}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                Estoy Interesado
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center pt-2">
              Cada prenda es única. El producto puede variar ligeramente en colores y patrones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
