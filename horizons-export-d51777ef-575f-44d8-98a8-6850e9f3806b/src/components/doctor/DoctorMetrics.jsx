import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar, TrendingUp, Clock } from "lucide-react";

function DoctorMetrics() {
  const metrics = [
    {
      title: "Total Pacientes",
      value: "124",
      icon: Users,
      change: "+12%",
      period: "vs mes anterior"
    },
    {
      title: "Consultas Semanales",
      value: "45",
      icon: Calendar,
      change: "+8%",
      period: "vs semana anterior"
    },
    {
      title: "Tasa de Mejora",
      value: "78%",
      icon: TrendingUp,
      change: "+5%",
      period: "vs mes anterior"
    },
    {
      title: "Tiempo Promedio",
      value: "32min",
      icon: Clock,
      change: "-3min",
      period: "vs mes anterior"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="bg-green-100 p-3 rounded-full">
                <metric.icon className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end text-sm">
              <span className="text-green-600 font-medium">{metric.change}</span>
              <span className="text-gray-500 ml-2">{metric.period}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DoctorMetrics;