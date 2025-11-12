import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Heart, 
  TrendingUp, 
  Dna, 
  Pill, 
  LineChart,
  AlertTriangle 
} from "lucide-react";

function PatientAnalysis({ patientData }) {
  const biomarkers = {
    glucosa: { value: 120, unit: "mg/dL", trend: "descendente" },
    proteinas: { value: 6.8, unit: "g/dL", trend: "estable" },
    lipidos: { value: 180, unit: "mg/dL", trend: "descendente" },
    insulina: { value: 15, unit: "μU/mL", trend: "ascendente" }
  };

  const proteinAnalysis = {
    estructurales: 85,
    funcionales: 92,
    transportadoras: 78,
    defensivas: 88
  };

  const recommendations = [
    {
      type: "Ajuste de Medicación",
      description: "Basado en el perfil proteico, se sugiere ajustar la dosis de GlucoBalance Plus",
      priority: "alta"
    },
    {
      type: "Monitorización",
      description: "Incrementar la frecuencia de medición de glucosa",
      priority: "media"
    },
    {
      type: "Nutrición",
      description: "Suplementación específica de aminoácidos esenciales",
      priority: "baja"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Biomarcadores Principales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(biomarkers).map(([key, data]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium capitalize">{key}</p>
                    <p className="text-sm text-gray-500">
                      {data.value} {data.unit}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    data.trend === "ascendente" ? "bg-green-100 text-green-600" :
                    data.trend === "descendente" ? "bg-red-100 text-red-600" :
                    "bg-blue-100 text-blue-600"
                  }`}>
                    Tendencia {data.trend}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dna className="h-5 w-5 text-purple-500" />
              Análisis Proteico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(proteinAnalysis).map(([type, value]) => (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium capitalize">{type}</span>
                    <span className="text-sm text-gray-500">{value}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-green-500" />
            Recomendaciones de Tratamiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  rec.priority === "alta" ? "bg-red-100" :
                  rec.priority === "media" ? "bg-yellow-100" :
                  "bg-green-100"
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    rec.priority === "alta" ? "text-red-500" :
                    rec.priority === "media" ? "text-yellow-500" :
                    "text-green-500"
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium">{rec.type}</h4>
                  <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                    rec.priority === "alta" ? "bg-red-100 text-red-600" :
                    rec.priority === "media" ? "bg-yellow-100 text-yellow-600" :
                    "bg-green-100 text-green-600"
                  }`}>
                    Prioridad {rec.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">Ver Historial Completo</Button>
            <Button>Generar Informe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PatientAnalysis;