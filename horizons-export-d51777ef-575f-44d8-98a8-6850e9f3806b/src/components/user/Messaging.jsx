import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Search, Send, Paperclip, UserCircle, Phone, Video, Users, MessageSquare, Settings2, SmilePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";

const ContactListItem = ({ contact, onSelectContact, isActive }) => (
  <motion.div
    whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }} /* bg-gray-100 */
    className={`flex items-center p-3 cursor-pointer rounded-lg ${isActive ? 'bg-sky-100' : ''}`}
    onClick={() => onSelectContact(contact)}
  >
    <Avatar className="h-10 w-10 mr-3">
      <AvatarImage src={contact.avatarUrl || `https://avatar.vercel.sh/${contact.name}.png`} alt={contact.name} />
      <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold text-sm text-gray-800">{contact.name}</p>
      <p className={`text-xs ${contact.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
        {contact.isOnline ? 'En línea' : contact.lastSeen || 'Desconectado'}
      </p>
    </div>
    {contact.unreadMessages > 0 && (
      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
        {contact.unreadMessages}
      </span>
    )}
  </motion.div>
);

const MessageBubble = ({ message, isOwnMessage }) => (
  <div className={`flex mb-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow ${isOwnMessage ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
    >
      <p className="text-sm">{message.text}</p>
      <p className={`text-xs mt-1 ${isOwnMessage ? 'text-blue-200' : 'text-gray-500'} text-right`}>{message.time}</p>
    </motion.div>
  </div>
);

function Messaging() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Dr. Alan Grant (Nutricionista)', avatarUrl: '/placeholder-avatar.png', isOnline: true, unreadMessages: 2, messages: [
      { id: 'm1', text: 'Hola! ¿Cómo va la dieta esta semana?', time: '10:30 AM', sender: 'contact' },
      { id: 'm2', text: 'Hola Dr. Grant! Todo bien, aunque tuve un pequeño desliz el fin de semana.', time: '10:32 AM', sender: 'user' },
      { id: 'm3', text: 'No te preocupes, es normal. Lo importante es retomar. ¿Alguna duda específica?', time: '10:33 AM', sender: 'contact' },
    ]},
    { id: 2, name: 'Laura (Entrenadora Personal)', avatarUrl: '/placeholder-avatar.png', isOnline: false, lastSeen: 'Ayer a las 8:15 PM', unreadMessages: 0, messages: [] },
    { id: 3, name: 'Grupo de Apoyo "Vida Sana"', avatarUrl: '/placeholder-avatar.png', isOnline: true, unreadMessages: 5, messages: [] },
  ]);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredContacts = contacts.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedContact) return;
    const message = {
      id: `m${Date.now()}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user'
    };
    
    const updatedContacts = contacts.map(c => 
      c.id === selectedContact.id 
        ? { ...c, messages: [...c.messages, message], unreadMessages: 0 } 
        : c
    );
    setContacts(updatedContacts);
    setSelectedContact(updatedContacts.find(c => c.id === selectedContact.id));
    setNewMessage('');
    // Simular respuesta del contacto después de un momento
    if (selectedContact.id === 1) { // Solo para Dr. Grant
        setTimeout(() => {
            const reply = {
                id: `m${Date.now() + 1}`,
                text: "Entendido. Analicemos eso en nuestra próxima consulta. Sigue adelante!",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                sender: 'contact'
            };
            const finalContacts = updatedContacts.map(c => 
              c.id === selectedContact.id 
                ? { ...c, messages: [...c.messages, reply] } 
                : c
            );
            setContacts(finalContacts);
            setSelectedContact(finalContacts.find(c => c.id === selectedContact.id));
        }, 1500);
    }
  };
  
  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-sky-100">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sky-700 flex items-center gap-2">
            <MessageSquare className="h-7 w-7" /> Mensajería Segura
          </h1>
          <Button variant="outline" onClick={unimplementedFeatureToast}><Settings2 className="mr-2 h-4 w-4"/> Opciones</Button>
        </div>
      </header>

      <div className="flex-grow flex max-w-7xl mx-auto w-full p-4 gap-4">
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
                placeholder="Buscar contacto o grupo..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <Tabs defaultValue="contacts" className="flex-grow flex flex-col">
            <TabsList className="grid w-full grid-cols-2 p-2">
              <TabsTrigger value="contacts"><Users className="mr-1 h-4 w-4 inline-block"/>Contactos</TabsTrigger>
              <TabsTrigger value="groups" onClick={unimplementedFeatureToast}><Users className="mr-1 h-4 w-4 inline-block"/>Grupos</TabsTrigger>
            </TabsList>
            <TabsContent value="contacts" className="flex-grow overflow-y-auto p-2 space-y-1">
              {filteredContacts.length > 0 ? filteredContacts.map(contact => (
                <ContactListItem 
                  key={contact.id} 
                  contact={contact} 
                  onSelectContact={setSelectedContact}
                  isActive={selectedContact?.id === contact.id}
                />
              )) : (
                <p className="text-center text-gray-500 p-4">No se encontraron contactos.</p>
              )}
            </TabsContent>
            <TabsContent value="groups" className="flex-grow overflow-y-auto p-2">
              <p className="text-center text-gray-500 p-4">Los grupos de chat aún no están disponibles.</p>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-2/3 bg-white rounded-xl shadow-lg flex flex-col"
        >
          <AnimatePresence mode="wait">
            {selectedContact ? (
              <motion.div 
                key={selectedContact.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={selectedContact.avatarUrl || `https://avatar.vercel.sh/${selectedContact.name}.png`} alt={selectedContact.name} />
                      <AvatarFallback>{selectedContact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedContact.name}</CardTitle>
                      <p className={`text-xs ${selectedContact.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                        {selectedContact.isOnline ? 'En línea' : selectedContact.lastSeen || 'Desconectado'}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-1">
                    <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Phone className="h-5 w-5 text-gray-600 hover:text-sky-600" /></Button>
                    <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Video className="h-5 w-5 text-gray-600 hover:text-sky-600" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto p-4 space-y-2 bg-slate-50">
                  {selectedContact.messages.map(msg => (
                    <MessageBubble key={msg.id} message={msg} isOwnMessage={msg.sender === 'user'} />
                  ))}
                  {selectedContact.messages.length === 0 && (
                     <p className="text-center text-gray-500 p-4">No hay mensajes aún. Inicia la conversación.</p>
                  )}
                </CardContent>
                <CardFooter className="p-3 border-t bg-white">
                  <div className="flex w-full items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><SmilePlus className="h-5 w-5 text-gray-500 hover:text-sky-600" /></Button>
                    <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Paperclip className="h-5 w-5 text-gray-500 hover:text-sky-600" /></Button>
                    <Textarea 
                      placeholder="Escribe un mensaje seguro..." 
                      className="flex-grow resize-none min-h-[40px] max-h-[120px] bg-slate-100 border-slate-200 focus:bg-white" 
                      rows={1}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                    />
                    <Button onClick={handleSendMessage} className="bg-sky-600 hover:bg-sky-700 rounded-lg">
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
                <p className="text-lg">Selecciona un contacto para chatear.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default Messaging;