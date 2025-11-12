import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Pill, ClipboardList, Users, BarChartBig, MessageCircle, Settings, PackageSearch, FlaskConical, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, linkTo, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
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

function PharmaFeatures() {
  const features = [
    {
      title: "Panel Principal",
      description: "Visión general de prescripciones, inventario y métricas clave.",
      icon: <Building />,
      linkTo: "/pharma/dashboard",
      color: "sky"
    },
    {
      title: "Gestión de Prescripciones",
      description: "Procesa y gestiona prescripciones de forma segura y eficiente.",
      icon: <ClipboardList />,
      linkTo: "/pharma/prescriptions",
      color: "blue"
    },
    {
      title: "Control de Inventario",
      description: "Administra tu stock de medicamentos y suministros.",
      icon: <PackageSearch />,
      linkTo: "/pharma/inventory",
      color: "green"
    },
    {
      title: "Análisis de Pacientes (Anonimizado)",
      description: "Accede a datos agregados y anonimizados para análisis poblacionales.",
      icon: <Users />,
      linkTo: "/pharma/patients",
      color: "purple"
    },
    {
      title: "Métricas de Negocio",
      description: "Visualiza reportes y análisis sobre el rendimiento y tendencias.",
      icon: <BarChartBig />,
      linkTo: "/pharma/dashboard", 
      color: "orange"
    },
    {
      title: "Comunicación",
      description: "Canal de comunicación seguro con profesionales de la salud.",
      icon: <MessageCircle />,
      linkTo: "/pharma/communication",
      color: "red"
    },
    {
      title: "Investigación y Desarrollo",
      description: "Herramientas para el análisis de datos en I+D de nuevos fármacos.",
      icon: <FlaskConical />,
      linkTo: "/pharma/dashboard", 
      color: "teal"
    },
    {
      title: "Perfil y Configuración",
      description: "Gestiona la información de tu farmacia y preferencias del sistema.",
      icon: <Settings />,
      linkTo: "/pharma/profile",
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
        <Pill className="mx-auto h-16 w-16 text-sky-600 mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">Portal Farmacéutico</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Soluciones integrales para la gestión farmacéutica, investigación y análisis de datos.
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

export default PharmaFeatures;