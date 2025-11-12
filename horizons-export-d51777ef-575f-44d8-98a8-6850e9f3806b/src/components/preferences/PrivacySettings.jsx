import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, 
  ArrowLeft, 
  Lock, 
  FileCheck, 
  Bell, 
  Eye, 
  Key,
  UserCheck,
  Database,
  AlertTriangle
} from "lucide-react";

function PrivacySettings() {
  const securityMeasures = [
    {
      icon: <Lock className="h-5 w-5 text-blue-500" />,
      title: "Encriptación Avanzada",
      description: "Datos médicos protegidos con encriptación de grado militar"
    },
    {
      icon: <Key className="h-5 w-5 text-green-500" />,
      title: "Autenticación de Dos Factores",
      description: "Verificación adicional para mayor seguridad"
    },
    {
      icon: <Database className="h-5 w-5 text-purple-500" />,
      title: "Segregación de Datos",
      description: "Separación física de datos sensibles"
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-orange-500" />,
      title: "Monitorización 24/7",
      description: "Sistema de detección de amenazas en tiempo real"
    }
  ];

  const certifications = [
    "ISO 27001 - Gestión de Seguridad",
    "HIPAA Compliant",
    "GDPR Compliant",
    "ISO 13485 - Dispositivos Médicos"
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold">Privacidad y Seguridad</h1>
          </div>
          <Link to="/preferences">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6" />
                Medidas de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {securityMeasures.map((measure, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      {measure.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{measure.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{measure.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-6 w-6" />
                Certificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6" />
                Control de Acceso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Datos Médicos</h3>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Control granular sobre quién puede acceder a tus datos médicos
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Historial de Actividad</h3>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Gestiona la visibilidad de tu actividad física y ejercicios
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Datos Nutricionales</h3>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Control sobre la compartición de datos nutricionales
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Alertas y Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Intentos de Acceso</h3>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Notificaciones sobre intentos de acceso a tu cuenta
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Compartición de Datos</h3>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Alertas cuando tus datos son compartidos con terceros
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Actualizaciones de Seguridad</h3>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Notificaciones sobre actualizaciones de seguridad importantes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PrivacySettings;