import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { LineChart, BarChart, PieChart, TrendingUp, Activity, Droplets, BedDouble, Weight, Ruler, Download, Share2, CalendarDays } from 'lucide-react';
import { ResponsiveContainer, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Sector } from 'recharts';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";

const weightData = [
  { date: '01 Jun', weight: 72.5 }, { date: '08 Jun', weight: 72.0 },
  { date: '15 Jun', weight: 71.8 }, { date: '22 Jun', weight: 71.2 },
  { date: '29 Jun', weight: 70.5 }, { date: '06 Jul', weight: 70.1 },
];

const activityData = [
  { day: 'Lun', steps: 8500, target: 10000 }, { day: 'Mar', steps: 9200, target: 10000 },
  { day: 'Mié', steps: 7800, target: 10000 }, { day: 'Jue', steps: 10500, target: 10000 },
  { day: 'Vie', steps: 8900, target: 10000 }, { day: 'Sáb', steps: 12300, target: 10000 },
  { day: 'Dom', steps: 7100, target: 10000 },
];

const macroDistributionData = [
  { name: 'Proteínas', value: 30, color: '#10B981' }, // green
  { name: 'Carbohidratos', value: 45, color: '#3B82F6' }, // blue
  { name: 'Grasas', value: 25, color: '#F59E0B' }, // amber
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="label text-sm font-semibold text-gray-700">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.stroke }} className="text-xs">
            {`${entry.name}: ${entry.value}${entry.unit || ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-semibold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">{`${value}%`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
        {`(Value: ${value})`}
      </text>
    </g>
  );
};


function ProgressTracking() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = (_, index) => setActiveIndex(index);

  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <Card className="shadow-xl overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-700 p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <TrendingUp className="h-8 w-8" /> Seguimiento de Progreso
              </CardTitle>
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={unimplementedFeatureToast}>
                  <Share2 className="mr-2 h-4 w-4" /> Compartir Progreso
                </Button>
                <Button variant="outline" className="text-white border-white/50 hover:bg-white/10" onClick={unimplementedFeatureToast}>
                  <Download className="mr-2 h-4 w-4" /> Exportar Datos
                </Button>
              </div>
            </div>
            <CardDescription className="text-indigo-100 mt-2">
              Visualiza tu evolución y mantente motivado hacia tus objetivos de bienestar.
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-100 p-1">
              <TabsTrigger value="overview" className="py-2.5">Resumen</TabsTrigger>
              <TabsTrigger value="weight" className="py-2.5">Peso y Medidas</TabsTrigger>
              <TabsTrigger value="activity" className="py-2.5">Actividad Física</TabsTrigger>
              <TabsTrigger value="nutrition" className="py-2.5">Nutrición</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Peso Actual" value="70.1 kg" trend="-0.4 kg esta semana" icon={<Weight className="text-green-500"/>} color="green" />
                <StatCard title="Pasos Promedio" value="8,950" trend="+300 vs semana pasada" icon={<Activity className="text-blue-500"/>} color="blue" />
                <StatCard title="Calorías Promedio" value="2,150 kcal" trend="Dentro del objetivo" icon={<Ruler className="text-orange-500"/>} color="orange" /> {/* Usando Ruler como placeholder para calorías */}
                <StatCard title="Horas de Sueño" value="7.5 hrs" trend="Estable" icon={<BedDouble className="text-purple-500"/>} color="purple" />
                <StatCard title="Hidratación" value="1.8 L" trend="Objetivo: 2L" icon={<Droplets className="text-sky-500"/>} color="sky" />
                <StatCard title="Próxima Meta" value="Correr 5km" trend="En 2 semanas" icon={<TrendingUp className="text-pink-500"/>} color="pink" />
              </motion.div>
            </TabsContent>

            <TabsContent value="weight" className="p-6">
              <ChartCard title="Evolución del Peso" icon={<Weight className="text-green-500"/>}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#666' }} />
                    <YAxis unit=" kg" domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#10B981" strokeWidth={2} activeDot={{ r: 6 }} name="Peso" unit=" kg"/>
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              {/* Añadir más tarjetas para otras medidas si es necesario */}
            </TabsContent>

            <TabsContent value="activity" className="p-6">
              <ChartCard title="Pasos Semanales" icon={<Activity className="text-blue-500"/>}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#666' }} />
                    <YAxis unit=" pasos" tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="steps" fill="#3B82F6" name="Pasos Realizados" unit=" pasos" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="#BFDBFE" name="Objetivo de Pasos" unit=" pasos" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              {/* Añadir más tarjetas para otros tipos de actividad */}
            </TabsContent>
            
            <TabsContent value="nutrition" className="p-6">
              <ChartCard title="Distribución de Macronutrientes (Promedio Semanal)" icon={<PieChart className="text-orange-500"/>}>
                <ResponsiveContainer width="100%" height={350}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={macroDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {macroDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </ResponsiveContainer>
                 <div className="flex justify-center space-x-4 mt-4">
                    {macroDistributionData.map((entry, index) => (
                        <div key={index} className="flex items-center text-xs">
                            <span className="w-3 h-3 rounded-full mr-1.5" style={{ backgroundColor: entry.color }}></span>
                            {entry.name}: {entry.value}%
                        </div>
                    ))}
                </div>
              </ChartCard>
            </TabsContent>
          </Tabs>
           <CardFooter className="bg-gray-50 p-6 border-t">
            <Button className="w-full md:w-auto mx-auto bg-indigo-600 hover:bg-indigo-700" onClick={unimplementedFeatureToast}>
              <CalendarDays className="mr-2 h-5 w-5" /> Ver Historial Completo y Establecer Nuevas Metas
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

const StatCard = ({ title, value, trend, icon, color }) => (
  <Card className={`bg-gradient-to-br from-${color}-50 to-white shadow-lg hover:shadow-xl transition-shadow`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <p className={`text-xs ${trend.startsWith('+') || trend.includes('Dentro') ? 'text-green-600' : 'text-red-600'} mt-1`}>
        {trend}
      </p>
    </CardContent>
  </Card>
);

const ChartCard = ({ title, icon, children }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-gray-700 flex items-center gap-2">
        {icon} {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);


export default ProgressTracking;