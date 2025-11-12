import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Search, Send, Paperclip, UserPlus, Phone, Video, Users, MessageSquare, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const PatientListItem = ({ patient, onSelectPatient, isActive }) => (
  <motion.div
    whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }} /* bg-gray-100 */
    className={`flex items-center p-3 cursor-pointer rounded-lg ${isActive ? 'bg-sky-100' : ''}`}
    onClick={() => onSelectPatient(patient)}
  >
    <Avatar className="h-10 w-10 mr-3">
      <AvatarImage src={patient.avatarUrl || `https://avatar.vercel.sh/${patient.name}.png`} alt={patient.name} />
      <AvatarFallback>{patient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold text-sm text-gray-800">{patient.name}</p>
      <p className={`text-xs ${patient.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
        {patient.isOnline ? 'En línea' : 'Desconectado'}
      </p>
    </div>
    {patient.unreadMessages > 0 && (
      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
        {patient.unreadMessages}
      </span>
    )}
  </motion.div>
);

const MessageBubble = ({ message, isOwnMessage }) => (
  <div className={`flex mb-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
      <p className="text-sm">{message.text}</p>
      <p className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-200' : 'text-gray-500'} text-right`}>{message.time}</p>
    </div>
  </div>
);

function DoctorCommunication() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Ana Pérez', avatarUrl: '/placeholder-avatar.png', isOnline: true, unreadMessages: 2, messages: [
      { id: 'm1', text: 'Hola Doctor, tengo una duda sobre mi dieta.', time: '10:30 AM', sender: 'patient' },
      { id: 'm2', text: 'Claro Ana, dime cuál es tu duda.', time: '10:32 AM', sender: 'doctor' },
    ]},
    { id: 2, name: 'Carlos López', avatarUrl: '/placeholder-avatar.png', isOnline: false, unreadMessages: 0, messages: [] },
    { id: 3, name: 'Laura Gómez', avatarUrl: '/placeholder-avatar.png', isOnline: true, unreadMessages: 0, messages: [] },
    { id: 4, name: 'Roberto Diaz', avatarUrl: '/placeholder-avatar.png', isOnline: false, unreadMessages: 5, messages: [] },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedPatient) return;
    const message = {
      id: `m${Date.now()}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'doctor'
    };
    
    const updatedPatients = patients.map(p => 
      p.id === selectedPatient.id 
        ? { ...p, messages: [...p.messages, message] } 
        : p
    );
    setPatients(updatedPatients);
    setSelectedPatient(updatedPatients.find(p => p.id === selectedPatient.id));
    setNewMessage('');
    toast({ title: "Mensaje Enviado", description: `Tu mensaje para ${selectedPatient.name} ha sido enviado.` });
  };
  
  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-sky-100">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-700 flex items-center gap-2">
            <MessageSquare className="h-7 w-7" /> Comunicación Segura
          </h1>
          <Button variant="outline" onClick={unimplementedFeatureToast}><Settings2 className="mr-2 h-4 w-4"/> Opciones</Button>
        </div>
      </header>

      <div className="flex-grow flex max-w-7xl mx-auto w-full p-4 gap-4">
        {/* Panel Izquierdo: Lista de Pacientes y Pestañas */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/3 bg-white rounded-xl shadow-lg flex flex-col"
        >
          <div className="p-4 border-b">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Buscar paciente..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Tabs defaultValue="patients" className="flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-2 p-2">
              <TabsTrigger value="patients"><Users className="mr-1 h-4 w-4 inline-block"/>Pacientes</TabsTrigger>
              <TabsTrigger value="groups" onClick={unimplementedFeatureToast}><Users className="mr-1 h-4 w-4 inline-block"/>Grupos</TabsTrigger>
            </TabsList>
            <TabsContent value="patients" className="flex-grow overflow-y-auto p-2 space-y-1">
              {filteredPatients.length > 0 ? filteredPatients.map(patient => (
                <PatientListItem 
                  key={patient.id} 
                  patient={patient} 
                  onSelectPatient={setSelectedPatient}
                  isActive={selectedPatient?.id === patient.id}
                />
              )) : (
                <p className="text-center text-gray-500 p-4">No se encontraron pacientes.</p>
              )}
            </TabsContent>
            <TabsContent value="groups" className="flex-grow overflow-y-auto p-2">
              <p className="text-center text-gray-500 p-4">Los grupos de chat aún no están disponibles.</p>
            </TabsContent>
          </Tabs>
          <div className="p-3 border-t">
            <Button className="w-full bg-green-500 hover:bg-green-600" onClick={unimplementedFeatureToast}>
              <UserPlus className="mr-2 h-5 w-5" /> Nuevo Chat
            </Button>
          </div>
        </motion.div>

        {/* Panel Derecho: Chat Activo */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-2/3 bg-white rounded-xl shadow-lg flex flex-col"
        >
          <AnimatePresence mode="wait">
            {selectedPatient ? (
              <motion.div 
                key={selectedPatient.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedPatient.avatarUrl || `https://avatar.vercel.sh/${selectedPatient.name}.png`} alt={selectedPatient.name} />
                      <AvatarFallback>{selectedPatient.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedPatient.name}</CardTitle>
                      <p className={`text-xs ${selectedPatient.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                        {selectedPatient.isOnline ? 'En línea' : 'Desconectado'}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Phone className="h-5 w-5 text-gray-600 hover:text-sky-600" /></Button>
                    <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Video className="h-5 w-5 text-gray-600 hover:text-sky-600" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {selectedPatient.messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} isOwnMessage={msg.sender === 'doctor'} />
                  ))}
                  {selectedPatient.messages.length === 0 && (
                     <p className="text-center text-gray-500 p-4">No hay mensajes aún. Inicia la conversación.</p>
                  )}
                </CardContent>
                <CardFooter className="p-4 border-t bg-white">
                  <div className="flex w-full items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Paperclip className="h-5 w-5 text-gray-500" /></Button>
                    <Textarea 
                      placeholder="Escribe un mensaje..." 
                      className="flex-grow resize-none min-h-[40px] max-h-[120px]" 
                      rows={1}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                    />
                    <Button onClick={handleSendMessage} className="bg-sky-600 hover:bg-sky-700">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </motion.div>
            ) : (
              <motion.div 
                key="no-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full text-gray-500"
              >
                <MessageSquare className="h-24 w-24 mb-4 text-gray-300" />
                <p className="text-lg">Selecciona un paciente para chatear.</p>
                <p className="text-sm">O inicia una nueva conversación.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorCommunication;