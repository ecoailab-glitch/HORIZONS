import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button.jsx";
import { motion } from 'framer-motion';
import { Zap, Users, ShieldCheck, BarChart3, HeartPulse, Brain, Utensils } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
  >
    {React.cloneElement(icon, { className: "w-12 h-12 text-green-500 mb-4" })}
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-center text-sm">{description}</p>
  </motion.div>
);

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 text-white">
      <header className="py-6 px-4 md:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">NutriPersonal</h1>
          <nav>
            <Link to="/user-features">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-600 transition-colors">
                Acceder
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 md:px-8 py-12 md:py-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <img-replace 
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
            alt="Plato de comida saludable y colorida" 
            className="w-full max-w-2xl h-auto rounded-xl shadow-2xl object-cover mx-auto mb-8"
            style={{ aspectRatio: '16/9', maxHeight: '400px' }}
          />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Transforma tu Bienestar con <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">Nutrición Inteligente</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-green-50">
            Descubre un enfoque personalizado para tu salud, combinando ciencia de datos, IA y el acompañamiento de expertos.
          </p>
          <div className="space-x-4">
            <Link to="/user-features">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg px-8 py-3 text-lg">
                Comienza Ahora
              </Button>
            </Link>
            <Link to="/doctor-features">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-emerald-600 transition-transform transform hover:scale-105 shadow-lg px-8 py-3 text-lg">
                Soy Profesional
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mt-16">
          <FeatureCard
            icon={<Zap />}
            title="Planes Personalizados"
            description="Dietas y rutinas adaptadas a tus necesidades y objetivos únicos, impulsadas por IA."
            delay={0.2}
          />
          <FeatureCard
            icon={<BarChart3 />}
            title="Seguimiento Avanzado"
            description="Monitoriza tu progreso con métricas detalladas y visualizaciones intuitivas."
            delay={0.4}
          />
          <FeatureCard
            icon={<Users />}
            title="Soporte Experto"
            description="Conecta con nutricionistas y especialistas para un acompañamiento profesional."
            delay={0.6}
          />
          <FeatureCard
            icon={<HeartPulse />}
            title="Salud Integral"
            description="Enfoque holístico que considera todos los aspectos de tu bienestar físico y mental."
            delay={0.8}
          />
          <FeatureCard
            icon={<Brain />}
            title="IA Predictiva"
            description="Anticipa tus necesidades y ajusta tu plan para optimizar resultados a largo plazo."
            delay={1.0}
          />
          <FeatureCard
            icon={<Utensils />}
            title="Base de Datos de Alimentos"
            description="Amplia información nutricional y contextualización de alimentos según tu región."
            delay={1.2}
          />
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-green-100">&copy; {new Date().getFullYear()} NutriPersonal. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default LandingPage;