import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart2, ArrowLeft, Shield, Building2, Microscope, FileCheck, Lock } from 'lucide-react';
import { Hotel as HospitalIcon } from 'lucide-react';

function BigDataAnalysis() {
  const certifications = [
    {
      name: "ISO 27001",
      description: "Gestión de Seguridad de la Información",
      status: "Certificado"
    },
    {
      name: "HIPAA",
      description: "Protección de Datos Médicos",
      status: "Cumplimiento"
    },
    {
      name: "GDPR",
      description: "Protección de Datos EU",
      status: "Certificado"
    },
    {
      name: "ISO 13485",
      description: "Dispositivos Médicos",
      status: "Certificado"
    }
  ];

  const dataUsers = [
    {
      icon: <Building2 className="h-6 w-6" />,
      type: "Farmacéuticas",
      description: "Investigación y desarrollo de tratamientos",
      access: "Datos anonimizados agregados"
    },
    {
      icon: <HospitalIcon className="h-6 w-6" />,
      type: "Hospitales",
      description: "Análisis de efectividad de tratamientos",
      access: "Datos clínicos anonimizados"
    },
    {
      icon: <Microscope className="h-6 w-6" />,
      type: "Centros de Investigación",
      description: "Estudios epidemiológicos",
      access: "Datos estadísticos agregados"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <BarChart2 className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold">Análisis de Big Data</h1>
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
                <Shield className="h-6 w-6 text-green-500" />
                Certificaciones y Cumplimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileCheck className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">{cert.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-6 w-6 text-blue-500" />
                Protección de Datos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Anonimización Avanzada</h3>
                  <p className="text-sm text-gray-600">
                    Proceso de triple capa para asegurar la completa anonimización de datos personales
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Encriptación</h3>
                  <p className="text-sm text-gray-600">
                    Encriptación de extremo a extremo con claves de 256 bits
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Auditoría Continua</h3>
                  <p className="text-sm text-gray-600">
                    Sistema de auditoría automatizada 24/7
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios de Datos Científicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataUsers.map((user, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {user.icon}
                    </div>
                    <h3 className="font-medium">{user.type}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{user.description}</p>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="text-xs font-medium text-gray-500">Nivel de Acceso:</span>
                    <p className="text-sm font-medium mt-1">{user.access}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BigDataAnalysis;