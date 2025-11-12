import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog.jsx";
import { Search, Filter, Download, CheckCircle2, AlertCircle, Clock, Eye, Edit, Printer, PlusCircle, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const mockPrescriptions = [
  { id: 'RX789012', patientCode: 'PAC-2025-001', doctor: 'Dr. Alan Grant', date: '2025-06-16', medication: 'Amoxicilina 500mg', quantity: 21, status: 'Dispensada', details: '1 cápsula cada 8 horas por 7 días.' },
  { id: 'RX789013', patientCode: 'PAC-2025-002', doctor: 'Dra. Ellie Sattler', date: '2025-06-15', medication: 'Paracetamol 1g', quantity: 10, status: 'Pendiente', details: '1 comprimido cada 6 horas si dolor.' },
  { id: 'RX789014', patientCode: 'PAC-2025-003', doctor: 'Dr. Ian Malcolm', date: '2025-06-14', medication: 'Loratadina 10mg', quantity: 30, status: 'Dispensada Parcial', details: '1 comprimido al día por 30 días. (Dispensados 15)' },
  { id: 'RX789015', patientCode: 'PAC-2025-004', doctor: 'Dr. John Hammond', date: '2025-06-17', medication: 'Salbutamol Inhalador', quantity: 1, status: 'Nueva', details: '2 inhalaciones cada 4-6 horas según necesidad.' },
];

const statusIcons = {
  Dispensada: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  Pendiente: <Clock className="h-5 w-5 text-yellow-500" />,
  'Dispensada Parcial': <AlertCircle className="h-5 w-5 text-orange-500" />,
  Nueva: <PlusCircle className="h-5 w-5 text-blue-500" />,
};

const PrescriptionDetailDialog = ({ prescription, isOpen, onClose }) => {
  if (!prescription) return null;
  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detalles de Prescripción: {prescription.id}</DialogTitle>
          <DialogDescription>
            Código Paciente: {prescription.patientCode} | Doctor: {prescription.doctor} | Fecha: {format(new Date(prescription.date), "dd MMM yyyy", { locale: es })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <p><strong>Medicamento:</strong> {prescription.medication}</p>
          <p><strong>Cantidad:</strong> {prescription.quantity}</p>
          <p><strong>Estado:</strong> <span className={`font-medium ${
            prescription.status === 'Dispensada' ? 'text-green-600' :
            prescription.status === 'Pendiente' ? 'text-yellow-600' :
            prescription.status === 'Dispensada Parcial' ? 'text-orange-600' : 'text-blue-600'
          }`}>{prescription.status}</span></p>
          <p><strong>Instrucciones:</strong> {prescription.details}</p>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={unimplementedFeatureToast}><Printer className="mr-2 h-4 w-4"/> Imprimir</Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={unimplementedFeatureToast}><Edit className="mr-2 h-4 w-4"/> Modificar Estado</Button>
          <DialogClose asChild><Button variant="ghost">Cerrar</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function PharmaPrescriptions() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todas');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredPrescriptions = prescriptions
    .filter(p => filterStatus === 'Todas' || p.status === filterStatus)
    .filter(p =>
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.medication.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleViewDetails = (prescription) => {
    setSelectedPrescription(prescription);
    setIsDetailModalOpen(true);
  };
  
  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <Card className="shadow-xl">
          <CardHeader className="border-b p-6 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <CardTitle className="text-3xl font-bold text-sky-700 flex items-center gap-2">
                  <ClipboardList className="h-8 w-8" /> Gestión de Prescripciones
                </CardTitle>
                <CardDescription>Busca, filtra y gestiona las prescripciones médicas.</CardDescription>
              </div>
              <Button onClick={unimplementedFeatureToast} className="bg-green-600 hover:bg-green-700 text-white">
                <PlusCircle className="mr-2 h-5 w-5" /> Nueva Prescripción Manual
              </Button>
            </div>
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-2/5">
                <Input 
                  type="text" 
                  placeholder="Buscar por ID, cód. paciente o medicamento..." 
                  className="pl-10 text-sm" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Filter className="h-5 w-5 text-gray-500" />
                <Select onValueChange={setFilterStatus} defaultValue="Todas" >
                  <SelectTrigger className="w-full md:w-[200px] text-sm">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>
                    <SelectItem value="Nueva">Nuevas</SelectItem>
                    <SelectItem value="Pendiente">Pendientes</SelectItem>
                    <SelectItem value="Dispensada">Dispensadas</SelectItem>
                    <SelectItem value="Dispensada Parcial">Dispensada Parcial</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={unimplementedFeatureToast} className="text-sm"><Download className="mr-2 h-4 w-4"/>Exportar</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {filteredPrescriptions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-100">
                      <TableHead className="px-4 py-3 text-xs">ID Prescripción</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Cód. Paciente</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Medicamento</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Fecha</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Estado</TableHead>
                      <TableHead className="text-right px-4 py-3 text-xs">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredPrescriptions.map(p => (
                        <motion.tr 
                          key={p.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b hover:bg-sky-50 transition-colors text-sm"
                        >
                          <TableCell className="font-medium px-4 py-3 text-sky-700">{p.id}</TableCell>
                          <TableCell className="px-4 py-3">{p.patientCode}</TableCell>
                          <TableCell className="px-4 py-3">{p.medication}</TableCell>
                          <TableCell className="px-4 py-3">{format(new Date(p.date), "dd/MM/yyyy")}</TableCell>
                          <TableCell className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {statusIcons[p.status]}
                              <span className={`font-medium ${
                                p.status === 'Dispensada' ? 'text-green-700' :
                                p.status === 'Pendiente' ? 'text-yellow-700' :
                                p.status === 'Dispensada Parcial' ? 'text-orange-700' : 'text-blue-700'
                              }`}>{p.status}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-4 py-3 space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewDetails(p)} className="text-gray-500 hover:text-blue-600"><Eye className="h-4 w-4"/></Button>
                            <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast} className="text-gray-500 hover:text-green-600"><Edit className="h-4 w-4"/></Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center p-10 text-gray-500">
                  <ClipboardList className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="font-semibold">No se encontraron prescripciones.</p>
                  <p className="text-sm">Intenta ajustar tu búsqueda o filtros.</p>
                </div>
              )}
            </div>
          </CardContent>
          {filteredPrescriptions.length > 0 && (
            <CardFooter className="border-t p-4 flex justify-between items-center bg-slate-50">
              <p className="text-xs text-gray-600">Mostrando {filteredPrescriptions.length} de {prescriptions.length} prescripciones.</p>
            </CardFooter>
          )}
        </Card>
      </motion.div>
      <PrescriptionDetailDialog prescription={selectedPrescription} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />
    </div>
  );
}

export default PharmaPrescriptions;