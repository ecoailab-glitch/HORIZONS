import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Calendar } from "@/components/ui/calendar.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.jsx";
import { PlusCircle, Trash2, Utensils, CalendarPlus as CalendarDaysIcon, BarChart3, Camera, Zap, Apple, Carrot, Drumstick } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast.jsx";

const initialMeals = {
  [format(new Date(), 'yyyy-MM-dd')]: [
    { id: 'm1', name: 'Avena con frutas', type: 'Desayuno', calories: 350, protein: 15, carbs: 50, fat: 10, items: [{name: 'Avena', qty: '1 taza'}, {name: 'Fresas', qty: '1/2 taza'}, {name: 'Nueces', qty: '1 puñado'}] },
    { id: 'm2', name: 'Pollo a la plancha con ensalada', type: 'Almuerzo', calories: 550, protein: 40, carbs: 30, fat: 25, items: [{name: 'Pechuga de pollo', qty: '150g'}, {name: 'Lechuga mixta', qty: '2 tazas'}, {name: 'Tomate cherry', qty: '10 unidades'}, {name: 'Aceite de oliva', qty: '1 cda'}] },
  ]
};

const mealTypeIcons = {
  Desayuno: <Apple className="h-5 w-5 text-yellow-500" />,
  Almuerzo: <Drumstick className="h-5 w-5 text-orange-500" />,
  Cena: <Carrot className="h-5 w-5 text-red-500" />,
  Snack: <Zap className="h-5 w-5 text-green-500" />,
};

function MealTracker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealsByDate, setMealsByDate] = useState(initialMeals);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', type: 'Desayuno', calories: '', protein: '', carbs: '', fat: '', itemsInput: '' });

  const mealsForSelectedDate = mealsByDate[format(selectedDate, 'yyyy-MM-dd')] || [];

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
      toast({ title: "Campos incompletos", description: "Por favor, ingresa el nombre y las calorías de la comida.", variant: "destructive" });
      return;
    }
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const itemsArray = newMeal.itemsInput.split(',').map(item => {
      const parts = item.trim().split('(');
      return { name: parts[0].trim(), qty: parts[1] ? parts[1].replace(')','').trim() : 'N/A' };
    }).filter(item => item.name);

    const mealToAdd = { 
      id: `m${Date.now()}`, 
      ...newMeal, 
      calories: parseInt(newMeal.calories) || 0,
      protein: parseInt(newMeal.protein) || 0,
      carbs: parseInt(newMeal.carbs) || 0,
      fat: parseInt(newMeal.fat) || 0,
      items: itemsArray
    };
    
    setMealsByDate(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), mealToAdd]
    }));
    setNewMeal({ name: '', type: 'Desayuno', calories: '', protein: '', carbs: '', fat: '', itemsInput: '' });
    setIsAddingMeal(false);
    toast({ title: "Comida Añadida", description: `${mealToAdd.name} ha sido registrada.` });
  };

  const handleDeleteMeal = (mealId) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setMealsByDate(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(meal => meal.id !== mealId)
    }));
    toast({ title: "Comida Eliminada", description: "La comida ha sido eliminada de tu registro." });
  };
  
  const totalCalories = mealsForSelectedDate.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = mealsForSelectedDate.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = mealsForSelectedDate.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = mealsForSelectedDate.reduce((sum, meal) => sum + meal.fat, 0);

  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="shadow-xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold flex items-center gap-2"><Utensils /> Registro de Comidas</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="text-white border-white hover:bg-white/20">
                    <CalendarDaysIcon className="mr-2 h-5 w-5" />
                    {format(selectedDate, "PPP", { locale: es })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus locale={es} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button size="sm" variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={() => setSelectedDate(subDays(selectedDate,1))}>Día Anterior</Button>
                <Button size="sm" variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={() => setSelectedDate(new Date())}>Hoy</Button>
                <Button size="sm" variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={() => setSelectedDate(addDays(selectedDate,1))}>Día Siguiente</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Comidas del {format(selectedDate, "dd 'de' MMMM", { locale: es })}</h2>
              <div className="flex gap-2">
                <Button onClick={() => setIsAddingMeal(!isAddingMeal)} variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  <PlusCircle className="mr-2 h-5 w-5" /> {isAddingMeal ? 'Cancelar' : 'Añadir Comida'}
                </Button>
                <Button onClick={unimplementedFeatureToast} variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                  <Camera className="mr-2 h-5 w-5" /> Analizar con IA
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isAddingMeal && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 border rounded-lg bg-gray-50 shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="mealName">Nombre de la Comida</Label>
                      <Input id="mealName" value={newMeal.name} onChange={e => setNewMeal({...newMeal, name: e.target.value})} placeholder="Ej: Ensalada César" />
                    </div>
                    <div>
                      <Label htmlFor="mealType">Tipo de Comida</Label>
                      <Select value={newMeal.type} onValueChange={value => setNewMeal({...newMeal, type: value})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Desayuno">Desayuno</SelectItem>
                          <SelectItem value="Almuerzo">Almuerzo</SelectItem>
                          <SelectItem value="Cena">Cena</SelectItem>
                          <SelectItem value="Snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div><Label htmlFor="calories">Calorías</Label><Input id="calories" type="number" value={newMeal.calories} onChange={e => setNewMeal({...newMeal, calories: e.target.value})} placeholder="kcal" /></div>
                    <div><Label htmlFor="protein">Proteínas (g)</Label><Input id="protein" type="number" value={newMeal.protein} onChange={e => setNewMeal({...newMeal, protein: e.target.value})} placeholder="g" /></div>
                    <div><Label htmlFor="carbs">Carbs (g)</Label><Input id="carbs" type="number" value={newMeal.carbs} onChange={e => setNewMeal({...newMeal, carbs: e.target.value})} placeholder="g" /></div>
                    <div><Label htmlFor="fat">Grasas (g)</Label><Input id="fat" type="number" value={newMeal.fat} onChange={e => setNewMeal({...newMeal, fat: e.target.value})} placeholder="g" /></div>
                  </div>
                  <div className="mb-4">
                    <Label htmlFor="itemsInput">Ingredientes (nombre (cantidad), ...)</Label>
                    <Input id="itemsInput" value={newMeal.itemsInput} onChange={e => setNewMeal({...newMeal, itemsInput: e.target.value})} placeholder="Ej: Pollo (100g), Lechuga (1 taza)" />
                  </div>
                  <Button onClick={handleAddMeal} className="w-full bg-green-600 hover:bg-green-700">Guardar Comida</Button>
                </motion.div>
              )}
            </AnimatePresence>

            {mealsForSelectedDate.length > 0 ? (
              <ul className="space-y-4">
                {mealsForSelectedDate.map(meal => (
                  <motion.li key={meal.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row justify-between items-start pb-2">
                        <div>
                          <CardTitle className="text-lg font-medium flex items-center gap-2">
                            {mealTypeIcons[meal.type] || <Utensils className="h-5 w-5 text-gray-400" />}
                            {meal.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-gray-500">{meal.type}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMeal(meal.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700 pt-0">
                        <p><strong>Calorías:</strong> {meal.calories} kcal</p>
                        <p><strong>Macros:</strong> P: {meal.protein}g, C: {meal.carbs}g, G: {meal.fat}g</p>
                        {meal.items && meal.items.length > 0 && (
                          <div className="mt-2">
                            <strong>Ingredientes:</strong>
                            <ul className="list-disc list-inside ml-4 text-xs">
                              {meal.items.map((item, idx) => <li key={idx}>{item.name} ({item.qty})</li>)}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 py-8">No hay comidas registradas para esta fecha. ¡Añade una!</p>
            )}
          </CardContent>
          <CardFooter className="bg-gray-50 p-4 border-t">
            <div className="w-full">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Resumen del Día:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <p><strong>Total Calorías:</strong> {totalCalories} kcal</p>
                <p><strong>Total Proteínas:</strong> {totalProtein} g</p>
                <p><strong>Total Carbs:</strong> {totalCarbs} g</p>
                <p><strong>Total Grasas:</strong> {totalFat} g</p>
              </div>
              <Button variant="link" className="mt-2 p-0 h-auto text-green-600 hover:text-green-700" onClick={unimplementedFeatureToast}>
                <BarChart3 className="mr-1 h-4 w-4" /> Ver análisis nutricional detallado
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default MealTracker;