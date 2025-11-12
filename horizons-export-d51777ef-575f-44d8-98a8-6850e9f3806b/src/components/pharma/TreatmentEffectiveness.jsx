import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function TreatmentEffectiveness() {
  const treatmentData = [
    { mes: "Ene", efectividad: 75, adherencia: 82 },
    { mes: "Feb", efectividad: 78, adherencia: 85 },
    { mes: "Mar", efectividad: 82, adherencia: 88 },
    { mes: "Abr", efectividad: 85, adherencia: 87 },
    { mes: "May", efectividad: 88, adherencia: 90 },
    { mes: "Jun", efectividad: 92, adherencia: 92 }
  ];

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>Efectividad de Tratamientos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={treatmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="efectividad"
              stroke="#8884d8"
              name="Efectividad (%)"
            />
            <Line
              type="monotone"
              dataKey="adherencia"
              stroke="#82ca9d"
              name="Adherencia (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TreatmentEffectiveness;