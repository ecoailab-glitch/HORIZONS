import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Activity, BarChart3, Droplets, HeartPulse, Users, Zap, Target, CalendarDays, UtensilsCrossed, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, progress, color, unit, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {React.cloneElement(icon, { className: `h-5 w-5 text-${color}-500` })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}{unit && <span className="text-xs text-muted-foreground">{unit}</span>}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {progress !== undefined && <Progress value={progress} className={`mt-2 h-2 bg-${color}-100 [&>div]:bg-${color}-500`} />}
      </CardContent>
    </Card>
  </motion.div>
);

const ActionButton = ({ to, title, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link to={to}>
      <Button variant="outline" className={`w-full justify-start gap-3 py-6 text-left bg-gradient-to-r from-${color}-50 to-${color}-100 hover:from-${color}-100 hover:to-${color}-200 border-${color}-200 text-${color}-700`}>
        {React.cloneElement(icon, { className: `h-6 w-6` })}
        <span className="text-md font-semibold">{title}</span>
      </Button>
    </Link>
  </motion.div>
);

function Dashboard() {
  const userStats = [
    { title: "Pasos Hoy", value: "8,230", icon: <Activity />, progress: 82, color: "blue", unit: " pasos" },
    { title: "Calorías Quemadas", value: "350", icon: <Zap />, progress: 70, color: "orange", unit: " kcal" },
    { title: "Ritmo Cardíaco", value: "72", icon: <HeartPulse />, color: "red", unit: " bpm", description: "En reposo" },
    { title: "Hidratación", value: "1.2", icon: <Droplets />, progress: 60, color: "sky", unit: " L", description: "Objetivo: 2L" },
  ];

  const quickActions = [
    { to: "/meals", title: "Registrar Comida", icon: <UtensilsCrossed />, color: "green" },
    { to: "/progress", title: "Ver Progreso", icon: <BarChart3 />, color: "purple" },
    { to: "/nutrition-plan", title: "Plan Nutricional", icon: <CalendarDays />, color: "yellow" },
    { to: "/messages", title: "Mensajes", icon: <MessageSquare />, color: "pink" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold tracking-tight text-gray-800">Hola, Usuario!</h1>
        <p className="text-lg text-gray-600">Bienvenido a tu panel de control personalizado.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {userStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-indigo-500" />
                Acciones Rápidas
              </CardTitle>
              <CardDescription>Accede rápidamente a las funciones más utilizadas.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <ActionButton key={index} {...action} />
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                Comunidad y Soporte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Conéctate con otros usuarios o contacta a nuestros especialistas.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Unirse a la Comunidad
                </Button>
                <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Contactar Soporte
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs opacity-80">Tu bienestar es nuestra prioridad.</p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;