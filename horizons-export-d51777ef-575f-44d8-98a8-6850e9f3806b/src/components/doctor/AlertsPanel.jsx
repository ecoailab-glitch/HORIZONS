import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";

function AlertsPanel() {
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Ana García: Niveles de glucosa elevados",
      time: "Hace 2 horas"
    },
    {
      id: 2,
      type: "info",
      message: "Carlos Rodríguez: Actualización de medicación",
      time: "Hace 3 horas"
    },
    {
      id: 3,
      type: "success",
      message: "María López: Objetivos de peso alcanzados",
      time: "Hace 4 horas"
    }
  ];

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-4 p-4 rounded-lg ${
            alert.type === "warning"
              ? "bg-yellow-50"
              : alert.type === "success"
              ? "bg-green-50"
              : "bg-blue-50"
          }`}
        >
          <div
            className={`p-2 rounded-full ${
              alert.type === "warning"
                ? "bg-yellow-100"
                : alert.type === "success"
                ? "bg-green-100"
                : "bg-blue-100"
            }`}
          >
            {alert.type === "warning" ? (
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            ) : alert.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Bell className="h-4 w-4 text-blue-600" />
            )}
          </div>
          <div>
            <p className="font-medium">{alert.message}</p>
            <p className="text-sm text-gray-500">{alert.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlertsPanel;