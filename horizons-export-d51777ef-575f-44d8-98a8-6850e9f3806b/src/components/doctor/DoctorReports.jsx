import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Calendar } from "@/components/ui/calendar.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.jsx";
import { FileText, Download, Filter, CalendarPlus as CalendarDaysIcon, Users, BarChart2, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast.jsx";

const mockPatients = [
  { id: '1', name: 'Ana Pérez' }, { id: '2', name: 'Carlos López' }, { id: '3', name: 'Laura Gómez' },
];

const reportTypes = [
  { value: 'adherence', label: 'Adherencia al Tratamiento' },
  { value: 'progress', label: 'Progreso General del Paciente' },
  { value: 'nutrition', label: 'Análisis Nutricional Detallado' },
  { value: 'activity', label: 'Resumen de Actividad Física' },
  { value: 'alerts', label: 'Historial de Alertas Críticas' },
];

const generatedReports = [
    { id: 'r1', patientName: 'Ana Pérez', type: 'Adherencia al Tratamiento', date: '2025-06-15', status: 'Listo', summary: 'Adherencia del 85% al plan nutricional. Leve descenso en actividad física registrada.'},
    { id: 'r2', patientName: 'Carlos López', type: 'Progreso General del Paciente', date: '2025-06-10', status: 'Listo', summary: 'Pérdida de peso de 2kg en el último mes. Presión arterial estable.'},
    { id: 'r3', patientName: 'Todos los Pacientes', type: 'Resumen de Actividad Física', date: '2025-06-01', status: 'Archivado', summary: 'Promedio de 8,200 pasos diarios. 60% de los pacientes cumplen objetivos de ejercicio.'},
];


function DoctorReports() {
  const [selectedPatient, setSelectedPatient] = React.useState('');
  const [reportType, setReportType] = React.useState('');
  const [dateRange, setDateRange] = React.useState({ from: undefined, to: undefined });
  const [currentReports, setCurrentReports] = React.useState(generatedReports);

  const handleGenerateReport = () => {
    if (!reportType) {
      toast({ title: "Error", description: "Por favor, selecciona un tipo de reporte.", variant: "destructive" });
      return;
    }
    const newReport = {
        id: `r${Date.now()}`,
        patientName: selectedPatient ? mockPatients.find(p=>p.id === selectedPatient)?.name : 'Todos los Pacientes',
        type: reportTypes.find(rt => rt.value === reportType)?.label || 'Reporte Personalizado',
        date: format(new Date(), "yyyy-MM-dd"),
        status: 'Generando...',
        summary: 'Procesando datos para el nuevo reporte...'
    };
    setCurrentReports(prev => [newReport, ...prev]);
    toast({ title: "Generando Reporte", description: `El reporte de ${newReport.type} para ${newReport.patientName} se está generando.` });
    
    setTimeout(() => {
        setCurrentReports(prev => prev.map(r => r.id === newReport.id ? {...r, status: 'Listo', summary: 'Reporte generado exitosamente con datos actualizados.'} : r));
        toast({ title: "Reporte Listo", description: `El reporte de ${newReport.type} ya está disponible.`, variant: "success" });
    }, 3000);
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
        className="max-w-5xl mx-auto"
      >
        <Card className="shadow-xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-slate-600 via-gray-700 to-neutral-800 p-6 text-white">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <FileText className="h-8 w-8" /> Generador de Reportes Médicos
            </CardTitle>
            <CardDescription className="text-slate-300 mt-1">
              Crea reportes detallados sobre el progreso y adherencia de tus pacientes.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
              <div>
                <Label htmlFor="patientSelect" className="text-sm font-medium text-gray-700">Paciente (Opcional)</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger id="patientSelect"><SelectValue placeholder="Todos los pacientes" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos los pacientes</SelectItem>
                    {mockPatients.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reportTypeSelect" className="text-sm font-medium text-gray-700">Tipo de Reporte</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="reportTypeSelect"><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                  <SelectContent>
                    {reportTypes.map(rt => <SelectItem key={rt.value} value={rt.value}>{rt.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dateRange" className="text-sm font-medium text-gray-700">Rango de Fechas</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button id="dateRange" variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          `${format(dateRange.from, "LLL dd, y", { locale: es })} - ${format(dateRange.to, "LLL dd, y", { locale: es })}`
                        ) : (
                          format(dateRange.from, "LLL dd, y", { locale: es })
                        )
                      ) : (
                        <span>Seleccionar rango</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button onClick={handleGenerateReport} className="w-full md:w-auto bg-slate-700 hover:bg-slate-800 text-white">
              <Download className="mr-2 h-5 w-5" /> Generar Reporte
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <BarChart2 className="h-7 w-7 text-sky-600" /> Reportes Generados
            </CardTitle>
            <CardDescription>Visualiza y gestiona los reportes creados recientemente.</CardDescription>
          </CardHeader>
          <CardContent>
            {currentReports.length > 0 ? (
              <ul className="space-y-4">
                {currentReports.map(report => (
                  <motion.li 
                    key={report.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-sky-700">{report.type}</h3>
                        <p className="text-sm text-gray-600">
                          <Users className="inline h-4 w-4 mr-1 text-gray-500" /> {report.patientName}
                          <span className="mx-2 text-gray-300">|</span>
                          <CalendarDaysIcon className="inline h-4 w-4 mr-1 text-gray-500" /> {format(new Date(report.date), "dd MMM yyyy", { locale: es })}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 italic">{report.summary}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3 md:mt-0">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          report.status === 'Listo' ? 'bg-green-100 text-green-700' :
                          report.status === 'Generando...' ? 'bg-yellow-100 text-yellow-700 animate-pulse' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {report.status === 'Listo' && <CheckCircle2 className="inline h-3 w-3 mr-1"/>}
                          {report.status === 'Generando...' && <RefreshCw className="inline h-3 w-3 mr-1 animate-spin"/>}
                          {report.status}
                        </span>
                        <Button variant="ghost" size="sm" onClick={unimplementedFeatureToast} disabled={report.status !== 'Listo'}>
                          <Download className="h-4 w-4 mr-1" /> Ver/Descargar
                        </Button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="font-semibold">No hay reportes generados aún.</p>
                <p className="text-sm">Utiliza el formulario de arriba para crear tu primer reporte.</p>
              </div>
            )}
          </CardContent>
          {currentReports.length > 0 && (
            <CardFooter className="border-t p-4">
                <Button variant="outline" className="mx-auto" onClick={unimplementedFeatureToast}>Cargar más reportes</Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default DoctorReports;