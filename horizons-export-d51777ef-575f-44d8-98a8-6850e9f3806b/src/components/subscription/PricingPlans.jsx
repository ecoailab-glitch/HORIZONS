import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

function PricingPlans() {
  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "9.99",
      features: [
        "Seguimiento básico de salud",
        "Recomendaciones generales",
        "Conexión con sensores básicos",
        "Soporte por email"
      ]
    },
    {
      id: "pro",
      name: "Profesional",
      price: "29.99",
      features: [
        "Todas las características básicas",
        "Análisis avanzado de alimentos",
        "Conexión con todos los sensores",
        "Recomendaciones personalizadas",
        "Soporte prioritario 24/7"
      ],
      recommended: true
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "Personalizado",
      features: [
        "Todas las características profesionales",
        "API personalizada",
        "Integración con sistemas existentes",
        "Soporte dedicado",
        "Cumplimiento HIPAA/GDPR"
      ]
    }
  ];

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Planes y Precios</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 ${plan.recommended ? 'border-primary' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {plan.recommended && (
                    <Star className="h-5 w-5 text-yellow-500" />
                  )}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">
                    {typeof plan.price === 'string' ? `€${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'string' && <span className="text-sm">/mes</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">
                  {plan.id === 'enterprise' ? 'Contactar' : 'Comenzar'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PricingPlans;