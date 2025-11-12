import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Plus, Edit2 } from "lucide-react";

function RecommendationsEditor() {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Plan Nutricional - Diabetes",
      content: "Plan personalizado para pacientes con diabetes tipo 2...",
      target: "diabetes",
    },
    {
      id: 2,
      title: "Rutina de Ejercicios - Obesidad",
      content: "Programa de actividad física para pérdida de peso...",
      target: "obesity",
    }
  ]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Plantillas de Recomendaciones</span>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Plantilla
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 border rounded-lg bg-background"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{rec.title}</h3>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {rec.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      Dirigido a: {rec.target}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecommendationsEditor;