import React from "react";
    import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card.jsx";
    import { Button } from "@/components/ui/button.jsx";
    import { Link } from "react-router-dom";
    import { Settings, Database, Brain, Globe, BarChart as ChartBar, Shield, Bluetooth, Cpu, FlaskConical, BrainCircuit } from 'lucide-react';
    import { motion } from 'framer-motion';

    function AppPreferences() {
      const preferenceSections = [
        {
          title: "Dispositivos Médicos",
          description: "Gestiona la conexión con tus dispositivos de monitoreo de salud.",
          icon: <Bluetooth className="h-6 w-6 text-blue-500" />,
          link: "/preferences/devices",
          color: "blue"
        },
        {
          title: "Base de Datos de Alimentos",
          description: "Gestiona y personaliza la base de datos de alimentos por país.",
          icon: <Database className="h-6 w-6 text-green-500" />,
          link: "/preferences/food-database",
          color: "green"
        },
        {
          title: "Análisis de Patrones",
          description: "Accede a datos anonimizados y encuentra patrones de tratamiento exitosos.",
          icon: <Brain className="h-6 w-6 text-purple-500" />,
          link: "/preferences/pattern-analysis",
          color: "purple"
        },
        {
          title: "Configuración Regional",
          description: "Adapta la aplicación a diferentes países y culturas.",
          icon: <Globe className="h-6 w-6 text-cyan-500" />,
          link: "/preferences/regional-config",
          color: "cyan"
        },
        {
          title: "Análisis de Big Data",
          description: "Análisis científico de datos anonimizados para investigación médica.",
          icon: <ChartBar className="h-6 w-6 text-orange-500" />,
          link: "/preferences/big-data",
          color: "orange"
        },
        {
          title: "Privacidad y Seguridad",
          description: "Gestión avanzada de protección de datos médicos.",
          icon: <Shield className="h-6 w-6 text-red-500" />,
          link: "/preferences/privacy",
          color: "red"
        },
        {
          title: "Inteligencia Artificial",
          description: "Conexión con sistemas de IA para análisis y asistencia médica.",
          icon: <Cpu className="h-6 w-6 text-gray-500" />,
          link: "/preferences/ai",
          color: "gray"
        },
        {
          title: "Base de Datos de Disruptores",
          description: "Gestiona las sustancias y productos en el escáner de disruptores.",
          icon: <FlaskConical className="h-6 w-6 text-teal-500" />,
          link: "/preferences/disruptors-database",
          color: "teal"
        },
        {
          title: "Panel de Control de Robin",
          description: "Configura los parámetros de simulación y colaboración de la IA.",
          icon: <BrainCircuit className="h-6 w-6 text-indigo-500" />,
          link: "/preferences/robin-control",
          color: "indigo"
        }
      ];

      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: i => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.05,
          },
        }),
      };

      return (
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-green-600" />
                <h1 className="text-3xl font-bold text-gray-900">Preferencias y Personalización</h1>
              </div>
              <Link to="/">
                <Button variant="outline">Volver a Inicio</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preferenceSections.map((section, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link to={section.link} className="h-full block">
                    <Card className={`h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-l-4 border-${section.color}-500`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-gray-800">
                          {React.cloneElement(section.icon, { className: `h-6 w-6 text-${section.color}-500` })}
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{section.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    export default AppPreferences;