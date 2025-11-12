import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Smartphone, Weight, Droplet } from "lucide-react";

function SensorData() {
  const [sensorData, setSensorData] = useState({
    steps: 0,
    glucose: 0,
    weight: 0,
    sleep: 0
  });

  // Simulación de datos de sensores
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        steps: Math.floor(Math.random() * 2000) + 8000,
        glucose: Math.floor(Math.random() * 20) + 90,
        weight: (Math.random() * 2 + 80).toFixed(1),
        sleep: (Math.random() * 2 + 6).toFixed(1)
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sensors = [
    {
      icon: <Smartphone className="h-6 w-6 text-blue-500" />,
      label: "Pasos",
      value: `${sensorData.steps}`,
      unit: "pasos"
    },
    {
      icon: <Droplet className="h-6 w-6 text-red-500" />,
      label: "Glucosa",
      value: `${sensorData.glucose}`,
      unit: "mg/dL"
    },
    {
      icon: <Weight className="h-6 w-6 text-green-500" />,
      label: "Peso",
      value: `${sensorData.weight}`,
      unit: "kg"
    }
  ];

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-6 w-6" />
          Datos de Sensores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sensors.map((sensor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-secondary rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {sensor.icon}
                <span className="font-medium">{sensor.label}</span>
              </div>
              <span className="text-lg font-semibold">
                {sensor.value} {sensor.unit}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default SensorData;