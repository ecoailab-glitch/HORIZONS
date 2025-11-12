import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { User, UtensilsCrossed, BarChart3, MessageSquare, Settings, Video, Activity, ShieldCheck, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, linkTo, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-${color}-500 h-full flex flex-col`}>
      <CardHeader>
        <div className={`p-3 rounded-full bg-gradient-to-br from-${color}-400 to-${color}-600 text-white inline-block mb-3 shadow-md`}>
          {React.cloneElement(icon, { size: 28 })}
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 flex-grow">{description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Link to={linkTo}>
          <Button className={`w-full bg-${color}-500 hover:bg-${color}-600 text-white`}>
            Acceder
          </Button>
        </Link>
      </CardContent>
    </Card>
  </motion.div>
);

function UserFeatures() {
  const features = [
    {
      title: "Mi Perfil",
      description: "Gestiona tu información personal, objetivos de salud y preferencias.",
      icon: <User />,
      linkTo: "/profile",
      color: "blue"
    },
    {
      title: "Registro de Comidas",
      description: "Lleva un control de tus comidas y analiza tu ingesta calórica y nutricional.",
      icon: <UtensilsCrossed />,
      linkTo: "/meals",
      color: "green"
    },
    {
      title: "Seguimiento de Progreso",
      description: "Visualiza tu avance con gráficos y reportes detallados sobre tus métricas.",
      icon: <BarChart3 />,
      linkTo: "/progress",
      color: "purple"
    },
    {
      title: "Plan Nutricional Personalizado",
      description: "Accede a tu plan de comidas y recomendaciones adaptadas por IA y expertos.",
      icon: <Brain />,
      linkTo: "/nutrition-plan",
      color: "yellow"
    },
    {
      title: "Mensajería Segura",
      description: "Comunícate de forma directa y segura con tus profesionales de la salud.",
      icon: <MessageSquare />,
      linkTo: "/messages",
      color: "orange"
    },
    {
      title: "Videoconsultas",
      description: "Realiza consultas remotas con tus especialistas de forma cómoda y segura.",
      icon: <Video />,
      linkTo: "/video-consulta",
      color: "red"
    },
     {
      title: "Monitor de Actividad",
      description: "Sincroniza tus dispositivos y sigue tu actividad física diaria.",
      icon: <Activity />,
      linkTo: "/progress", 
      color: "teal"
    },
    {
      title: "Configuración y Privacidad",
      description: "Ajusta las preferencias de la app, gestiona tus datos y configuraciones de privacidad.",
      icon: <Settings />,
      linkTo: "/preferences",
      color: "gray"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <ShieldCheck className="mx-auto h-16 w-16 text-green-600 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">Tu Espacio de Bienestar</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Todas las herramientas que necesitas para alcanzar tus objetivos de salud y nutrición.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default UserFeatures;