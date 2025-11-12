import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, ArrowLeft, Apple, Fish, Beef, Wheat } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corregir el problema de los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function RegionalConfig() {
  const [selectedRegion, setSelectedRegion] = useState("España");

  const foodMarkers = [
    {
      position: [40.4168, -3.7038], // Madrid, España
      country: "España",
      foods: [
        { name: "Sardinas", type: "Pescado", icon: <Fish className="h-4 w-4" />, substitutes: ["Salmón", "Caballa"] },
        { name: "Aceite de Oliva", type: "Grasa Saludable", substitutes: ["Aguacate", "Frutos Secos"] },
        { name: "Jamón Ibérico", type: "Proteína", icon: <Beef className="h-4 w-4" />, substitutes: ["Pavo", "Pollo"] }
      ]
    },
    {
      position: [19.4326, -99.1332], // Ciudad de México
      country: "México",
      foods: [
        { name: "Aguacate", type: "Grasa Saludable", substitutes: ["Aceite de Oliva", "Frutos Secos"] },
        { name: "Atún", type: "Pescado", icon: <Fish className="h-4 w-4" />, substitutes: ["Salmón", "Sardinas"] },
        { name: "Frijoles", type: "Proteína", icon: <Apple className="h-4 w-4" />, substitutes: ["Lentejas", "Garbanzos"] }
      ]
    },
    {
      position: [-34.6037, -58.3816], // Buenos Aires, Argentina
      country: "Argentina",
      foods: [
        { name: "Carne de Res", type: "Proteína", icon: <Beef className="h-4 w-4" />, substitutes: ["Pollo", "Pescado"] },
        { name: "Quinoa", type: "Cereal", icon: <Wheat className="h-4 w-4" />, substitutes: ["Arroz", "Amaranto"] }
      ]
    },
    {
      position: [4.7110, -74.0721], // Bogotá, Colombia
      country: "Colombia",
      foods: [
        { name: "Pescado Caribe", type: "Pescado", icon: <Fish className="h-4 w-4" />, substitutes: ["Atún", "Sardinas"] },
        { name: "Aguacate", type: "Grasa Saludable", substitutes: ["Aceite de Oliva", "Frutos Secos"] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">Configuración Regional</h1>
          </div>
          <Link to="/preferences">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Mapa de Alimentos Regionales</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <MapContainer
                  center={[20, 0]}
                  zoom={2}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {foodMarkers.map((marker, index) => (
                    <Marker
                      key={index}
                      position={marker.position}
                      eventHandlers={{
                        click: () => setSelectedRegion(marker.country)
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold mb-2">{marker.country}</h3>
                          <ul className="space-y-1">
                            {marker.foods.map((food, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                {food.icon}
                                {food.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Alimentos Regionales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium">Región Seleccionada</label>
                    <select
                      className="w-full mt-1 border rounded-md p-2"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                      {foodMarkers.map((marker, index) => (
                        <option key={index} value={marker.country}>
                          {marker.country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-4">
                    {foodMarkers
                      .find(marker => marker.country === selectedRegion)
                      ?.foods.map((food, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {food.icon}
                            <h3 className="font-medium">{food.name}</h3>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">Tipo: {food.type}</p>
                          <div>
                            <p className="text-sm font-medium mb-1">Sustitutos Regionales:</p>
                            <div className="flex flex-wrap gap-2">
                              {food.substitutes.map((substitute, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                                >
                                  {substitute}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegionalConfig;