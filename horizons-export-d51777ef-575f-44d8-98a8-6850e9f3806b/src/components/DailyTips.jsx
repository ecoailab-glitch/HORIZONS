import React from "react";
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

function DailyTips() {
  const tips = [
    "Bebe al menos 8 vasos de agua al día",
    "Toma un descanso de 5 minutos cada hora",
    "Incluye proteínas en cada comida",
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        <h3 className="text-xl font-semibold">Consejos del Día</h3>
      </div>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="p-3 bg-secondary rounded-lg text-sm font-medium"
          >
            {tip}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default DailyTips;