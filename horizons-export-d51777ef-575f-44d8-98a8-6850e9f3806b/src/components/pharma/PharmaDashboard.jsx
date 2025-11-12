import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Pill, ClipboardList, PackageSearch, Users, BarChartBig, AlertTriangle, TrendingUp, TrendingDown, Settings, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Bar, ComposedChart, CartesianGrid, BarChart } from 'recharts';

const salesData = [
  { name: 'Ene', ventas: 4000, objetivo: 3800 }, { name: 'Feb', ventas: 3000, objetivo: 3200 },
  { name: 'Mar', ventas: 5000, objetivo: 4500 }, { name: 'Abr', ventas: 4780, objetivo: 4800 },
  { name: 'May', ventas: 5890, objetivo: 5500 }, { name: 'Jun', ventas: 4390, objetivo: 4800 },
];

const inventoryStatusData = [
  { name: 'Analgésicos', stock: 85, umbral: 20 }, { name: 'Antibióticos', stock: 60, umbral: 30 },
  { name: 'Vitaminas', stock: 92, umbral: 25 }, { name: 'Antihistamínicos', stock: 45, umbral: 20 },
  { name: 'Antiácidos', stock: 70, umbral: 15 },
];

const StatCard = ({ title, value, icon, trend, color, unit, description, linkTo }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {React.cloneElement(icon, { className: `h-5 w-5 text-${color}-500` })}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold">{value}{unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && <p className={`text-xs mt-1 ${trend.startsWith('+') ? 'text-green-500' : trend.startsWith('-') ? 'text-red-500' : 'text-gray-500'}`}>{trend}</p>}
      </CardContent>
      {linkTo && (
        <CardFooter>
          <Link to={linkTo} className="w-full">
            <Button variant="outline" size="sm" className={`w-full border-${color}-300 text-${color}-600 hover:bg-${color}-50`}>Ver Detalles</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.stroke }} className="text-xs">
            {`${entry.name}: ${entry.value}${entry.unit || ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function PharmaDashboard() {
  const stats = [
    { title: "Prescripciones Hoy", value: "72", icon: <ClipboardList />, trend: "+5 vs ayer", color: "blue", unit: "prescripciones", linkTo: "/pharma/prescriptions" },
    { title: "Ventas del Mes", value: "25,8K", icon: <TrendingUp />, trend: "+12% vs mes anterior", color: "green", unit: "€", linkTo: "#sales" },
    { title: "Niveles Bajos de Stock", value: "3", icon: <AlertTriangle />, trend: "Requiere atención", color: "red", unit: "productos", linkTo: "/pharma/inventory" },
    { title: "Pacientes Atendidos (Mes)", value: "1,205", icon: <Users />, trend: "PAC-2025-XXX", color: "purple", unit: "códigos", linkTo: "/pharma/patients" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">Panel de Farmacia</h1>
        <p className="text-lg text-gray-600">Bienvenido. Resumen de actividad y métricas clave.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="text-green-500" />Rendimiento de Ventas</CardTitle>
              <CardDescription>Ventas mensuales vs objetivo.</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} />
                  <YAxis unit="€" tick={{ fontSize: 12, fill: '#666' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="ventas" barSize={20} fill="#10B981" name="Ventas" unit="€" />
                  <Line type="monotone" dataKey="objetivo" stroke="#FF7300" strokeWidth={2} name="Objetivo" unit="€" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full"
        >
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><PackageSearch className="text-blue-500" />Estado del Inventario</CardTitle>
              <CardDescription>Niveles de stock de categorías principales.</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryStatusData} layout="vertical" margin={{ right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis type="number" unit="%" domain={[0, 100]} tick={{ fontSize: 12, fill: '#666' }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: '#666' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="stock" fill="#3B82F6" name="Stock Actual (%)" unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickLinkCard title="Gestionar Prescripciones" icon={<ClipboardList />} linkTo="/pharma/prescriptions" color="sky" />
        <QuickLinkCard title="Control de Inventario" icon={<PackageSearch />} linkTo="/pharma/inventory" color="teal" />
        <QuickLinkCard title="Investigación (I+D)" icon={<FlaskConical />} linkTo="/pharma/dashboard" color="indigo" />
      </div>
    </div>
  );
}

const QuickLinkCard = ({ title, icon, linkTo, color }) => (
  <motion.div whileHover={{ y: -5 }} className="h-full">
    <Link to={linkTo} className="block h-full">
      <Card className={`shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-${color}-500 to-${color}-600 text-white h-full`}>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
          {React.cloneElement(icon, { className: "h-12 w-12 mb-3 opacity-80" })}
          <p className="text-lg font-semibold">{title}</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

export default PharmaDashboard;