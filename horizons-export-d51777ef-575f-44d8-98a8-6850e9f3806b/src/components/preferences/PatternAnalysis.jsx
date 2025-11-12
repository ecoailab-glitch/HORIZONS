import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Search, 
  Users, 
  TrendingUp,
  Activity,
  Scale,
  Heart
} from "lucide-react";

function PatternAnalysis() {
  const [searchCriteria, setSearchCriteria] = useState({
    height: "",
    weight: "",
    age: "",
    condition: ""
  });

  const similarPatients = [
    {
      id: 1,
      matchScore: 92,
      profile: {
        height: "160cm",
        weight: "150kg → 85kg",
        age: "45",
        condition: "Obesidad + Diabetes Tipo 2"
      },
      improvements: {
        weight: "-65kg (43%)",
        glucose: "-45mg/dL",
        bloodPressure: "-15mmHg"
      },
      treatment: {
        nutrition: "Dieta mediterránea modificada",
        exercise: "30min/día progresivo",
        medication: "MetaSlim Plus + GlucoBalance",
        duration: "12 meses"
      }
    },
    {
      id: 2,
      matchScore: 88,
      profile: {
        height: "158cm",
        weight: "145kg → 82kg",
        age: "42",
        condition: "Obesidad + Hipertensión"
      },
      improvements: {
        weight: "-63kg (43%)",
        bloodPressure: "-25mmHg",
        cholesterol: "-40mg/dL"
      },
      treatment: {
        nutrition: "Dieta DASH adaptada",
        exercise: "45min/día",
        medication: "CardioBalance Pro",
        duration: "14 meses"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Análisis de Patrones</h1>
          </div>
          <Link to="/preferences">
            <Button variant="outline">Volver a Preferencias</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Buscar Similitudes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Altura (cm)</label>
                  <Input
                    type="number"
                    value={searchCriteria.height}
                    onChange={(e) => setSearchCriteria({...searchCriteria, height: e.target.value})}
                    placeholder="160"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Peso (kg)</label>
                  <Input
                    type="number"
                    value={searchCriteria.weight}
                    onChange={(e) => setSearchCriteria({...searchCriteria, weight: e.target.value})}
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Edad</label>
                  <Input
                    type="number"
                    value={searchCriteria.age}
                    onChange={(e) => setSearchCriteria({...searchCriteria, age: e.target.value})}
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Condición</label>
                  <Input
                    value={searchCriteria.condition}
                    onChange={(e) => setSearchCriteria({...searchCriteria, condition: e.target.value})}
                    placeholder="Obesidad, Diabetes..."
                  />
                </div>
                <Button className="w-full">Buscar Patrones</Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              {similarPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        Caso Similar #{patient.id}
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                        {patient.matchScore}% coincidencia
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <Activity className="h-4 w-4 text-gray-500" />
                          Perfil del Paciente
                        </h3>
                        <div className="space-y-2 text-sm">
                          {Object.entries(patient.profile).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          Mejoras Conseguidas
                        </h3>
                        <div className="space-y-2 text-sm">
                          {Object.entries(patient.improvements).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 capitalize">{key}:</span>
                              <span className="font-medium text-green-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Tratamiento Exitoso
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(patient.treatment).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-600 capitalize">{key}:</span>
                            <p className="font-medium mt-1">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatternAnalysis;