import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Bell, Clipboard, Settings, AlertTriangle } from "lucide-react";
import PatientList from "@/components/doctor/PatientList";
import AlertsPanel from "@/components/doctor/AlertsPanel";
import RecommendationsEditor from "@/components/doctor/RecommendationsEditor";
import DoctorMetrics from "@/components/doctor/DoctorMetrics";

function DoctorDashboard() {
  const [selectedTab, setSelectedTab] = useState("patients");

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h1 className="text-3xl font-bold text-white mb-4">
          Panel Médico
        </h1>
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-4 gap-4 mb-8">
            <TabsTrigger value="patients" className="text-white">
              <Users className="mr-2" />
              Pacientes
            </TabsTrigger>
            <TabsTrigger value="alerts" className="text-white">
              <Bell className="mr-2" />
              Alertas
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-white">
              <Clipboard className="mr-2" />
              Recomendaciones
            </TabsTrigger>
            <TabsTrigger value="metrics" className="text-white">
              <Settings className="mr-2" />
              Métricas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <PatientList />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationsEditor />
          </TabsContent>

          <TabsContent value="metrics">
            <DoctorMetrics />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

export default DoctorDashboard;