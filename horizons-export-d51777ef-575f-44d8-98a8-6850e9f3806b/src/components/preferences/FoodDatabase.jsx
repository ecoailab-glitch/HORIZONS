import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Globe, ArrowLeftRight, DollarSign } from "lucide-react";

function FoodDatabase() {
  const [selectedCountry, setSelectedCountry] = useState("España");
  const [searchTerm, setSearchTerm] = useState("");

  const foodSubstitutions = {
    "España": {
      "Salmón": {
        alternatives: [
          {
            name: "Sardinas",
            nutritionalMatch: 92,
            costRatio: 0.3,
            nutrients: {
              omega3: "2.2g",
              protein: "24g",
              vitamins: ["D", "B12"]
            }
          },
          {
            name: "Caballa",
            nutritionalMatch: 88,
            costRatio: 0.4,
            nutrients: {
              omega3: "1.8g",
              protein: "20g",
              vitamins: ["D", "B12"]
            }
          }
        ]
      },
      "Quinoa": {
        alternatives: [
          {
            name: "Mijo",
            nutritionalMatch: 85,
            costRatio: 0.7,
            nutrients: {
              protein: "11g",
              fiber: "6g",
              minerals: ["hierro", "magnesio"]
            }
          }
        ]
      }
    },
    "México": {
      "Salmón": {
        alternatives: [
          {
            name: "Atún",
            nutritionalMatch: 90,
            costRatio: 0.5,
            nutrients: {
              omega3: "1.6g",
              protein: "23g",
              vitamins: ["D", "B12"]
            }
          }
        ]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Base de Datos de Alimentos</h1>
          </div>
          <Link to="/preferences">
            <Button variant="outline">Volver a Preferencias</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">País</label>
                  <select
                    className="w-full mt-1 border rounded-md p-2"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="España">España</option>
                    <option value="México">México</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Colombia">Colombia</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Buscar Alimento</label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10"
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              {Object.entries(foodSubstitutions[selectedCountry] || {}).map(([food, data]) => (
                <Card key={food}>
                  <CardHeader>
                    <CardTitle>{food}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.alternatives.map((alt, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <ArrowLeftRight className="h-5 w-5 text-green-500" />
                              <h3 className="font-medium">{alt.name}</h3>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                {alt.nutritionalMatch}% match
                              </span>
                              <span className="flex items-center gap-1 text-gray-600">
                                <DollarSign className="h-4 w-4" />
                                {alt.costRatio}x costo
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Nutrientes</h4>
                              <ul className="space-y-1 text-sm text-gray-600">
                                {Object.entries(alt.nutrients).map(([key, value]) => (
                                  <li key={key} className="flex justify-between">
                                    <span className="capitalize">{key}:</span>
                                    <span>{value}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Vitaminas</h4>
                              <div className="flex flex-wrap gap-2">
                                {alt.nutrients.vitamins?.map((vitamin, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                                  >
                                    Vitamina {vitamin}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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

export default FoodDatabase;