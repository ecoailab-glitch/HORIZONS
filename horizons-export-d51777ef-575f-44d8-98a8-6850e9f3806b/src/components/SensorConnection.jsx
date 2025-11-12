import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bluetooth, Activity, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function SensorConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceData, setDeviceData] = useState(null);
  const { toast } = useToast();

  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['heart_rate'] },
          { services: ['glucose'] },
          { services: ['weight_scale'] }
        ]
      });

      toast({
        title: "Dispositivo encontrado",
        description: `Conectando a: ${device.name}`,
      });

      const server = await device.gatt.connect();
      setIsConnected(true);

      // Ejemplo de lectura de servicio de ritmo cardíaco
      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');
      
      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleSensorData);

      toast({
        title: "Conexión exitosa",
        description: "El dispositivo está conectado y enviando datos",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de conexión",
        description: "No se pudo conectar al dispositivo",
      });
    }
  };

  const handleSensorData = (event) => {
    const value = event.target.value;
    setDeviceData({
      heartRate: value.getUint8(1),
      timestamp: new Date().toISOString()
    });
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bluetooth className="h-6 w-6" />
          Conexión de Sensores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <span>Estado de Conexión:</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {isConnected ? "Conectado" : "Desconectado"}
            </span>
          </div>

          <Button
            onClick={connectToDevice}
            disabled={isConnected}
            className="w-full"
          >
            <Bluetooth className="mr-2 h-4 w-4" />
            {isConnected ? "Dispositivo Conectado" : "Conectar Dispositivo"}
          </Button>

          {deviceData && (
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Datos del Sensor:</h3>
              <div className="space-y-2">
                <p>Ritmo Cardíaco: {deviceData.heartRate} bpm</p>
                <p className="text-sm text-muted-foreground">
                  Última actualización: {new Date(deviceData.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}

          {!isConnected && (
            <div className="flex items-center gap-2 text-yellow-600 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
              <p className="text-sm">
                Asegúrese de que su dispositivo Bluetooth esté encendido y cerca
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SensorConnection;