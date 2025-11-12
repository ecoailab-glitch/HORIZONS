import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Star, TrendingUp, Users } from "lucide-react";

function ProductRecommendations() {
  const products = [
    {
      id: 1,
      name: "GlucoBalance Plus",
      type: "Control Glucémico",
      effectiveness: 92,
      population: "Diabetes Tipo 2",
      recommendation: "Alta"
    },
    {
      id: 2,
      name: "MetaSlim Advanced",
      type: "Control de Peso",
      effectiveness: 88,
      population: "Obesidad",
      recommendation: "Media"
    },
    {
      id: 3,
      name: "CardioHealth Pro",
      type: "Salud Cardiovascular",
      effectiveness: 94,
      population: "Hipertensión",
      recommendation: "Alta"
    }
  ];

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <Card key={product.id} className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                {product.name}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.recommendation === "Alta" 
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                Recomendación {product.recommendation}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Efectividad: {product.effectiveness}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Población: {product.population}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Tipo: {product.type}</span>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <Button>Ver Detalles</Button>
              <Button variant="outline">Estadísticas de Uso</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ProductRecommendations;