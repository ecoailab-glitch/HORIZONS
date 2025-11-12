import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building2, MapPin, Phone, Mail, Clock, Users, Save, Edit } from "lucide-react";

function PharmaProfile() {
  const pharmacyInfo = {
    name: "Farmacia Central",
    address: "Calle Principal 123",
    city: "Madrid",
    phone: "+34 912 345 678",
    email: "info@farmaciacentral.com",
    schedule: {
      weekdays: "9:00 - 21:00",
      saturday: "10:00 - 14:00",
      sunday: "Cerrado"
    },
    staff: [
      { id: 1, name: "Ana Martínez", role: "Farmacéutica Titular", license: "FAR123456" },
      { id: 2, name: "Carlos López", role: "Farmacéutico Adjunto", license: "FAR789012" },
      { id: 3, name: "María García", role: "Técnico en Farmacia", license: "TEC345678" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Perfil Empresarial</h1>
          <Link to="/pharma-features">
            <Button variant="secondary">Volver</Button>
          </Link>
        </div>

        <Tabs defaultValue="info" className="space-y-8">
          <TabsList>
            <TabsTrigger value="info">Información General</TabsTrigger>
            <TabsTrigger value="staff">Personal</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Datos de la Farmacia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Nombre</label>
                      <Input defaultValue={pharmacyInfo.name} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Dirección</label>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <Input defaultValue={pharmacyInfo.address} />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Contacto</label>
                      <div className="space-y-2 mt-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <Input defaultValue={pharmacyInfo.phone} />
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <Input defaultValue={pharmacyInfo.email} />
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar Cambios
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Horario de Atención
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Lunes a Viernes</label>
                      <Input defaultValue={pharmacyInfo.schedule.weekdays} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Sábados</label>
                      <Input defaultValue={pharmacyInfo.schedule.saturday} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Domingos</label>
                      <Input defaultValue={pharmacyInfo.schedule.sunday} className="mt-1" />
                    </div>
                    <Button className="w-full mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Actualizar Horario
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Personal Autorizado
                  </div>
                  <Button variant="outline" size="sm">
                    Añadir Personal
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pharmacyInfo.staff.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                    >
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                        <p className="text-sm text-gray-500">Licencia: {member.license}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Notificaciones</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>Alertas de inventario bajo</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>Nuevas prescripciones</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>Mensajes de especialistas</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Privacidad</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>Mostrar información de contacto</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>Permitir mensajes directos</span>
                      </label>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Configuración
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default PharmaProfile;