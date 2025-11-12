import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Plus, Apple } from "lucide-react";
import Webcam from "react-webcam";
import { useToast } from "@/components/ui/use-toast";

function NutritionTracker() {
  const [showCamera, setShowCamera] = useState(false);
  const [meals, setMeals] = useState(() => {
    const savedMeals = localStorage.getItem("meals");
    return savedMeals ? JSON.parse(savedMeals) : [];
  });
  const { toast } = useToast();
  const webcamRef = React.useRef(null);

  const capturePhoto = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const newMeal = {
      id: Date.now(),
      photo: imageSrc,
      timestamp: new Date().toISOString(),
    };
    
    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    localStorage.setItem("meals", JSON.stringify(updatedMeals));
    
    setShowCamera(false);
    toast({
      title: "Foto guardada",
      description: "La foto de tu comida ha sido guardada exitosamente.",
    });
  }, [meals, toast]);

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          <Apple className="h-6 w-6" />
          Registro de Alimentación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {showCamera ? (
            <div className="relative">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded-lg"
              />
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={capturePhoto}>
                  <Camera className="mr-2 h-4 w-4" />
                  Capturar Foto
                </Button>
                <Button variant="outline" onClick={() => setShowCamera(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setShowCamera(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Comida
            </Button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meals.map((meal) => (
              <div key={meal.id} className="relative">
                <img
                  src={meal.photo}
                  alt="Comida registrada"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-lg">
                  {new Date(meal.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NutritionTracker;