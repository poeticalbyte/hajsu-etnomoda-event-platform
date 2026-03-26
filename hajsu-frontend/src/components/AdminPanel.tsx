import { useState, useEffect } from "react";
import { Users, Package, MessageSquare, TrendingUp, Calendar, Star, Plus, Edit } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { getAttendeeCount, getRecentAttendees, getAllAttendees, type AttendeeDTO } from "../services/AttendeeService";
import { getAllDresses, createDress, updateDress, getActiveCount, type DressDTO } from "../services/DressService";

const RECENT_REGISTRATIONS_LIMIT = 5;

export function AdminPanel() {
  const [attendeeCount, setAttendeeCount] = useState<string>("...");
  const [activeProductCount, setActiveProductCount] = useState<string>("...");
  const [recentRegistrations, setRecentRegistrations] = useState<AttendeeDTO[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);

  const [products, setProducts] = useState<DressDTO[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showAllRegistersModal, setShowAllRegistersModal] = useState(false);
  const [allRegistrations, setAllRegistrations] = useState<AttendeeDTO[]>([]);
  const [allRegistrationsLoading, setAllRegistrationsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DressDTO | null>(null);

  const [newProduct, setNewProduct] = useState<Omit<DressDTO, "id">>({
    name: "",
    price: 0,
    shortDescription: "",
    culturalStory: "",
    artist: "",
    materials: "",
    elaborationTime: "",
    imageUrl: "",
    visible: true,
  });

  useEffect(() => {
    getAttendeeCount()
      .then((count) => setAttendeeCount(String(count)))
      .catch(() => setAttendeeCount("—"));

    getRecentAttendees(RECENT_REGISTRATIONS_LIMIT)
      .then((data) => setRecentRegistrations(data))
      .catch(() => setRecentRegistrations([]))
      .finally(() => setRegistrationsLoading(false));

    loadProducts();

    getActiveCount()
      .then((count) => setActiveProductCount(String(count)))
      .catch(() => setActiveProductCount("—"));
  }, []);

  const loadProducts = () => {
    setProductsLoading(true);
    getAllDresses()
      .then((data) => setProducts(data))
      .catch(() => {
        setProducts([]);
        toast.error("Error al cargar los productos");
      })
      .finally(() => setProductsLoading(false));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Por favor completa al menos el nombre y precio del producto");
      return;
    }

    try {
      await createDress(newProduct);
      setNewProduct({
        name: "",
        price: 0,
        shortDescription: "",
        culturalStory: "",
        artist: "",
        materials: "",
        elaborationTime: "",
        imageUrl: "",
        visible: true,
      });
      setShowAddProductModal(false);
      toast.success("Producto añadido exitosamente");
      loadProducts();
      getActiveCount()
        .then((count) => setActiveProductCount(String(count)))
        .catch(() => {});
    } catch {
      toast.error("Error al añadir el producto");
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct || !editingProduct.id) return;

    if (!editingProduct.name || !editingProduct.price) {
      toast.error("Por favor completa al menos el nombre y precio del producto");
      return;
    }

    try {
      await updateDress(editingProduct.id, editingProduct);
      setShowEditProductModal(false);
      setEditingProduct(null);
      toast.success("Producto actualizado exitosamente");
      loadProducts();
      getActiveCount()
        .then((count) => setActiveProductCount(String(count)))
        .catch(() => {});
    } catch {
      toast.error("Error al actualizar el producto");
    }
  };

  const openEditModal = (product: DressDTO) => {
    setEditingProduct({ ...product });
    setShowEditProductModal(true);
  };

  const handleOpenAllRegisters = () => {
    setShowAllRegistersModal(true);
    setAllRegistrationsLoading(true);
    getAllAttendees()
      .then((data) => setAllRegistrations(data))
      .catch(() => {
        setAllRegistrations([]);
        toast.error("Error al cargar los registros");
      })
      .finally(() => setAllRegistrationsLoading(false));
  };

  const stats = [
    {
      icon: Users,
      label: "Registros al Evento",
      value: attendeeCount,
      change: "+12%",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Package,
      label: "Productos Activos",
      value: activeProductCount,
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

  const surveyResults = [
    { category: "Calidad del Evento", rating: 4.8 },
    { category: "Organización", rating: 4.6 },
    { category: "Calidad de Productos", rating: 4.9 },
    { category: "Experiencia General", rating: 4.7 },
  ];

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CO")} COP`;
  };

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
            {registrationsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 bg-secondary/30 rounded-lg animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-1"></div>
                    <div className="h-3 bg-muted rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : recentRegistrations.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No hay asistentes registrados aún...</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {recentRegistrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="mb-1">{registration.fullName}</p>
                        <p className="text-sm text-muted-foreground">{registration.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">{registration.institution}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{registration.registrationDate}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full mt-4 py-3 text-center text-primary hover:bg-primary/5 rounded-md transition-colors"
                  onClick={handleOpenAllRegisters}
                >
                  Ver Todos los Registros
                </button>

                <Dialog open={showAllRegistersModal} onOpenChange={setShowAllRegistersModal}>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Todos los Registros al Evento</DialogTitle>
                    </DialogHeader>
                    {allRegistrationsLoading ? (
                      <div className="space-y-3 mt-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="p-4 bg-secondary/30 rounded-lg animate-pulse">
                            <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3 mt-4">
                        {allRegistrations.map((registration) => (
                          <div
                            key={registration.id}
                            className="p-4 bg-secondary/30 rounded-lg border border-border"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Nombre</p>
                                <p className="font-semibold">{registration.fullName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Email</p>
                                <p className="font-semibold">{registration.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">País</p>
                                <p className="font-semibold">{registration.country}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Ciudad</p>
                                <p className="font-semibold">{registration.city}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Institución</p>
                                <p className="font-semibold">{registration.institution}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Fecha de Registro</p>
                                <p className="font-semibold">{registration.registrationDate}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </>
            )}
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
              <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => setShowAddProductModal(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Añadir
              </Button>
              <Dialog open={showAddProductModal} onOpenChange={setShowAddProductModal}>
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
                      <Label htmlFor="price">Precio (número) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price || ""}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        placeholder="Ej: 85000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Descripción Corta</Label>
                      <Input
                        id="description"
                        value={newProduct.shortDescription}
                        onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                        placeholder="Descripción breve del producto"
                      />
                    </div>
                    <div>
                      <Label htmlFor="history">Historia</Label>
                      <Textarea
                        id="history"
                        value={newProduct.culturalStory}
                        onChange={(e) => setNewProduct({ ...newProduct, culturalStory: e.target.value })}
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
                        value={newProduct.elaborationTime}
                        onChange={(e) => setNewProduct({ ...newProduct, elaborationTime: e.target.value })}
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
                      Añadir
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            {productsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 bg-secondary/30 rounded-lg animate-pulse">
                    <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No hay productos aún. ¡Añade el primero!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product, index) => (
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
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          product.visible
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {product.visible ? "Visible" : "Oculto"}
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
            )}
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
                <Label htmlFor="edit-price">Precio (número) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingProduct.price || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  placeholder="Ej: 85000"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Descripción Corta</Label>
                <Input
                  id="edit-description"
                  value={editingProduct.shortDescription}
                  onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  placeholder="Descripción breve del producto"
                />
              </div>
              <div>
                <Label htmlFor="edit-history">Historia</Label>
                <Textarea
                  id="edit-history"
                  value={editingProduct.culturalStory}
                  onChange={(e) => setEditingProduct({ ...editingProduct, culturalStory: e.target.value })}
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
                  value={editingProduct.elaborationTime}
                  onChange={(e) => setEditingProduct({ ...editingProduct, elaborationTime: e.target.value })}
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
              <p>{attendeeCount} / 200 cupos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}