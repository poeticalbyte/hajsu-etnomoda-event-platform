import { useState, useEffect } from "react";
import { Users, Package, MessageSquare, TrendingUp, Calendar, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { getAttendeeCount, getRecentAttendees, type AttendeeDTO } from "../services/AttendeeService";

const RECENT_REGISTRATIONS_LIMIT = 5;

export function AdminPanel() {
  const [attendeeCount, setAttendeeCount] = useState<string>("...");
  const [recentRegistrations, setRecentRegistrations] = useState<AttendeeDTO[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);

  useEffect(() => {
    getAttendeeCount()
      .then((count) => setAttendeeCount(String(count)))
      .catch(() => setAttendeeCount("—"));

    getRecentAttendees(RECENT_REGISTRATIONS_LIMIT)
      .then((data) => setRecentRegistrations(data))
      .catch(() => setRecentRegistrations([]))
      .finally(() => setRegistrationsLoading(false));
  }, []);
  // Datos de ejemplo para el panel
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



  const topProducts = [
    { name: "Poncho Ancestral", views: 234, interest: "Alto" },
    { name: "Blusa Tejida a Mano", views: 189, interest: "Alto" },
    { name: "Chaleco Artesanal", views: 156, interest: "Medio" },
    { name: "Ruana de Lana Natural", views: 134, interest: "Medio" },
    { name: "Vestido Ceremonial", views: 98, interest: "Medio" },
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
                <button className="w-full mt-4 py-3 text-center text-primary hover:bg-primary/5 rounded-md transition-colors">
                  Ver Todos los Registros
                </button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Productos Más Vistos */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-accent" />
              <h2>Catálogo de Productos</h2>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent">{index + 1}</span>
                    </div>
                    <div>
                      <p className="mb-1">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.views} vistas
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      product.interest === "Alto"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {product.interest}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 text-center text-primary hover:bg-primary/5 rounded-md transition-colors">
              Ver Catálogo Completo
            </button>
          </CardContent>
        </Card>
      </div>

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