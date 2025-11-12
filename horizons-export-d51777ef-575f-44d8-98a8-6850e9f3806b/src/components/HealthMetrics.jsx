import React from "react";
import { Card } from "@/components/ui/card";
import { Heart, Activity, Moon } from "lucide-react";

function HealthMetrics() {
  const metrics = [
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      label: "Ritmo Cardíaco",
      value: "72 bpm",
    },
    {
      icon: <Activity className="h-6 w-6 text-green-500" />,
      label: "Pasos",
      value: "8,432",
    },
    {
      icon: <Moon className="h-6 w-6 text-blue-500" />,
      label: "Horas de Sueño",
      value: "7.5h",
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Métricas de Salud</h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {metric.icon}
              <span className="font-medium">{metric.label}</span>
            </div>
            <span className="text-lg font-semibold">{metric.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default HealthMetrics;