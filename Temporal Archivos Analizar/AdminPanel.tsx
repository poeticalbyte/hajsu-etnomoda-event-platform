import { Users, Package, MessageSquare, TrendingUp, Calendar, Star, Plus, Edit } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  history: string;
  artist: string;
  materials: string;
  timeToMake: string;
  imageUrl: string;
  visible: boolean;
  views: number;
  interest: string;
}

export function AdminPanel() {
  // Datos de ejemplo para el panel
  const stats = [
    {
      icon: Users,
      label: "Registros al Evento",
      value: "127",
      change: "+12%",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Package,
      label: "Productos Activos",
      value: "24",
      change: "+3",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: MessageSquare,
      label: "Encuestas Recibidas",
      value: "89",
      change: "+8%",
      color: "bg-chart-2/10 text-chart-2",
    },
    {
      icon: Star,
      label: "Calificación Promedio",
      value: "4.7",
      change: "+0.3",
      color: "bg-chart-5/10 text-chart-5",
    },
  ];

  const recentRegistrations = [
    { name: "Ana García", email: "ana@email.com", institution: "Universidad Central", date: "2025-11-10" },
    { name: "Carlos Mendoza", email: "carlos@email.com", institution: "Politécnica Nacional", date: "2025-11-10" },
    { name: "María Torres", email: "maria@email.com", institution: "Universidad Andina", date: "2025-11-09" },
    { name: "José Ramírez", email: "jose@email.com", institution: "PUCE", date: "2025-11-09" },
    { name: "Laura Sánchez", email: "laura@email.com", institution: "Universidad San Francisco", date: "2025-11-08" },
  ];

  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Poncho Ancestral", price: "$85.000 COP", description: "Poncho tejido a mano", history: "Técnica ancestral de los Pastos", artist: "Maestro Juan Carlos", materials: "Lana de oveja", timeToMake: "3 semanas", imageUrl: "", visible: true, views: 234, interest: "Alto" },
    { id: "2", name: "Blusa Tejida a Mano", price: "$62.000 COP", description: "Blusa con bordados tradicionales", history: "Inspirada en flores silvestres", artist: "Sra. Elena Cuasquer", materials: "Algodón orgánico", timeToMake: "2 semanas", imageUrl: "", visible: true, views: 189, interest: "Alto" },
    { id: "3", name: "Chaleco Artesanal", price: "$75.000 COP", description: "Chaleco con patrones geométricos", history: "Símbolos de la cosmovisión andina", artist: "Taller Los Pastos", materials: "Lana y algodón", timeToMake: "2.5 semanas", imageUrl: "", visible: true, views: 156, interest: "Medio" },
    { id: "4", name: "Ruana de Lana Natural", price: "$95.000 COP", description: "Ruana térmica tradicional", history: "Protección del clima de páramo", artist: "Don Pedro Chiles", materials: "Lana de oveja natural", timeToMake: "4 semanas", imageUrl: "", visible: true, views: 134, interest: "Medio" },
    { id: "5", name: "Vestido Ceremonial", price: "$125.000 COP", description: "Vestido para ocasiones especiales", history: "Usado en ceremonias ancestrales", artist: "Doña María Ipiales", materials: "Seda y lana", timeToMake: "5 semanas", imageUrl: "", visible: true, views: 98, interest: "Medio" },
  ]);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showAllRegistersModal, setShowAllRegistersModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [newProduct, setNewProduct] = useState<Omit<Product, "id" | "views" | "interest">>({
    name: "",
    price: "",
    description: "",
    history: "",
    artist: "",
    materials: "",
    timeToMake: "",
    imageUrl: "",
    visible: true,
  });

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("adminProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Por favor completa al menos el nombre y precio del producto");
      return;
    }

    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      views: 0,
      interest: "Nuevo",
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      history: "",
      artist: "",
      materials: "",
      timeToMake: "",
      imageUrl: "",
      visible: true,
    });
    setShowAddProductModal(false);
    toast.success("Producto añadido exitosamente");
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;

    if (!editingProduct.name || !editingProduct.price) {
      toast.error("Por favor completa al menos el nombre y precio del producto");
      return;
    }

    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setShowEditProductModal(false);
    setEditingProduct(null);
    toast.success("Producto actualizado exitosamente");
  };

  const openEditModal = (product: Product) => {
    setEditingProduct({ ...product });
    setShowEditProductModal(true);
  };

  // Mock registrations data - in a real app this would come from a backend
  const allRegistrations = [
    { name: "Ana García", email: "ana@email.com", institution: "Universidad Central", date: "2025-11-10", phone: "312 345 6789" },
    { name: "Carlos Mendoza", email: "carlos@email.com", institution: "Politécnica Nacional", date: "2025-11-10", phone: "315 678 9012" },
    { name: "María Torres", email: "maria@email.com", institution: "Universidad Andina", date: "2025-11-09", phone: "318 901 2345" },
    { name: "José Ramírez", email: "jose@email.com", institution: "PUCE", date: "2025-11-09", phone: "320 234 5678" },
    { name: "Laura Sánchez", email: "laura@email.com", institution: "Universidad San Francisco", date: "2025-11-08", phone: "314 567 8901" },
    { name: "Pedro Gómez", email: "pedro@email.com", institution: "Universidad de Nariño", date: "2025-11-08", phone: "319 890 1234" },
    { name: "Sofía Martínez", email: "sofia@email.com", institution: "Universidad Central", date: "2025-11-07", phone: "311 123 4567" },
    { name: "Diego Ruiz", email: "diego@email.com", institution: "Politécnica Nacional", date: "2025-11-07", phone: "316 456 7890" },
  ];

  const surveyResults = [
    { category: "Calidad del Evento", rating: 4.8 },
    { category: "Organización", rating: 4.6 },
    { category: "Calidad de Productos", rating: 4.9 },
    { category: "Experiencia General", rating: 4.7 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-2">Panel Administrativo</h1>
        <p className="text-muted-foreground">
          Resumen y estadísticas de Hajsú Etnomoda
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Registros Recientes */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-primary" />
              <h2>Registros Recientes al Evento</h2>
            </div>
            <div className="space-y-4">
              {recentRegistrations.map((registration, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="mb-1">{registration.name}</p>
                    <p className="text-sm text-muted-foreground">{registration.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">{registration.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{registration.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Dialog open={showAllRegistersModal} onOpenChange={setShowAllRegistersModal}>
              <DialogTrigger asChild>
                <button className="w-full mt-4 py-3 text-center text-primary hover:bg-primary/5 rounded-md transition-colors">
                  Ver Todos los Registros
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Todos los Registros al Evento</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  {allRegistrations.map((registration, index) => (
                    <div
                      key={index}
                      className="p-4 bg-secondary/30 rounded-lg border border-border"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Nombre</p>
                          <p className="font-semibold">{registration.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-semibold">{registration.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Institución</p>
                          <p className="font-semibold">{registration.institution}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Teléfono</p>
                          <p className="font-semibold">{registration.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fecha de Registro</p>
                          <p className="font-semibold">{registration.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Productos Más Vistos */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Package className="w-6 h-6 text-accent" />
                <h2>Productos Más Vistos</h2>
              </div>
              <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Añadir Nuevo Producto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="name">Nombre del Producto *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        placeholder="Ej: Poncho Ancestral"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Precio *</Label>
                      <Input
                        id="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        placeholder="Ej: $85.000 COP"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Descripción Corta</Label>
                      <Input
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        placeholder="Descripción breve del producto"
                      />
                    </div>
                    <div>
                      <Label htmlFor="history">Historia</Label>
                      <Textarea
                        id="history"
                        value={newProduct.history}
                        onChange={(e) => setNewProduct({ ...newProduct, history: e.target.value })}
                        placeholder="Historia y significado cultural del producto"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="artist">Artista/Artesano</Label>
                      <Input
                        id="artist"
                        value={newProduct.artist}
                        onChange={(e) => setNewProduct({ ...newProduct, artist: e.target.value })}
                        placeholder="Nombre del artesano"
                      />
                    </div>
                    <div>
                      <Label htmlFor="materials">Materiales</Label>
                      <Input
                        id="materials"
                        value={newProduct.materials}
                        onChange={(e) => setNewProduct({ ...newProduct, materials: e.target.value })}
                        placeholder="Materiales utilizados"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeToMake">Tiempo de Elaboración</Label>
                      <Input
                        id="timeToMake"
                        value={newProduct.timeToMake}
                        onChange={(e) => setNewProduct({ ...newProduct, timeToMake: e.target.value })}
                        placeholder="Ej: 3 semanas"
                      />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl">URL de la Imagen</Label>
                      <Input
                        id="imageUrl"
                        value={newProduct.imageUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="visible"
                        checked={newProduct.visible}
                        onCheckedChange={(checked) => setNewProduct({ ...newProduct, visible: checked as boolean })}
                      />
                      <Label htmlFor="visible" className="cursor-pointer">
                        Visible (mostrar en el catálogo)
                      </Label>
                    </div>
                    <Button onClick={handleAddProduct} className="w-full">
                      Añadir Producto
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              {products.filter(p => p.visible).slice(0, 5).map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.views} vistas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        product.interest === "Alto"
                          ? "bg-primary/20 text-primary"
                          : product.interest === "Nuevo"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {product.interest}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditModal(product)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 text-center text-primary hover:bg-primary/5 rounded-md transition-colors">
              Ver Catálogo Completo
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Edit Product Modal */}
      <Dialog open={showEditProductModal} onOpenChange={setShowEditProductModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="edit-name">Nombre del Producto *</Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="Ej: Poncho Ancestral"
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Precio *</Label>
                <Input
                  id="edit-price"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  placeholder="Ej: $85.000 COP"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Descripción Corta</Label>
                <Input
                  id="edit-description"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Descripción breve del producto"
                />
              </div>
              <div>
                <Label htmlFor="edit-history">Historia</Label>
                <Textarea
                  id="edit-history"
                  value={editingProduct.history}
                  onChange={(e) => setEditingProduct({ ...editingProduct, history: e.target.value })}
                  placeholder="Historia y significado cultural del producto"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-artist">Artista/Artesano</Label>
                <Input
                  id="edit-artist"
                  value={editingProduct.artist}
                  onChange={(e) => setEditingProduct({ ...editingProduct, artist: e.target.value })}
                  placeholder="Nombre del artesano"
                />
              </div>
              <div>
                <Label htmlFor="edit-materials">Materiales</Label>
                <Input
                  id="edit-materials"
                  value={editingProduct.materials}
                  onChange={(e) => setEditingProduct({ ...editingProduct, materials: e.target.value })}
                  placeholder="Materiales utilizados"
                />
              </div>
              <div>
                <Label htmlFor="edit-timeToMake">Tiempo de Elaboración</Label>
                <Input
                  id="edit-timeToMake"
                  value={editingProduct.timeToMake}
                  onChange={(e) => setEditingProduct({ ...editingProduct, timeToMake: e.target.value })}
                  placeholder="Ej: 3 semanas"
                />
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">URL de la Imagen</Label>
                <Input
                  id="edit-imageUrl"
                  value={editingProduct.imageUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-visible"
                  checked={editingProduct.visible}
                  onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, visible: checked as boolean })}
                />
                <Label htmlFor="edit-visible" className="cursor-pointer">
                  Visible (mostrar en el catálogo)
                </Label>
              </div>
              <Button onClick={handleEditProduct} className="w-full">
                Guardar Edición
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resultados de Encuestas */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-chart-2" />
            <h2>Resultados de Encuestas</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {surveyResults.map((result, index) => (
              <div key={index} className="text-center p-6 bg-secondary/30 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="text-2xl">{result.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">{result.category}</p>
                <div className="mt-3 w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${(result.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="mb-2">Análisis de Satisfacción</h3>
                <p className="text-sm text-muted-foreground">
                  Las encuestas muestran un alto nivel de satisfacción general (4.7/5). 
                  Los productos artesanales reciben la calificación más alta (4.9/5), 
                  destacando la calidad del trabajo artesanal. Se recomienda mantener 
                  el enfoque en la autenticidad y las técnicas tradicionales.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Eventos */}
      <Card className="mt-8 border-accent border-2">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-accent" />
            <h2>Próximo Evento</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Fecha</p>
              <p>28 de Noviembre, 2025</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Ubicación</p>
              <p>Universidad de Nariño - Ipiales</p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Registros</p>
              <p>127 / 200 cupos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}