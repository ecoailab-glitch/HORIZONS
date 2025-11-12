import React, { useState } from 'react';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
    import { Button } from "@/components/ui/button.jsx";
    import { Input } from "@/components/ui/input.jsx";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
    import { Textarea } from "@/components/ui/textarea.jsx";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
    import { ShieldAlert, ShieldCheck, FlaskConical, Users, Search, Send, BellDot } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { toast } from "@/components/ui/use-toast.jsx";

    const mockPatients = [
      { id: 1, name: 'Ana Pérez', exposureLevel: 'Alto', alert: true, lastScan: 'Crema Hidratante "Piel Suave"', mostUsed: ['Plástico tipo 7', 'Fragancias Sintéticas'] },
      { id: 2, name: 'Carlos López', exposureLevel: 'Bajo', alert: false, lastScan: 'Botella de Acero Inoxidable', mostUsed: ['Vidrio', 'Algodón orgánico'] },
      { id: 3, name: 'Laura Gómez', exposureLevel: 'Medio', alert: false, lastScan: 'Sartén Antiadherente', mostUsed: ['Teflón (PFOA)', 'Parabenos en champú'] },
    ];

    function PatientContext() {
        const [patients, setPatients] = useState(mockPatients);
        const [selectedPatient, setSelectedPatient] = useState(mockPatients[0]);
        const [searchTerm, setSearchTerm] = useState('');
        const [message, setMessage] = useState('');

        const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const handleSendMessage = () => {
            if (!message || !selectedPatient) {
                toast({ title: "Error", description: "Selecciona un paciente y escribe un mensaje.", variant: "destructive"});
                return;
            }
            toast({ title: "Mensaje Enviado", description: `Consejo personalizado enviado a ${selectedPatient.name}.`});
            setMessage('');
        };

        const getExposurePill = (level) => {
            switch(level) {
                case 'Alto': return <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold text-red-800 bg-red-100 rounded-full"><ShieldAlert className="h-3 w-3"/> Alto</span>;
                case 'Medio': return <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full"><ShieldAlert className="h-3 w-3"/> Medio</span>;
                default: return <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-100 rounded-full"><ShieldCheck className="h-3 w-3"/> Bajo</span>;
            }
        };

        return (
            <div className="min-h-screen bg-slate-50 p-4 md:p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-3 mb-2">
                        <FlaskConical className="h-8 w-8 text-indigo-600"/>
                        <h1 className="text-3xl font-bold text-gray-800">Contexto Ambiental del Paciente</h1>
                    </div>
                    <p className="text-gray-600 mb-8">Analiza la exposición a disruptores endocrinos y envía consejos personalizados.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Columna de Pacientes */}
                    <Card className="lg:col-span-1 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Users/> Lista de Pacientes</CardTitle>
                             <div className="relative pt-2">
                                <Input placeholder="Buscar paciente..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 mt-1 h-4 w-4 text-gray-400"/>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Paciente</TableHead>
                                        <TableHead>Exposición</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPatients.map(p => (
                                        <TableRow 
                                            key={p.id} 
                                            onClick={() => setSelectedPatient(p)}
                                            className={`cursor-pointer ${selectedPatient?.id === p.id ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                                        >
                                            <TableCell className="font-medium flex items-center gap-2">
                                                {p.alert && <BellDot className="h-4 w-4 text-red-500 animate-pulse"/>}
                                                {p.name}
                                            </TableCell>
                                            <TableCell>{getExposurePill(p.exposureLevel)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Columna de Detalles y Acciones */}
                    <motion.div 
                        key={selectedPatient?.id || 'empty'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {selectedPatient ? (
                            <>
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-2xl text-indigo-700">Resumen de Exposición: {selectedPatient.name}</CardTitle>
                                        <CardDescription>Último producto escaneado: <strong>{selectedPatient.lastScan}</strong></CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <h4 className="font-semibold mb-2">Sustancias más frecuentes en su entorno:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPatient.mostUsed.map((item, i) => (
                                                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">{item}</span>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                         <Button variant="outline">Ver Historial Completo de Escaneos</Button>
                                    </CardFooter>
                                </Card>

                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle>Enviar Consejo Personalizado</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea 
                                            placeholder={`Ej: Hola ${selectedPatient.name}, he notado que usas productos con... Te sugiero probar...`} 
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </CardContent>
                                    <CardFooter>
                                        <Button onClick={handleSendMessage} className="bg-indigo-600 hover:bg-indigo-700">
                                            <Send className="mr-2 h-4 w-4"/> Enviar al Paciente
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </>
                        ) : (
                            <Card className="shadow-lg flex items-center justify-center h-full">
                                <CardContent className="text-center text-gray-500 p-10">
                                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4"/>
                                    <p>Selecciona un paciente de la lista para ver su contexto ambiental y enviarle consejos.</p>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                </div>
            </div>
        );
    }
    
    export default PatientContext;