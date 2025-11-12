import React, { useRef, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Image as ImageIcon } from "lucide-react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import Webcam from "react-webcam";
import { useToast } from "@/components/ui/use-toast";

function FoodAnalysis() {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        toast({
          title: "Modelo de IA cargado",
          description: "El sistema está listo para analizar alimentos",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error al cargar el modelo de IA",
          description: "Por favor, intente recargar la página",
        });
      }
    };
    loadModel();
  }, []);

  const analyzeFood = async () => {
    if (!model || !webcamRef.current) return;

    setIsAnalyzing(true);
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      const img = new Image();
      img.src = imageSrc;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const tfImg = tf.browser.fromPixels(img);
      const predictions = await model.classify(tfImg);
      
      setPrediction(predictions[0]);
      toast({
        title: "Análisis completado",
        description: `Se detectó: ${predictions[0].className}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error en el análisis",
        description: "No se pudo analizar la imagen",
      });
    }
    setIsAnalyzing(false);
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-6 w-6" />
          Análisis de Alimentos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full rounded-lg"
            />
          </div>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={analyzeFood}
              disabled={!model || isAnalyzing}
              className="flex items-center gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              {isAnalyzing ? "Analizando..." : "Analizar Alimento"}
            </Button>
          </div>

          {prediction && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <h3 className="font-semibold mb-2">Resultado del Análisis:</h3>
              <p>Alimento detectado: {prediction.className}</p>
              <p>Confianza: {(prediction.probability * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default FoodAnalysis;