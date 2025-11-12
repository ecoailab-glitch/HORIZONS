import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Package, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast.jsx";

function PharmaInventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const inventory = [
    {
      id: 1,
      name: "GlucoBalance Plus",
      stock: 150,
      minRequired: 100,
      status: "Normal",
      category: "Diabetes",
      lastRestock: "2025-04-15",
      supplier: "PharmaCorp",
      price: 45.99
    },
    {
      id: 2,
      name: "MetaSlim Advanced",
      stock: 80,
      minRequired: 120,
      status: "Bajo",
      category: "Control de Peso",
      lastRestock: "2025-04-10",
      supplier: "HealthPharm",
      price: 39.99
    },
    {
      id: 3,
      name: "CardioHealth Pro",
      stock: 200,
      minRequired: 150,
      status: "Normal",
      category: "Cardiovascular",
      lastRestock: "2025-04-20",
      supplier: "MedSupply",
      price: 52.99
    }
  ];

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Control de Inventario</h1>
          <Link to="/pharma-features">
            <Button variant="secondary">Volver</Button>
          </Link>
        </div>

        <Tabs defaultValue="stock" className="space-y-8">
          <TabsList>
            <TabsTrigger value="stock">Stock Actual</TabsTrigger>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
          </TabsList>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Buscar por nombre o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={unimplementedFeatureToast}>
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={unimplementedFeatureToast}>
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>

          <TabsContent value="stock">
            <div className="space-y-4">
              {filteredInventory.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Package className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <div className="mt-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                              item.status === "Normal" ? "bg-green-100 text-green-600" :
                              item.status === "Bajo" ? "bg-yellow-100 text-yellow-600" :
                              "bg-red-100 text-red-600"
                            }`}>
                              Stock {item.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">€{item.price}</p>
                        <p className="text-sm text-gray-500">
                          Último restock: {item.lastRestock}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Proveedor: {item.supplier}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Stock Actual</p>
                          <p className="text-2xl font-bold">{item.stock}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Stock Mínimo</p>
                          <p className="text-2xl font-bold">{item.minRequired}</p>
                        </div>
                        <div>
                          {item.stock >= item.minRequired ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-8 w-8 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                      <Button variant="outline" size="sm" onClick={unimplementedFeatureToast}>Ver Historial</Button>
                      <Button variant="outline" size="sm" onClick={unimplementedFeatureToast}>Ajustar Stock</Button>
                      <Button size="sm" onClick={unimplementedFeatureToast}>Realizar Pedido</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Alertas de Inventario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInventory
                    .filter(item => item.stock < item.minRequired)
                    .map(item => (
                      <div key={item.id} className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Stock actual: {item.stock}</p>
                        </div>
                        <Button size="sm" onClick={unimplementedFeatureToast}>Gestionar</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5text-blue-500" />
                  Pedidos en Curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 1, product: "MetaSlim Advanced", quantity: 200, supplier: "HealthPharm", status: "En Proceso", date: "2025-04-26" },
                    { id: 2, product: "CardioHealth Pro", quantity: 150, supplier: "MedSupply", status: "Confirmado", date: "2025-04-25" }
                  ].map(order => (
                    <div key={order.id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                      <div>
                        <p className="font-medium">{order.product}</p>
                        <p className="text-sm text-gray-600">Cantidad: {order.quantity}</p>
                        <p className="text-sm text-gray-500">Proveedor: {order.supplier}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "En Proceso" ? "bg-blue-100 text-blue-600" :
                          "bg-green-100 text-green-600"
                        }`}>
                          {order.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default PharmaInventory;