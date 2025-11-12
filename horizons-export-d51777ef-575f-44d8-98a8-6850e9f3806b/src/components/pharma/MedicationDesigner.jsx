import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlaskRound as Flask, Dna, Microscope, Pill, LineChart, Save, Share2 } from 'lucide-react';

function MedicationDesigner({ patientData }) {
  const [formula, setFormula] = useState({
    baseCompound: "",
    activeIngredients: [],
    dosage: 0,
    frequency: ""
  });

  const proteinProfile = {
    estructurales: {
      nivel: 85,
      recomendacion: "Mantener estructura actual"
    },
    metabolicas: {
      nivel: 92,
      recomendacion: "Ajustar concentración"
    },
    transportadoras: {
      nivel: 78,
      recomendacion: "Incrementar biodisponibilidad"
    }
  };

  const aiSuggestions = [
    {
      type: "Composición",
      suggestion: "Incrementar concentración de metformina",
      confidence: 92
    },
    {
      type: "Dosificación",
      suggestion: "Reducir intervalo de administración",
      confidence: 88
    },
    {
      type: "Interacciones",
      suggestion: "Compatible con tratamiento actual",
      confidence: 95
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flask className="h-5 w-5 text-purple-500" />
              Diseño de Fórmula Personalizada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Compuesto Base</label>
                <Input
                  placeholder="Ej: Metformina HCl"
                  value={formula.baseCompound}
                  onChange={(e) => setFormula({
                    ...formula,
                    baseCompound: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ingredientes Activos</label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {formula.activeIngredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {/* Añadir ingrediente */}}
                  >
                    + Añadir
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Dosificación (mg)</label>
                  <Input
                    type="number"
                    value={formula.dosage}
                    onChange={(e) => setFormula({
                      ...formula,
                      dosage: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Frecuencia</label>
                  <Input
                    placeholder="Ej: Cada 12 horas"
                    value={formula.frequency}
                    onChange={(e) => setFormula({
                      ...formula,
                      frequency: e.target.value
                    })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dna className="h-5 w-5 text-blue-500" />
              Perfil Proteico del Paciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(proteinProfile).map(([type, data]) => (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium capitalize">{type}</span>
                    <span className="text-sm text-gray-500">{data.nivel}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${data.nivel}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{data.recomendacion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-green-500" />
            Recomendaciones del Sistema IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{suggestion.type}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {suggestion.suggestion}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    {suggestion.confidence}% confianza
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Compartir con Especialista
            </Button>
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Guardar Fórmula
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MedicationDesigner;