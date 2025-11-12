import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Bluetooth, Activity, Weight, Droplet, Thermometer, Heart, Watch } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

function DeviceSettings() {
  const { toast } = useToast();
  const [connectedDevices, setConnectedDevices] = useState({});

  const devices = [
    {
      id: "glucometer",
      name: "Glucómetro",
      icon: <Droplet className="h-6 w-6 text-red-500" />,
      value: "120 mg/dL",
      lastSync: "Hace 5 minutos"
    },
    {
      id: "scale",
      name: "Báscula Inteligente",
      icon: <Weight className="h-6 w-6 text-blue-500" />,
      value: "75.5 kg",
      lastSync: "Hace 2 horas"
    },
    {
      id: "pedometer",
      name: "Podómetro",
      icon: <Activity className="h-6 w-6 text-green-500" />,
      value: "8,432 pasos",
      lastSync: "Actualizado"
    },
    {
      id: "heartrate",
      name: "Monitor Cardíaco",
      icon: <Heart className="h-6 w-6 text-pink-500" />,
      value: "72 bpm",
      lastSync: "Actualizado"
    },
    {
      id: "temperature",
      name: "Termómetro",
      icon: <Thermometer className="h-6 w-6 text-yellow-500" />,
      value: "36.5 °C",
      lastSync: "Hace 1 hora"
    },
    {
      id: "smartwatch",
      name: "Reloj Inteligente",
      icon: <Watch className="h-6 w-6 text-purple-500" />,
      value: "Conectado",
      lastSync: "Sincronizado"
    }
  ];

  const connectDevice = async (deviceId) => {
    try {
      // Simulamos la conexión Bluetooth
      setConnectedDevices(prev => ({
        ...prev,
        [deviceId]: true
      }));
      
      toast({
        title: "Dispositivo conectado",
        description: "El dispositivo se ha conectado correctamente",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo conectar al dispositivo",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Bluetooth className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dispositivos Médicos</h1>
          </div>
          <Link to="/preferences">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devices.map((device) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="flex items-center gap-3">
                    {device.icon}
                    {device.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Estado:</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        connectedDevices[device.id] 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {connectedDevices[device.id] ? "Conectado" : "Desconectado"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Última lectura:</span>
                      <span className="font-medium">{device.value}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Última sincronización:</span>
                      <span className="text-sm">{device.lastSync}</span>
                    </div>

                    <Button
                      onClick={() => connectDevice(device.id)}
                      className="w-full"
                      variant={connectedDevices[device.id] ? "outline" : "default"}
                    >
                      <Bluetooth className="mr-2 h-4 w-4" />
                      {connectedDevices[device.id] ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DeviceSettings;