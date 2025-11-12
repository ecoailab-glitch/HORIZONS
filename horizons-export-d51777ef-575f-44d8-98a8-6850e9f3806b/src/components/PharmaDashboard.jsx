import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LineChart, BarChart, PieChart, Activity, Users, TrendingUp, Package } from "lucide-react";
import PopulationMetrics from "@/components/pharma/PopulationMetrics";
import TreatmentEffectiveness from "@/components/pharma/TreatmentEffectiveness";
import ProductRecommendations from "@/components/pharma/ProductRecommendations";
import BusinessMetrics from "@/components/pharma/BusinessMetrics";

function PharmaDashboard() {
  const [selectedTab, setSelectedTab] = useState("population");

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Panel de Control Farmacéutico
        </h1>
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 gap-4 mb-8">
            <TabsTrigger value="population" className="text-white">
              <Users className="mr-2" />
              Población
            </TabsTrigger>
            <TabsTrigger value="treatments" className="text-white">
              <Activity className="mr-2" />
              Tratamientos
            </TabsTrigger>
            <TabsTrigger value="products" className="text-white">
              <Package className="mr-2" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="business" className="text-white">
              <TrendingUp className="mr-2" />
              Negocio
            </TabsTrigger>
          </TabsList>

          <TabsContent value="population">
            <PopulationMetrics />
          </TabsContent>

          <TabsContent value="treatments">
            <TreatmentEffectiveness />
          </TabsContent>

          <TabsContent value="products">
            <ProductRecommendations />
          </TabsContent>

          <TabsContent value="business">
            <BusinessMetrics />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

export default PharmaDashboard;