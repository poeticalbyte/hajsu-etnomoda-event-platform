import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CatalogProps {
  onNavigate: (page: string) => void;
}

const products = [
  {
    id: 1,
    name: "Poncho Ancestral",
    price: "$85.00",
    category: "Ponchos",
    image: "https://images.unsplash.com/photo-1756965452489-e6ce7f2c8c52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwdGV4dGlsZSUyMGZhc2hpb258ZW58MXx8fHwxNzYyODI3NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    name: "Blusa Tejida a Mano",
    price: "$62.00",
    category: "Blusas",
    image: "https://images.unsplash.com/photo-1762175048416-8b9f181556fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGV0aG5pYyUyMGNsb3RoaW5nfGVufDF8fHx8MTc2MjgyNzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    name: "Chaleco Artesanal",
    price: "$75.00",
    category: "Chalecos",
    image: "https://images.unsplash.com/photo-1760287363878-1a09af715b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGV0aG5pYyUyMGZhc2hpb258ZW58MXx8fHwxNzYyODI3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    name: "Ruana de Lana Natural",
    price: "$95.00",
    category: "Ruanas",
    image: "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd292ZW4lMjB0ZXh0aWxlJTIwcGF0dGVybnN8ZW58MXx8fHwxNzYyODI3NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    name: "Falda Tradicional",
    price: "$68.00",
    category: "Faldas",
    image: "https://images.unsplash.com/photo-1762111908782-fabda1a1fe1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwdGV4dGlsZSUyMGRldGFpbHxlbnwxfHx8fDE3NjI4Mjc0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    name: "Bufanda de Alpaca",
    price: "$42.00",
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1723549644189-c669e6f0e227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwd2VhdmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc2MjgyNzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 7,
    name: "Camiseta Bordada",
    price: "$55.00",
    category: "Camisetas",
    image: "https://images.unsplash.com/photo-1756965452489-e6ce7f2c8c52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwdGV4dGlsZSUyMGZhc2hpb258ZW58MXx8fHwxNzYyODI3NDg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 8,
    name: "Bolso Tejido",
    price: "$38.00",
    category: "Accesorios",
    image: "https://images.unsplash.com/photo-1762175048416-8b9f181556fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGV0aG5pYyUyMGNsb3RoaW5nfGVufDF8fHx8MTc2MjgyNzQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 9,
    name: "Vestido Ceremonial",
    price: "$125.00",
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1760287363878-1a09af715b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGV0aG5pYyUyMGZhc2hpb258ZW58MXx8fHwxNzYyODI3NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Catalog({ onNavigate }: CatalogProps) {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="mb-4">Catálogo Digital</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cada prenda es única, tejida a mano con técnicas ancestrales transmitidas 
          por generaciones. Descubre la historia detrás de cada pieza.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
          Todos
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors">
          Ponchos
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors">
          Blusas
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors">
          Chalecos
        </button>
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors">
          Accesorios
        </button>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={() => onNavigate(`product-${product.id}`)}
          >
            <div className="relative h-[350px] overflow-hidden bg-secondary/20">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                {product.category}
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="mb-2">{product.name}</h3>
              <p className="text-primary">{product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Información adicional */}
      <div className="mt-16 p-8 bg-secondary/30 rounded-lg text-center max-w-3xl mx-auto">
        <h3 className="mb-3">¿Buscas algo personalizado?</h3>
        <p className="text-muted-foreground mb-6">
          Trabajamos con pedidos personalizados. Contáctanos para crear una prenda 
          única que refleje tu estilo y honre nuestra tradición.
        </p>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Contactar
        </button>
      </div>
    </div>
  );
}
