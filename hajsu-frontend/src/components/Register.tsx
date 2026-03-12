import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { registerAttendee } from "../services/AttendeeService";

interface RegisterProps {
  onNavigate: (page: string) => void;
}

export function Register({ onNavigate }: RegisterProps) {
  const [formData, setFormData] = useState({
    nombres: "",
    correo: "",
    pais: "",
    ciudad: "",
    institucion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const attendee = {
      fullName: formData.nombres,
      email: formData.correo,
      country: formData.pais,
      city: formData.ciudad,
      institution: formData.institucion
    };

    await registerAttendee(attendee);

    alert("Registration successful!");
    setFormData({
      nombres: "",
      correo: "",
      pais: "",
      ciudad: "",
      institucion: ""
    });
    onNavigate("event");
  };


  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="mb-4">Registro al Evento</h1>
        <p className="text-muted-foreground">
          Completa el siguiente formulario para asegurar tu lugar en el desfile 
          universitario de etnomoda. ¡Nos emociona tenerte con nosotros!
        </p>
      </div>

      {/* Formulario */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres Completos *</Label>
              <Input
                id="nombres"
                name="nombres"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.nombres}
                onChange={handleChange}
                required
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="correo">Correo Electrónico *</Label>
              <Input
                id="correo"
                name="correo"
                type="email"
                placeholder="tu@correo.com"
                value={formData.correo}
                onChange={handleChange}
                required
                className="bg-input-background"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pais">País *</Label>
                <Input
                  id="pais"
                  name="pais"
                  type="text"
                  placeholder="Tu país"
                  value={formData.pais}
                  onChange={handleChange}
                  required
                  className="bg-input-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  placeholder="Tu ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                  className="bg-input-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institucion">Institución Educativa (Opcional)</Label>
              <Input
                id="institucion"
                name="institucion"
                type="text"
                placeholder="Universidad o colegio"
                value={formData.institucion}
                onChange={handleChange}
                className="bg-input-background"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                Ingresar al Evento
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Al registrarte, recibirás un correo de confirmación con todos los detalles del evento.
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <div className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-secondary/30">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya estás registrado? Dirígete directamente a la{" "}
              <button
                onClick={() => onNavigate("event")}
                className="text-primary hover:underline"
              >
                página del evento
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
