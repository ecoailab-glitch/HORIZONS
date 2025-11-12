import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

function ActivityTracker() {
  const activities = [
    {
      type: "Caminata",
      duration: "30 min",
      calories: "150 kcal",
    },
    {
      type: "Ejercicios",
      duration: "45 min",
      calories: "300 kcal",
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="h-6 w-6 text-blue-500" />
        <h3 className="text-xl font-semibold">Actividad Diaria</h3>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="p-4 bg-secondary rounded-lg"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{activity.type}</span>
              <span className="text-sm text-muted-foreground">
                {activity.duration}
              </span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {activity.calories}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ActivityTracker;