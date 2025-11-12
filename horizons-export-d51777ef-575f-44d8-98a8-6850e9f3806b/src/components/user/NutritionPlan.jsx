import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { CheckCircle, Zap, Target, CalendarDays, Utensils, RefreshCw, Download, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";

const dailyPlanExample = {
  day: "Lunes",
  date: "17 de Junio, 2025",
  caloriesTarget: 2200,
  meals: [
    { name: "Desayuno (8:00 AM)", description: "Avena con frutas y nueces.", calories: 450, protein: 20, carbs: 60, fat: 15, items: ["Avena (50g)", "Leche de almendras (200ml)", "Fresas (100g)", "Nueces (20g)"] },
    { name: "Snack (11:00 AM)", description: "Yogur griego con miel.", calories: 200, protein: 15, carbs: 20, fat: 8, items: ["Yogur griego (150g)", "Miel (1 cda)"] },
    { name: "Almuerzo (2:00 PM)", description: "Salmón al horno con quinoa y espárragos.", calories: 700, protein: 45, carbs: 55, fat: 30, items: ["Salmón (150g)", "Quinoa (80g cocida)", "Espárragos (150g)", "Aceite de oliva (1 cda)"] },
    { name: "Snack (5:00 PM)", description: "Manzana con mantequilla de almendras.", calories: 250, protein: 8, carbs: 30, fat: 12, items: ["Manzana (1 mediana)", "Mantequilla de almendras (2 cdas)"] },
    { name: "Cena (8:00 PM)", description: "Pechuga de pollo a la plancha con ensalada mixta.", calories: 600, protein: 50, carbs: 40, fat: 25, items: ["Pechuga de pollo (150g)", "Lechuga, tomate, pepino (2 tazas)", "Vinagreta ligera"] },
  ],
  summary: {
    totalCalories: 2200,
    totalProtein: 138,
    totalCarbs: 205,
    totalFat: 90,
  }
};

const weeklyPlanOverview = [
  { day: "Lunes", focus: "Equilibrado", calories: 2200 },
  { day: "Martes", focus: "Alto en Proteínas", calories: 2300 },
  { day: "Miércoles", focus: "Bajo en Carbohidratos", calories: 2100 },
  { day: "Jueves", focus: "Recarga de Carbohidratos", calories: 2400 },
  { day: "Viernes", focus: "Equilibrado", calories: 2200 },
  { day: "Sábado", focus: "Comida Libre Moderada", calories: 2500 },
  { day: "Domingo", focus: "Ligero y Reparador", calories: 2000 },
];

function NutritionPlan() {

  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="shadow-xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-700 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Target className="h-8 w-8" /> Mi Plan Nutricional Personalizado
              </CardTitle>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={unimplementedFeatureToast}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Solicitar Ajustes
                </Button>
                <Button variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={unimplementedFeatureToast}>
                  <Download className="mr-2 h-4 w-4" /> Descargar PDF
                </Button>
              </div>
            </div>
            <CardDescription className="text-sky-100 mt-2">
              Diseñado por IA y revisado por tu especialista para ayudarte a alcanzar tus metas de salud.
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 bg-gray-100 p-1">
              <TabsTrigger value="today" className="py-2.5">Plan de Hoy</TabsTrigger>
              <TabsTrigger value="week" className="py-2.5">Vista Semanal</TabsTrigger>
              <TabsTrigger value="goals" className="py-2.5 col-span-2 md:col-span-1">Objetivos y Progreso</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{dailyPlanExample.day} - {dailyPlanExample.date}</h2>
                  <p className="text-lg font-medium text-indigo-600">Objetivo: {dailyPlanExample.caloriesTarget} kcal</p>
                </div>
                <div className="space-y-6">
                  {dailyPlanExample.meals.map((meal, index) => (
                    <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl font-medium text-sky-700">{meal.name}</CardTitle>
                        <CardDescription>{meal.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold text-sm mb-1">Detalles Nutricionales:</p>
                        <ul className="text-xs text-gray-600 list-disc list-inside space-y-0.5">
                          <li>Calorías: {meal.calories} kcal</li>
                          <li>Proteínas: {meal.protein}g, Carbohidratos: {meal.carbs}g, Grasas: {meal.fat}g</li>
                        </ul>
                        <p className="font-semibold text-sm mt-2 mb-1">Ingredientes Sugeridos:</p>
                        <ul className="text-xs text-gray-600 list-disc list-inside space-y-0.5">
                          {meal.items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700" onClick={unimplementedFeatureToast}>
                          <CheckCircle className="mr-2 h-4 w-4" /> Marcar como completado
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <Card className="mt-8 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-xl text-indigo-700">Resumen Nutricional del Día</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div><p className="text-2xl font-bold text-sky-600">{dailyPlanExample.summary.totalCalories}</p><p className="text-sm text-gray-500">Kcal Totales</p></div>
                    <div><p className="text-2xl font-bold text-green-600">{dailyPlanExample.summary.totalProtein}g</p><p className="text-sm text-gray-500">Proteínas</p></div>
                    <div><p className="text-2xl font-bold text-orange-600">{dailyPlanExample.summary.totalCarbs}g</p><p className="text-sm text-gray-500">Carbohidratos</p></div>
                    <div><p className="text-2xl font-bold text-red-600">{dailyPlanExample.summary.totalFat}g</p><p className="text-sm text-gray-500">Grasas</p></div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="week" className="p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resumen Semanal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {weeklyPlanOverview.map((dayInfo, index) => (
                    <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-sky-700">{dayInfo.day}</CardTitle>
                        <CardDescription>Enfoque: {dayInfo.focus}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-indigo-600">{dayInfo.calories} <span className="text-sm font-normal text-gray-500">kcal</span></p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" size="sm" className="p-0 h-auto text-green-600" onClick={unimplementedFeatureToast}>Ver detalles del día</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                 <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700" onClick={unimplementedFeatureToast}>
                    <CalendarDays className="mr-2 h-5 w-5" /> Ver Calendario Completo del Mes
                  </Button>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="goals" className="p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mis Objetivos y Progreso</h2>
                <Card className="bg-green-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700">Objetivo Principal: Pérdida de Peso</CardTitle>
                    <CardDescription>Meta: Perder 5kg en 8 semanas.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-600">2.5kg <span className="text-lg font-normal">perdidos (50%)</span></p>
                    <p className="text-sm text-gray-600 mt-1">¡Vas por buen camino! Sigue así.</p>
                    {/* Aquí podría ir un gráfico de progreso */}
                  </CardContent>
                </Card>
                <Card className="mt-6 bg-yellow-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-700">Objetivo Secundario: Aumentar Energía</CardTitle>
                    <CardDescription>Meta: Sentirme con más vitalidad durante el día.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-yellow-600">Nivel de energía reportado: 7/10 (Promedio semanal)</p>
                    <p className="text-sm text-gray-600 mt-1">Se observa una mejora gradual.</p>
                  </CardContent>
                </Card>
                <div className="mt-8 text-center">
                  <Button className="bg-sky-600 hover:bg-sky-700" onClick={unimplementedFeatureToast}>
                    <MessageSquare className="mr-2 h-5 w-5" /> Hablar con mi especialista sobre mis objetivos
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
}

export default NutritionPlan;