import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare, Send, User, Search } from "lucide-react";

function PharmaCommunication() {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const conversations = [
    {
      id: 1,
      specialist: "Dr. Martínez",
      specialty: "Endocrinología",
      lastMessage: "Necesito confirmar la disponibilidad de GlucoBalance Plus",
      timestamp: "10:30",
      unread: true
    },
    {
      id: 2,
      specialist: "Dra. López",
      specialty: "Nutrición",
      lastMessage: "¿Tienen stock de MetaSlim Advanced?",
      timestamp: "09:15",
      unread: false
    },
    {
      id: 3,
      specialist: "Dr. Sánchez",
      specialty: "Cardiología",
      lastMessage: "Gracias por la información sobre CardioHealth Pro",
      timestamp: "Ayer",
      unread: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "specialist",
      text: "Buenos días, ¿tienen disponibilidad de GlucoBalance Plus?",
      timestamp: "2025-04-24T10:00:00"
    },
    {
      id: 2,
      sender: "pharma",
      text: "Sí, actualmente tenemos 150 unidades en stock.",
      timestamp: "2025-04-24T10:05:00"
    }
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "pharma",
      text: message,
      timestamp: new Date().toISOString()
    };

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">Comunicación con Especialistas</h1>
          <Link to="/pharma-features">
            <Button variant="secondary">Volver</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversaciones</CardTitle>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Buscar especialista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      conv.unread ? "bg-green-50" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{conv.specialist}</h4>
                          <span className="text-xs text-gray-500">{conv.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500">{conv.specialty}</p>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat con Dr. Martínez
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "pharma" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === "pharma"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PharmaCommunication;