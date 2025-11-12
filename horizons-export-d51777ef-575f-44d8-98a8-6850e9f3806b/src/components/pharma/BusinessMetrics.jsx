import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function BusinessMetrics() {
  const revenueData = [
    { mes: "Ene", licencias: 45000, recomendaciones: 15000 },
    { mes: "Feb", licencias: 48000, recomendaciones: 17000 },
    { mes: "Mar", licencias: 52000, recomendaciones: 19000 },
    { mes: "Abr", licencias: 55000, recomendaciones: 22000 },
    { mes: "May", licencias: 58000, recomendaciones: 25000 },
    { mes: "Jun", licencias: 62000, recomendaciones: 28000 }
  ];

  const productPerformance = [
    { producto: "GlucoBalance Plus", conversión: 85, satisfacción: 92 },
    { producto: "MetaSlim Advanced", conversión: 78, satisfacción: 88 },
    { producto: "CardioHealth Pro", conversión: 82, satisfacción: 90 }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Ingresos por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="licencias"
                stroke="#8884d8"
                name="Licencias (€)"
              />
              <Line
                type="monotone"
                dataKey="recomendaciones"
                stroke="#82ca9d"
                name="Recomendaciones (€)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Rendimiento de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="producto" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="conversión"
                fill="#8884d8"
                name="Tasa de Conversión (%)"
              />
              <Bar
                dataKey="satisfacción"
                fill="#82ca9d"
                name="Satisfacción (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default BusinessMetrics;