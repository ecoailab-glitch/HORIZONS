import React from "react";
    import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card.jsx";
    import { Button } from "@/components/ui/button.jsx";
    import { Link } from "react-router-dom";
    import { Stethoscope, Users, FileText, BarChart2, MessageSquare, FlaskConical } from "lucide-react";
    import { motion } from "framer-motion";

    function DoctorFeatures() {
      const features = [
        {
          title: "Panel Principal",
          description: "Visualiza métricas clave y alertas de tus pacientes.",
          icon: <BarChart2 className="h-8 w-8 text-white" />,
          link: "/doctor/dashboard",
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Gestión de Pacientes",
          description: "Accede a los perfiles, progreso y datos de tus pacientes.",
          icon: <Users className="h-8 w-8 text-white" />,
          link: "/doctor/patients",
          color: "from-green-500 to-green-600",
        },
        {
          title: "Planes Nutricionales",
          description: "Crea y asigna planes de nutrición personalizados.",
          icon: <FileText className="h-8 w-8 text-white" />,
          link: "/doctor/nutrition-plans",
          color: "from-yellow-500 to-yellow-600",
        },
        {
          title: "Contexto Ambiental",
          description: "Analiza la exposición de tus pacientes a disruptores endocrinos.",
          icon: <FlaskConical className="h-8 w-8 text-white" />,
          link: "/doctor/patient-context",
          color: "from-indigo-500 to-indigo-600",
        },
        {
          title: "Análisis y Reportes",
          description: "Genera informes detallados sobre la evolución de los pacientes.",
          icon: <BarChart2 className="h-8 w-8 text-white" />,
          link: "/doctor/reports",
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Comunicación Segura",
          description: "Chatea de forma segura con tus pacientes y colegas.",
          icon: <MessageSquare className="h-8 w-8 text-white" />,
          link: "/doctor/communication",
          color: "from-pink-500 to-pink-600",
        },
      ];

      return (
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-block p-4 bg-purple-100 rounded-full">
                <Stethoscope className="h-10 w-10 text-purple-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mt-4">Portal para Profesionales</h1>
              <p className="text-lg text-gray-600 mt-2">Herramientas diseñadas para potenciar tu práctica clínica y el cuidado del paciente.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link to={feature.link} className="block h-full">
                    <Card className={`bg-gradient-to-br ${feature.color} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 h-full flex flex-col`}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/20 rounded-lg">
                            {feature.icon}
                          </div>
                          <CardTitle className="text-2xl">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="text-purple-100">{feature.description}</CardDescription>
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

    export default DoctorFeatures;