import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Cpu, 
  Brain, 
  Database, 
  UserCircle, 
  Stethoscope,
  Building2,
  Server,
  LineChart
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function AISettings() {
  const aiSystems = [
    {
      title: "IA de Datos Sintéticos",
      description: "Sistema de generación y análisis de datos sintéticos para mejora de algoritmos",
      icon: <Database className="h-6 w-6 text-blue-500" />,
      status: "Activo",
      metrics: {
        precision: "98.5%",
        dataPoints: "1.2M",
        lastUpdate: "Hace 5 minutos"
      }
    },
    {
      title: "IA Personal",
      description: "Asistente personal para monitoreo y recomendaciones individualizadas",
      icon: <UserCircle className="h-6 w-6 text-green-500" />,
      status: "Activo",
      metrics: {
        precisión: "96.8%",
        alertas: "24/7",
        adaptación: "Continua"
      }
    },
    {
      title: "IA para Especialistas",
      description: "Sistema de apoyo a decisiones médicas y análisis de patrones",
      icon: <Stethoscope className="h-6 w-6 text-purple-500" />,
      status: "Activo",
      metrics: {
        precisión: "99.2%",
        casos: "50K+",
        aprendizaje: "Continuo"
      }
    },
    {
      title: "IA Farmacéutica",
      description: "Análisis y optimización de tratamientos farmacológicos",
      icon: <Building2 className="h-6 w-6 text-orange-500" />,
      status: "Activo",
      metrics: {
        efectividad: "97.5%",
        interacciones: "1M+",
        actualizaciones: "Diarias"
      }
    }
  ];

  const mareNostrumData = [
    { mes: "Ene", eficiencia: 85, descubrimientos: 12 },
    { mes: "Feb", eficiencia: 87, descubrimientos: 15 },
    { mes: "Mar", eficiencia: 92, descubrimientos: 18 },
    { mes: "Abr", eficiencia: 95, descubrimientos: 22 },
    { mes: "May", eficiencia: 98, descubrimientos: 25 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Cpu className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Sistemas de Inteligencia Artificial</h1>
          </div>
          <Link to="/preferences">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {aiSystems.map((system, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {system.icon}
                    {system.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{system.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {Object.entries(system.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 capitalize">{key}</p>
                          <p className="font-medium mt-1">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        system.status === "Activo" 
                          ? "bg-green-100 text-green-600" 
                          : "bg-yellow-100 text-yellow-600"
                      }`}>
                        {system.status}
                      </span>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Server className="h-6 w-6 text-red-500" />
                Conexión Mare Nostrum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Estado del Supercomputador</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Capacidad</p>
                      <p className="font-medium">200 PFLOPS</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Utilización</p>
                      <p className="font-medium">94.5%</p>
                    </div>
                  </div>
                </div>

                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={mareNostrumData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="eficiencia" 
                        stroke="#4f46e5" 
                        name="Eficiencia (%)" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="descubrimientos" 
                        stroke="#22c55e" 
                        name="Descubrimientos" 
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Análisis Proteico</h3>
                  <p className="text-sm text-gray-600">
                    Procesamiento de desdoblamiento proteico para optimización de tratamientos
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Proteínas Analizadas</p>
                      <p className="font-medium">1.2M+</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Precisión</p>
                      <p className="font-medium">99.8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-purple-500" />
                Mejora Continua del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Aprendizaje Automático</h3>
                  <p className="text-sm text-gray-600">
                    Sistema de mejora continua basado en datos reales y sintéticos
                  </p>
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Progreso de Aprendizaje</span>
                      <span className="text-sm font-medium">94%</span>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "94%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Precisión Global</h3>
                    <div className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-green-500" />
                      <span className="font-medium">98.7%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Tiempo de Respuesta</h3>
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">50ms</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  Ver Detalles del Sistema
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AISettings;