import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Users, FileText, BarChart3, Bell, MessageSquarePlus, Video, Activity, ShieldAlert, CalendarCheck2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        {trend && <p className={`text-xs mt-1 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{trend}</p>}
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

const QuickAction = ({ title, icon, linkTo, color }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="h-full"
  >
    <Link to={linkTo} className="h-full">
      <Card className={`h-full shadow-md hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br from-${color}-50 to-${color}-100 border-${color}-200`}>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
          {React.cloneElement(icon, { className: `h-10 w-10 text-${color}-600 mb-3` })}
          <p className={`text-md font-semibold text-${color}-700`}>{title}</p>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);


function DoctorDashboard() {
  const stats = [
    { title: "Pacientes Activos", value: "128", icon: <Users />, trend: "+5 esta semana", color: "blue", unit: "pacientes", linkTo: "/doctor/patients" },
    { title: "Consultas Hoy", value: "7", icon: <CalendarCheck2 />, trend: "2 pendientes", color: "green", unit: "consultas", linkTo: "/video-consulta" },
    { title: "Alertas Críticas", value: "3", icon: <ShieldAlert />, trend: "Atención requerida", color: "red", unit: "alertas", linkTo: "#alerts" },
    { title: "Planes por Revisar", value: "12", icon: <FileText />, trend: "Próximos vencimientos", color: "yellow", unit: "planes", linkTo: "/doctor/nutrition-plans" },
  ];

  const quickActions = [
    { title: "Ver Pacientes", icon: <Users />, linkTo: "/doctor/patients", color: "sky" },
    { title: "Crear Plan Nutricional", icon: <MessageSquarePlus />, linkTo: "/doctor/nutrition-plans", color: "lime" },
    { title: "Iniciar Videoconsulta", icon: <Video />, linkTo: "/video-consulta", color: "fuchsia" },
    { title: "Ver Reportes", icon: <BarChart3 />, linkTo: "/doctor/reports", color: "amber" },
  ];
  
  const recentActivity = [
    { patient: "Ana Pérez", action: "Actualizó su registro de comidas.", time: "Hace 15 min", icon: <Activity className="text-green-500"/> },
    { patient: "Carlos López", action: "Alerta: Nivel de glucosa alto.", time: "Hace 30 min", icon: <ShieldAlert className="text-red-500"/> },
    { patient: "Laura Gómez", action: "Envió un nuevo mensaje.", time: "Hace 1 hora", icon: <MessageSquarePlus className="text-blue-500"/> },
    { patient: "Roberto Diaz", action: "Completó el 75% de su plan semanal.", time: "Hace 2 horas", icon: <FileText className="text-purple-500"/> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">Panel del Doctor</h1>
        <p className="text-lg text-gray-600">Bienvenido, Dr. [Apellido]. Aquí tiene un resumen de su actividad.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-indigo-500" />
                Actividad Reciente de Pacientes
              </CardTitle>
              <CardDescription>Últimas actualizaciones y alertas importantes.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.patient}: <span className="text-gray-600 font-normal">{activity.action}</span></p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Ver toda la actividad</Button>
            </CardFooter>
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
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-6 w-6 text-orange-500" />
                Acciones Rápidas
              </CardTitle>
              <CardDescription>Acceda directamente a las funciones más comunes.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <QuickAction key={index} {...action} />
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorDashboard;