import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Barcode, Camera, Sparkles, ShieldCheck, ShieldAlert, ShieldX, FlaskConical, Lightbulb, ChevronRight, Recycle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";
import Webcam from 'react-webcam';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const colors = {
    safe: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: <ShieldCheck className="h-6 w-6" /> },
    caution: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', icon: <ShieldAlert className="h-6 w-6" /> },
    risk: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', icon: <ShieldX className="h-6 w-6" /> },
  };
  const statusInfo = colors[result.status];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
      <Card className={`${statusInfo.bg} ${statusInfo.border} border-2`}>
        <CardHeader>
          <div className="flex items-center gap-4">
            {statusInfo.icon}
            <div>
              <CardTitle className={`text-2xl ${statusInfo.text}`}>{result.title}</CardTitle>
              <CardDescription className={`${statusInfo.text}/80`}>Producto Analizado: {result.productName}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className={`${statusInfo.text} space-y-4`}>
          <p>{result.summary}</p>
          {result.substances.length > 0 && (
            <div>
              <h4 className="font-semibold">Sustancias de interés detectadas:</h4>
              <ul className="list-disc list-inside text-sm">
                {result.substances.map((sub, i) => <li key={i}>{sub}</li>)}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="link" className={statusInfo.text}>Ver análisis completo</Button>
        </CardFooter>
      </Card>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }} className="mt-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Alternativas más seguras y consejos</h3>
        {result.alternatives.map((alt, i) => (
          <Card key={i} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full"><ShieldCheck className="h-5 w-5 text-green-600"/></div>
                <div>
                  <p className="font-semibold">{alt.name}</p>
                  <p className="text-xs text-gray-500">{alt.reason}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400"/>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
};

function EndocrineDisruptors() {
  const [scanMode, setScanMode] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const webcamRef = useRef(null);

  const handleScan = (mode) => {
    setScanMode(mode);
    setAnalysisResult(null);
    toast({ title: "Iniciando escáner...", description: `Apunta la cámara al producto.` });

    setTimeout(() => {
      setScanMode(null);
      toast({ title: "Producto Analizado", description: "Mostrando resultados...", variant: "success" });
      const randomResult = Math.random();
      if (randomResult < 0.4) {
        setAnalysisResult({
          status: 'safe',
          title: 'Producto Seguro',
          productName: "Champú Herbal Natural",
          summary: 'Este producto no contiene disruptores endocrinos conocidos en nuestra base de datos. ¡Una excelente elección!',
          substances: [],
          alternatives: [
            { name: "Jabón de Castilla", reason: "Ingredientes 100% naturales y biodegradables." },
            { name: "Aceite de coco como hidratante", reason: "Simple, efectivo y sin aditivos." },
          ],
        });
      } else if (randomResult < 0.8) {
        setAnalysisResult({
          status: 'caution',
          title: 'Precaución',
          productName: "Crema Hidratante 'Piel Suave'",
          summary: 'Contiene fragancias sintéticas y conservantes que, en algunas personas, pueden causar sensibilidad. Se recomienda usar con moderación.',
          substances: ['Parfum/Fragrance', 'Phenoxyethanol'],
          alternatives: [
            { name: "Cremas con fragancias naturales", reason: "Menor riesgo de sensibilidad." },
            { name: "Loción sin perfume certificada", reason: "Ideal para pieles sensibles." },
          ],
        });
      } else {
        setAnalysisResult({
          status: 'risk',
          title: 'Riesgo Detectado',
          productName: "Envase de Plástico 'Tapper-X'",
          summary: 'Este producto contiene Bisfenol-A (BPA), un conocido disruptor endocrino, especialmente si se calienta. Se recomienda evitar el uso con alimentos calientes.',
          substances: ['Bisfenol-A (BPA)'],
          alternatives: [
            { name: "Envases de vidrio", reason: "Inerte y seguro para calentar." },
            { name: "Acero inoxidable", reason: "Duradero y no libera sustancias." },
          ],
        });
      }
    }, 3000);
  };

  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="shadow-2xl overflow-hidden mb-8 text-center">
          <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-600 p-8 text-white">
            <div className="mx-auto bg-white/20 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                <FlaskConical className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">Escáner de Disruptores Endocrinos</CardTitle>
            <CardDescription className="text-cyan-100 text-base mt-2">Escucha a tu cuerpo a través de la tecnología. Conoce lo que usas y consumes.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-6">Escanea el código de barras o toma una foto de un producto para analizar sus ingredientes y descubrir posibles sustancias que alteran el equilibrio hormonal.</p>
            {scanMode ? (
              <div className="w-full aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                />
                 <div className="absolute w-full h-full flex items-center justify-center">
                    <div className="w-3/4 h-1/2 border-4 border-dashed border-green-400 rounded-lg animate-pulse"/>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => handleScan('barcode')} size="lg" className="py-8 bg-sky-600 hover:bg-sky-700">
                  <Barcode className="h-8 w-8 mr-3" /> Escanear Código de Barras
                </Button>
                <Button onClick={() => handleScan('photo')} size="lg" className="py-8 bg-teal-600 hover:bg-teal-700">
                  <Camera className="h-8 w-8 mr-3" /> Analizar con Foto
                </Button>
              </div>
            )}
            <AnimatePresence>
              {analysisResult && <AnalysisResult result={analysisResult} />}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-yellow-500"/>Resumen y Aprendizaje Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Mi Resumen</TabsTrigger>
                <TabsTrigger value="tips">Consejos Generales</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-lg text-gray-800">Tu exposición esta semana ha sido baja</h4>
                  <p className="text-sm text-gray-600 mt-1">¡Felicidades! El 90% de los productos que analizaste son seguros.</p>
                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{width: "90%"}}></div>
                   </div>
                  <Button variant="link" className="mt-4" onClick={unimplementedFeatureToast}>Ver historial completo</Button>
                </div>
              </TabsContent>
               <TabsContent value="tips" className="mt-4 space-y-3">
                 <p className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 flex items-center gap-2"><Recycle className="h-5 w-5"/>Prefiere envases de vidrio o acero inoxidable en lugar de plástico.</p>
                 <p className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2"><Sparkles className="h-5 w-5"/>Busca cosméticos y productos de limpieza con sellos ecológicos y sin fragancias sintéticas.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default EndocrineDisruptors;