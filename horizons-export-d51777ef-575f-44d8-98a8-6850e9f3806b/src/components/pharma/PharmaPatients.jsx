import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Search, Filter, Download, Users, FileText, BarChart3, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Sector } from 'recharts';

const mockPatientData = [
  { patientCode: 'PAC-2025-001', ageGroup: '30-45', gender: 'Femenino', primaryCondition: 'Diabetes Tipo 2', prescriptionsFilled: 5, lastFillDate: '2025-06-16' },
  { patientCode: 'PAC-2025-002', ageGroup: '46-60', gender: 'Masculino', primaryCondition: 'Hipertensión', prescriptionsFilled: 3, lastFillDate: '2025-06-15' },
  { patientCode: 'PAC-2025-003', ageGroup: '18-29', gender: 'Femenino', primaryCondition: 'Alergias', prescriptionsFilled: 8, lastFillDate: '2025-06-14' },
  { patientCode: 'PAC-2025-004', ageGroup: '60+', gender: 'Masculino', primaryCondition: 'Asma', prescriptionsFilled: 2, lastFillDate: '2025-06-17' },
  { patientCode: 'PAC-2025-005', ageGroup: '30-45', gender: 'Masculino', primaryCondition: 'Diabetes Tipo 1', prescriptionsFilled: 6, lastFillDate: '2025-06-10' },
];

const ageGroupData = [
  { name: '18-29', value: 1, color: '#0088FE' }, { name: '30-45', value: 2, color: '#00C49F' },
  { name: '46-60', value: 1, color: '#FFBB28' }, { name: '60+', value: 1, color: '#FF8042' },
];
const genderData = [
  { name: 'Femenino', value: 2, color: '#8884d8' }, { name: 'Masculino', value: 3, color: '#82ca9d' },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 6) * cos;
  const sy = cy + (outerRadius + 6) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 12;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-semibold">
        {payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 4} outerRadius={outerRadius + 6} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 8} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">{`${(percent * 100).toFixed(0)}%`}</text>
    </g>
  );
};


function PharmaPatients() {
  const [patients, setPatients] = useState(mockPatientData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('Todas');
  const [activeAgeIndex, setActiveAgeIndex] = useState(0);
  const [activeGenderIndex, setActiveGenderIndex] = useState(0);

  const uniqueConditions = ['Todas', ...new Set(mockPatientData.map(p => p.primaryCondition))];

  const filteredPatients = patients
    .filter(p => filterCondition === 'Todas' || p.primaryCondition === filterCondition)
    .filter(p =>
      p.patientCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.primaryCondition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-purple-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <Card className="shadow-xl mb-8">
          <CardHeader className="border-b p-6 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <CardTitle className="text-3xl font-bold text-purple-700 flex items-center gap-2">
                  <Users className="h-8 w-8" /> Análisis de Pacientes (Anonimizado)
                </CardTitle>
                <CardDescription>Datos agregados y anonimizados para análisis poblacionales y tendencias.</CardDescription>
              </div>
              <Button variant="outline" onClick={unimplementedFeatureToast}><Download className="mr-2 h-4 w-4"/>Exportar Datos Agregados</Button>
            </div>
             <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-2/5">
                <Input 
                  type="text" 
                  placeholder="Buscar por código de paciente o condición..." 
                  className="pl-10 text-sm" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Filter className="h-5 w-5 text-gray-500" />
                <Select onValueChange={setFilterCondition} defaultValue="Todas" >
                  <SelectTrigger className="w-full md:w-[240px] text-sm">
                    <SelectValue placeholder="Filtrar por condición principal" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueConditions.map(cond => <SelectItem key={cond} value={cond}>{cond}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-xl text-purple-600">Distribución por Edad</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie activeIndex={activeAgeIndex} activeShape={renderActiveShape} data={ageGroupData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} onMouseEnter={(_, index) => setActiveAgeIndex(index)}>
                      {ageGroupData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-xl text-purple-600">Distribución por Género</CardTitle></CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie activeIndex={activeGenderIndex} activeShape={renderActiveShape} data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} onMouseEnter={(_, index) => setActiveGenderIndex(index)}>
                      {genderData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="h-7 w-7 text-purple-600" /> Listado Anonimizado de Pacientes
            </CardTitle>
            <CardDescription>Información demográfica y de tratamiento agregada. No se muestran datos personales.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {filteredPatients.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-100">
                      <TableHead className="px-4 py-3 text-xs">Cód. Paciente</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Grupo Edad</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Género</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Condición Principal</TableHead>
                      <TableHead className="px-4 py-3 text-xs text-center">Prescripciones</TableHead>
                      <TableHead className="px-4 py-3 text-xs">Última Dispensación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredPatients.map(p => (
                        <motion.tr 
                          key={p.patientCode}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b hover:bg-purple-50 transition-colors text-sm"
                        >
                          <TableCell className="font-medium px-4 py-3 text-purple-700">{p.patientCode}</TableCell>
                          <TableCell className="px-4 py-3">{p.ageGroup}</TableCell>
                          <TableCell className="px-4 py-3">{p.gender}</TableCell>
                          <TableCell className="px-4 py-3">{p.primaryCondition}</TableCell>
                          <TableCell className="px-4 py-3 text-center">{p.prescriptionsFilled}</TableCell>
                          <TableCell className="px-4 py-3">{p.lastFillDate}</TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center p-10 text-gray-500">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <p className="font-semibold">No se encontraron datos de pacientes con los filtros actuales.</p>
                  <p className="text-sm">Intenta ajustar tu búsqueda o filtros.</p>
                </div>
              )}
            </div>
          </CardContent>
          {filteredPatients.length > 0 && (
            <CardFooter className="border-t p-4 flex justify-between items-center bg-slate-50">
              <p className="text-xs text-gray-600">Mostrando {filteredPatients.length} de {patients.length} registros anonimizados.</p>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

export default PharmaPatients;