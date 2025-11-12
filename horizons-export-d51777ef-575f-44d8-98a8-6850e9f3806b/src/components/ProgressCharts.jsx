import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ProgressCharts() {
  const weightData = [
    { date: "2025-04-18", peso: 85 },
    { date: "2025-04-19", peso: 84.5 },
    { date: "2025-04-20", peso: 84.2 },
    { date: "2025-04-21", peso: 83.8 },
    { date: "2025-04-22", peso: 83.5 },
    { date: "2025-04-23", peso: 83.2 },
    { date: "2025-04-24", peso: 82.9 },
  ];

  const glucoseData = [
    { date: "2025-04-18", glucosa: 120 },
    { date: "2025-04-19", glucosa: 115 },
    { date: "2025-04-20", glucosa: 118 },
    { date: "2025-04-21", glucosa: 112 },
    { date: "2025-04-22", glucosa: 110 },
    { date: "2025-04-23", glucosa: 108 },
    { date: "2025-04-24", glucosa: 105 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Evolución del Peso</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="peso" stroke="#8884d8" name="Peso (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardHeader>
          <CardTitle>Niveles de Glucosa</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={glucoseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="glucosa" stroke="#82ca9d" name="Glucosa (mg/dL)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProgressCharts;