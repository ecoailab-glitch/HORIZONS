import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function PatientList() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const patients = [
    {
      id: 1,
      name: "Ana García",
      age: 35,
      condition: "Diabetes Tipo 2",
      lastVisit: "2025-05-01",
      nextVisit: "2025-05-15",
      mealData: [
        {
          time: "08:00",
          meal: "Tostada integral con aguacate",
          glucoseBefore: 130,
          glucoseAfter: 145,
          photo: "tostada.jpg",
          timestamp: "2025-05-01T08:00"
        },
        {
          time: "13:00",
          meal: "Ensalada de quinoa con pollo",
          glucoseBefore: 120,
          glucoseAfter: 135,
          photo: "ensalada.jpg",
          timestamp: "2025-05-01T13:00"
        },
        {
          time: "20:00",
          meal: "Salmón al horno con verduras",
          glucoseBefore: 115,
          glucoseAfter: 125,
          photo: "salmon.jpg",
          timestamp: "2025-05-01T20:00"
        }
      ]
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      age: 42,
      condition: "Hipertensión",
      lastVisit: "2025-05-02",
      nextVisit: "2025-05-16",
      mealData: [
        {
          time: "09:00",
          meal: "Avena con frutas",
          glucoseBefore: 110,
          glucoseAfter: 125,
          photo: "avena.jpg",
          timestamp: "2025-05-02T09:00"
        }
      ]
    },
    {
      id: 3,
      name: "María López",
      age: 28,
      condition: "Control de Peso",
      lastVisit: "2025-05-03",
      nextVisit: "2025-05-17",
      mealData: [
        {
          time: "08:30",
          meal: "Batido verde",
          glucoseBefore: 95,
          glucoseAfter: 105,
          photo: "batido.jpg",
          timestamp: "2025-05-03T08:30"
        }
      ]
    }
  ];

  const formatGlucoseData = (mealData) => {
    return mealData.map(meal => ({
      time: meal.time,
      antes: meal.glucoseBefore,
      después: meal.glucoseAfter,
      comida: meal.meal
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Pacientes</h1>
        <Link to="/doctor/dashboard">
          <Button variant="outline">Volver al Dashboard</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar pacientes..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {patients.map((patient) => (
          <Card key={patient.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{patient.name}</h3>
                  <p className="text-sm text-gray-500">
                    {patient.age} años - {patient.condition}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Próxima visita: {patient.nextVisit}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedPatient(patient);
                    setShowModal(true);
                  }}
                >
                  Ver Perfil
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {showModal && selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Perfil del Paciente</h2>
                  <Button variant="ghost" onClick={() => setShowModal(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Nombre</p>
                          <p className="font-medium">{selectedPatient.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Edad</p>
                          <p className="font-medium">{selectedPatient.age} años</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Condición</p>
                          <p className="font-medium">{selectedPatient.condition}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Próxima Visita</p>
                          <p className="font-medium">{selectedPatient.nextVisit}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Correlación Comidas - Glucosa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={formatGlucoseData(selectedPatient.mealData)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="antes" 
                              stroke="#8884d8" 
                              name="Glucosa antes"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="después" 
                              stroke="#82ca9d" 
                              name="Glucosa después"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-4">
                        {selectedPatient.mealData.map((meal, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{meal.time} - {meal.meal}</p>
                                <p className="text-sm text-gray-500">
                                  Glucosa antes: {meal.glucoseBefore} mg/dL
                                </p>
                                <p className="text-sm text-gray-500">
                                  Glucosa después: {meal.glucoseAfter} mg/dL
                                </p>
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                  meal.glucoseAfter - meal.glucoseBefore > 30
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-green-100 text-green-600'
                                }`}>
                                  Δ {meal.glucoseAfter - meal.glucoseBefore} mg/dL
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default PatientList;