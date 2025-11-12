import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { BarChart, LineChart, PieChart, Users, Activity, TrendingUp, TrendingDown, Download, Filter, CalendarDays } from 'lucide-react';
import { ResponsiveContainer, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const dataAdherencia = [
  { name: 'Ene', adherencia: 75 }, { name: 'Feb', adherencia: 80 },
  { name: 'Mar', adherencia: 70 }, { name: 'Abr', adherencia: 85 },
  { name: 'May', adherencia: 90 }, { name: 'Jun', adherencia: 82 },
];

const dataProgresoMetas = [
  { name: 'Pérdida Peso', alcanzado: 60, objetivo: 100 },
  { name: 'Ejercicio Semanal', alcanzado: 80, objetivo: 100 },
  { name: 'Consumo Agua', alcanzado: 70, objetivo: 100 },
  { name: 'Horas Sueño', alcanzado: 90, objetivo: 100 },
];

const dataTiposPacientes = [
  { name: 'Diabetes Tipo 2', value: 400, color: '#0088FE' },
  { name: 'Hipertensión', value: 300, color: '#00C49F' },
  { name: 'Obesidad', value: 300, color: '#FFBB28' },
  { name: 'Otros', value: 200, color: '#FF8042' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}${entry.unit || ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function DoctorAnalytics() {
  const unimplementedFeatureToast = () => {
    alert("🚧 Esta función aún no está implementada—pero puedes solicitarla en tu próximo prompt! 🚀");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Análisis de Pacientes</h1>
          <p className="text-md text-gray-600">Visualiza tendencias y métricas clave de tus pacientes.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={unimplementedFeatureToast}><Filter className="mr-2 h-4 w-4" /> Filtrar</Button>
          <Button onClick={unimplementedFeatureToast}><Download className="mr-2 h-4 w-4" /> Exportar Reporte</Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="text-green-500" />Adherencia al Tratamiento</CardTitle>
              <CardDescription>Porcentaje promedio de adherencia mensual.</CardDescription>
            </CardHeader>
            <CardContent className="h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataAdherencia}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="adherencia" stroke="#10B981" strokeWidth={2} activeDot={{ r: 8 }} name="Adherencia Promedio"/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="text-blue-500" />Progreso General de Metas</CardTitle>
              <CardDescription>Cumplimiento de objetivos principales entre pacientes activos.</CardDescription>
            </CardHeader>
            <CardContent className="h-72 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataProgresoMetas} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit="%" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="alcanzado" fill="#3B82F6" name="Alcanzado" unit="%" />
                  <Bar dataKey="objetivo" fill="#BFDBFE" name="Objetivo" unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="text-purple-500" />Distribución de Pacientes</CardTitle>
              <CardDescription>Clasificación por condición principal.</CardDescription>
            </CardHeader>
            <CardContent className="h-64 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataTiposPacientes} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {dataTiposPacientes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="md:col-span-2">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="text-orange-500" />Actividad de Consultas</CardTitle>
              <CardDescription>Volumen de consultas y tipos más frecuentes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-orange-600">45</p>
                  <p className="text-sm text-gray-500">Consultas esta semana</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">182</p>
                  <p className="text-sm text-gray-500">Consultas este mes</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-gray-700">Tipos de Consulta (Mes Actual):</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between"><span>Seguimiento Nutricional:</span> <span className="font-medium">98</span></li>
                  <li className="flex justify-between"><span>Ajuste de Plan:</span> <span className="font-medium">45</span></li>
                  <li className="flex justify-between"><span>Primera Consulta:</span> <span className="font-medium">25</span></li>
                  <li className="flex justify-between"><span>Resultados de Pruebas:</span> <span className="font-medium">14</span></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorAnalytics;