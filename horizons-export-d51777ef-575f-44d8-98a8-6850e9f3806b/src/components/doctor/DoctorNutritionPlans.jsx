import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Calendar } from "@/components/ui/calendar.jsx"; // Asumiendo que tienes este componente shadcn
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.jsx"; // Asumiendo que tienes este componente shadcn
import { PlusCircle, Edit3, Trash2, Search, Filter, CalendarPlus as CalendarIcon, Users, FileText, Copy, Share2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Para formato de fecha en español
import { toast } from "@/components/ui/use-toast";

// Mock data - reemplazar con datos reales o de API
const mockPatients = [
  { id: '1', name: 'Ana Pérez' },
  { id: '2', name: 'Carlos López' },
  { id: '3', name: 'Laura Gómez' },
];

const mockTemplates = [
  { id: 't1', name: 'Plan Pérdida de Peso (Bajo en Carbs)' },
  { id: 't2', name: 'Plan Aumento Muscular (Alto en Proteínas)' },
  { id: 't3', name: 'Plan Mantenimiento Saludable (Equilibrado)' },
];

const initialPlans = [
  { id: 'p1', patientId: '1', patientName: 'Ana Pérez', planName: 'Dieta Hipocalórica Semanal', startDate: new Date(2025, 5, 10), status: 'Activo', calories: 1500 },
  { id: 'p2', patientId: '2', patientName: 'Carlos López', planName: 'Plan Volumen Muscular Mensual', startDate: new Date(2025, 5, 1), status: 'Activo', calories: 2500 },
  { id: 'p3', patientId: '3', patientName: 'Laura Gómez', planName: 'Mantenimiento Post-Verano', startDate: new Date(2025, 4, 20), status: 'Completado', calories: 1800 },
];


function NutritionPlanForm({ plan, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(
    plan || { patientId: '', planName: '', description: '', startDate: new Date(), calories: 2000, proteins: 100, carbs: 200, fats: 70 }
  );
  const [selectedDate, setSelectedDate] = useState(formData.startDate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, startDate: date }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: plan?.id || `p${Date.now()}`, patientName: mockPatients.find(p=>p.id === formData.patientId)?.name || 'Paciente Desconocido' });
  };

  return (
    <motion.div initial={{ opacity: 0, y:20 }} animate={{ opacity: 1, y:0 }} exit={{ opacity: 0, y:20 }}>
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        <CardTitle className="text-2xl mb-6">{plan ? 'Editar Plan Nutricional' : 'Crear Nuevo Plan Nutricional'}</CardTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">Paciente</label>
            <Select name="patientId" onValueChange={(value) => handleSelectChange('patientId', value)} defaultValue={formData.patientId}>
              <SelectTrigger><SelectValue placeholder="Seleccionar paciente" /></SelectTrigger>
              <SelectContent>
                {mockPatients.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="planName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Plan</label>
            <Input id="planName" name="planName" value={formData.planName} onChange={handleChange} placeholder="Ej: Plan Quema Grasa Intensivo" required />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Detalles del plan, objetivos, etc." rows={3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label htmlFor="templateId" className="block text-sm font-medium text-gray-700 mb-1">Usar Plantilla (Opcional)</label>
            <Select name="templateId" onValueChange={(value) => {
              const template = mockTemplates.find(t => t.id === value);
              if (template) setFormData(prev => ({...prev, planName: template.name, description: `Basado en: ${template.name}`}));
            }}>
              <SelectTrigger><SelectValue placeholder="Seleccionar plantilla" /></SelectTrigger>
              <SelectContent>
                {mockTemplates.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <CardDescription>Macronutrientes Diarios Estimados</CardDescription>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
                <label htmlFor="calories" className="block text-xs font-medium text-gray-700 mb-1">Calorías (kcal)</label>
                <Input type="number" id="calories" name="calories" value={formData.calories} onChange={handleChange} placeholder="2000" />
            </div>
            <div>
                <label htmlFor="proteins" className="block text-xs font-medium text-gray-700 mb-1">Proteínas (g)</label>
                <Input type="number" id="proteins" name="proteins" value={formData.proteins} onChange={handleChange} placeholder="100" />
            </div>
            <div>
                <label htmlFor="carbs" className="block text-xs font-medium text-gray-700 mb-1">Carbohidratos (g)</label>
                <Input type="number" id="carbs" name="carbs" value={formData.carbs} onChange={handleChange} placeholder="200" />
            </div>
            <div>
                <label htmlFor="fats" className="block text-xs font-medium text-gray-700 mb-1">Grasas (g)</label>
                <Input type="number" id="fats" name="fats" value={formData.fats} onChange={handleChange} placeholder="70" />
            </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">{plan ? 'Guardar Cambios' : 'Crear Plan'}</Button>
        </div>
      </form>
    </motion.div>
  );
}


function DoctorNutritionPlans() {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [editingPlan, setEditingPlan] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredPlans = plans
    .filter(plan => filterStatus === 'Todos' || plan.status === filterStatus)
    .filter(plan => 
      plan.planName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleCreatePlan = () => {
    setEditingPlan(null);
    setIsFormOpen(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este plan?")) {
      setPlans(prev => prev.filter(p => p.id !== planId));
      toast({ title: "Plan Eliminado", description: "El plan nutricional ha sido eliminado." });
    }
  };

  const handleFormSubmit = (planData) => {
    if (editingPlan) {
      setPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...p, ...planData } : p));
      toast({ title: "Plan Actualizado", description: `El plan para ${planData.patientName} ha sido actualizado.` });
    } else {
      setPlans(prev => [planData, ...prev]);
      toast({ title: "Plan Creado", description: `Nuevo plan para ${planData.patientName} creado exitosamente.` });
    }
    setIsFormOpen(false);
    setEditingPlan(null);
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
            <FileText className="h-8 w-8 text-green-600"/>Gestión de Planes Nutricionales
          </h1>
          <p className="text-md text-gray-600">Crea, asigna y monitoriza planes de nutrición para tus pacientes.</p>
        </div>
        <Button onClick={handleCreatePlan} className="bg-green-600 hover:bg-green-700 text-white">
          <PlusCircle className="mr-2 h-5 w-5" /> Crear Nuevo Plan
        </Button>
      </motion.div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <Card className="shadow-xl p-6 bg-white">
              <NutritionPlanForm 
                plan={editingPlan} 
                onSubmit={handleFormSubmit} 
                onCancel={() => { setIsFormOpen(false); setEditingPlan(null); }} 
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="shadow-lg">
        <CardHeader className="border-b p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-1/3">
              <Input 
                type="text" 
                placeholder="Buscar por nombre de plan o paciente..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <Select onValueChange={setFilterStatus} defaultValue="Todos">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {filteredPlans.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del Plan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Inicio</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calorías (kcal)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPlans.map(plan => (
                    <motion.tr 
                      key={plan.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{plan.patientName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{plan.planName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{format(new Date(plan.startDate), "dd MMM yyyy", { locale: es })}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{plan.calories}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          plan.status === 'Activo' ? 'bg-green-100 text-green-800' : 
                          plan.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {plan.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan)} className="text-blue-600 hover:text-blue-800"><Edit3 className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => unimplementedFeatureToast()} className="text-green-600 hover:text-green-800"><Copy className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => unimplementedFeatureToast()} className="text-purple-600 hover:text-purple-800"><Share2 className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan.id)} className="text-red-600 hover:text-red-800"><Trash2 className="h-4 w-4" /></Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="font-semibold">No se encontraron planes nutricionales.</p>
                <p className="text-sm">Intenta ajustar tu búsqueda o crea un nuevo plan.</p>
              </div>
            )}
          </div>
        </CardContent>
        {filteredPlans.length > 0 && (
          <CardFooter className="border-t p-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">Mostrando {filteredPlans.length} de {plans.length} planes.</p>
            <Button variant="outline" onClick={unimplementedFeatureToast}><Download className="mr-2 h-4 w-4"/> Exportar Lista</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

export default DoctorNutritionPlans;