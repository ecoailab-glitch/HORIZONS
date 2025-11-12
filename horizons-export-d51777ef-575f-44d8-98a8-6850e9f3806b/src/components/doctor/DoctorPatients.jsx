import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog.jsx";
import { Search, UserPlus, Edit, Trash2, MessageSquare, FileText, TrendingUp, Filter, Download, Eye, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";

const mockPatientsData = [
  { id: '1', name: 'Ana Pérez', age: 34, condition: 'Diabetes Tipo 2', lastCheckup: '2025-05-15', progress: 75, avatarUrl: '/placeholder-avatar.png', email: 'ana.perez@example.com', phone: '555-1234' },
  { id: '2', name: 'Carlos López', age: 45, condition: 'Hipertensión', lastCheckup: '2025-05-20', progress: 60, avatarUrl: '/placeholder-avatar.png', email: 'carlos.lopez@example.com', phone: '555-5678' },
  { id: '3', name: 'Laura Gómez', age: 28, condition: 'Control de Peso', lastCheckup: '2025-06-01', progress: 90, avatarUrl: '/placeholder-avatar.png', email: 'laura.gomez@example.com', phone: '555-9012' },
  { id: '4', name: 'Roberto Diaz', age: 52, condition: 'Colesterol Alto', lastCheckup: '2025-04-30', progress: 40, avatarUrl: '/placeholder-avatar.png', email: 'roberto.diaz@example.com', phone: '555-3456' },
];

const PatientForm = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    patient || { name: '', age: '', condition: '', email: '', phone: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: patient?.id || `pat${Date.now()}` });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>{patient ? 'Editar Paciente' : 'Añadir Nuevo Paciente'}</DialogTitle>
        <DialogDescription>
          {patient ? 'Actualiza la información del paciente.' : 'Introduce los detalles del nuevo paciente.'}
        </DialogDescription>
      </DialogHeader>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Edad</label>
          <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condición Principal</label>
          <Input id="condition" name="condition" value={formData.condition} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      
      <DialogFooter className="pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">{patient ? 'Guardar Cambios' : 'Añadir Paciente'}</Button>
      </DialogFooter>
    </form>
  );
};


function DoctorPatients() {
  const [patients, setPatients] = useState(mockPatientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [viewingPatient, setViewingPatient] = useState(null);


  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    setEditingPatient(null);
    setIsFormOpen(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setIsFormOpen(true);
  };
  
  const handleViewPatient = (patient) => {
    setViewingPatient(patient);
  };

  const handleDeletePatient = (patientId) => {
     if (window.confirm("¿Estás seguro de que quieres eliminar este paciente? Esta acción no se puede deshacer.")) {
      setPatients(prev => prev.filter(p => p.id !== patientId));
      toast({ title: "Paciente Eliminado", description: "El paciente ha sido eliminado de la lista." });
    }
  };

  const handleFormSubmit = (patientData) => {
    if (editingPatient) {
      setPatients(prev => prev.map(p => p.id === editingPatient.id ? { ...p, ...patientData, avatarUrl: p.avatarUrl } : p));
      toast({ title: "Paciente Actualizado", description: `La información de ${patientData.name} ha sido actualizada.` });
    } else {
      setPatients(prev => [{ ...patientData, progress: 0, lastCheckup: new Date().toISOString().split('T')[0], avatarUrl: '/placeholder-avatar.png' }, ...prev]);
      toast({ title: "Paciente Añadido", description: `${patientData.name} ha sido añadido a la lista.` });
    }
    setIsFormOpen(false);
    setEditingPatient(null);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600"/>Gestión de Pacientes
          </h1>
          <p className="text-md text-gray-600">Visualiza, gestiona y sigue el progreso de tus pacientes.</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddPatient} className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="mr-2 h-5 w-5" /> Añadir Paciente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <PatientForm patient={editingPatient} onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </motion.div>

      <Card className="shadow-lg">
        <CardHeader className="border-b p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-2/5">
              <Input 
                type="text" 
                placeholder="Buscar paciente por nombre o condición..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={unimplementedFeatureToast}><Filter className="mr-2 h-4 w-4"/>Filtrar</Button>
              <Button variant="outline" onClick={unimplementedFeatureToast}><Download className="mr-2 h-4 w-4"/>Exportar</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-100">
                  <TableHead className="w-[250px] px-4 py-3">Paciente</TableHead>
                  <TableHead className="px-4 py-3">Condición</TableHead>
                  <TableHead className="px-4 py-3">Última Visita</TableHead>
                  <TableHead className="px-4 py-3">Progreso</TableHead>
                  <TableHead className="text-right px-4 py-3">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredPatients.length > 0 ? filteredPatients.map(patient => (
                    <motion.tr 
                      key={patient.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b hover:bg-slate-50 transition-colors"
                    >
                      <TableCell className="font-medium px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={patient.avatarUrl || `https://avatar.vercel.sh/${patient.name}.png`} alt={patient.name} />
                            <AvatarFallback>{patient.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-800">{patient.name}</p>
                            <p className="text-xs text-gray-500">{patient.age} años</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-700">{patient.condition}</TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-700">{patient.lastCheckup}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Progress value={patient.progress} indicatorClassName={patient.progress > 70 ? 'bg-green-500' : patient.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'} className="w-24 h-2" />
                          <span className="text-xs text-gray-600">{patient.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-4 py-3 space-x-1">
                        <Dialog open={viewingPatient?.id === patient.id} onOpenChange={(isOpen) => !isOpen && setViewingPatient(null)}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleViewPatient(patient)} className="text-gray-500 hover:text-blue-600"><Eye className="h-4 w-4"/></Button>
                          </DialogTrigger>
                          {viewingPatient?.id === patient.id && (
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={viewingPatient.avatarUrl || `https://avatar.vercel.sh/${viewingPatient.name}.png`} />
                                    <AvatarFallback>{viewingPatient.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  {viewingPatient.name}
                                </DialogTitle>
                                <DialogDescription>{viewingPatient.age} años - {viewingPatient.condition}</DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-2">
                                <p><strong>Email:</strong> {viewingPatient.email}</p>
                                <p><strong>Teléfono:</strong> {viewingPatient.phone}</p>
                                <p><strong>Última visita:</strong> {viewingPatient.lastCheckup}</p>
                                <div className="flex items-center gap-2"><strong>Progreso:</strong> <Progress value={viewingPatient.progress} indicatorClassName={viewingPatient.progress > 70 ? 'bg-green-500' : viewingPatient.progress > 40 ? 'bg-yellow-500' : 'bg-red-500'} className="w-32 h-2.5" /> {viewingPatient.progress}%</div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild><Button type="button" variant="outline">Cerrar</Button></DialogClose>
                                <Button onClick={() => { handleEditPatient(viewingPatient); setViewingPatient(null); }} className="bg-blue-600 hover:bg-blue-700">Editar Paciente</Button>
                              </DialogFooter>
                            </DialogContent>
                          )}
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => handleEditPatient(patient)} className="text-gray-500 hover:text-green-600"><Edit className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" onClick={() => unimplementedFeatureToast()} className="text-gray-500 hover:text-purple-600"><FileText className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePatient(patient.id)} className="text-gray-500 hover:text-red-600"><Trash2 className="h-4 w-4"/></Button>
                      </TableCell>
                    </motion.tr>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                        No se encontraron pacientes. Intenta ajustar tu búsqueda o añade nuevos pacientes.
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {filteredPatients.length > 0 && (
          <CardFooter className="border-t p-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">Mostrando {filteredPatients.length} de {patients.length} pacientes.</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default DoctorPatients;