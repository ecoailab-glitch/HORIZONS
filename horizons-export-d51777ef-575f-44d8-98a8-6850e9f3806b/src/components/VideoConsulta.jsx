import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button.jsx";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Video, Mic, PhoneOff, UserCircle, Maximize, Minimize, MessageSquare, Share2, ScreenShare, Users, Activity, Heart, Droplets as DropletsIcon, BedDouble as BedDoubleIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";

const SensorDataDisplay = ({ label, value, unit, icon, progress, color }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
    <div className="flex items-center">
      {React.cloneElement(icon, { className: `h-5 w-5 mr-2 text-${color}-500` })}
      <span className="text-sm font-medium text-gray-700">{label}:</span>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-sm font-semibold text-gray-900">{value} {unit}</span>
      {progress !== undefined && (
        <Progress value={progress} indicatorClassName={`bg-${color}-500`} className={`h-1 w-16 mt-1 bg-${color}-100`} />
      )}
    </div>
  </div>
);

function VideoConsulta() {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [callStatus, setCallStatus] = useState('disconnected'); 
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const patientSensors = [
    { label: "Ritmo Cardíaco", value: 75, unit: "bpm", icon: <Heart />, progress: 75, color: "red" },
    { label: "Glucosa", value: 98, unit: "mg/dL", icon: <DropletsIcon />, progress: 60, color: "blue" },
    { label: "Pasos Hoy", value: 3200, unit: "pasos", icon: <Activity />, progress: 32, color: "green" },
    { label: "Calidad Sueño", value: 85, unit: "%", icon: <BedDoubleIcon />, progress: 85, color: "purple" },
  ];

  useEffect(() => {
    if (callStatus === 'connecting' || callStatus === 'connected') {
      startLocalVideo();
    } else {
      stopLocalVideo();
    }
  }, [callStatus]);

  const startLocalVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
      toast({ title: "Error de Cámara/Micrófono", description: "No se pudo acceder a la cámara o micrófono.", variant: "destructive" });
      setCallStatus('disconnected');
    }
  };

  const stopLocalVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
  };

  const handleToggleVideo = () => setIsVideoEnabled(!isVideoEnabled);
  const handleToggleAudio = () => setIsAudioEnabled(!isAudioEnabled);
  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };
  const handleToggleChat = () => setIsChatOpen(!isChatOpen);

  const handleStartCall = () => {
    setCallStatus('connecting');
    toast({ title: "Iniciando llamada...", description: "Conectando con el especialista." });
    setTimeout(() => {
      setCallStatus('connected');
      toast({ title: "Llamada conectada", description: "Estás en línea con el especialista.", variant: "success" });
    }, 2000);
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    stopLocalVideo();
    toast({ title: "Llamada finalizada", description: "La videoconsulta ha terminado." });
    setTimeout(() => setCallStatus('disconnected'), 1500); 
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
    <div className={`min-h-screen flex flex-col p-4 md:p-6 bg-gray-900 text-white transition-all duration-300 ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-4 gap-4">
        <motion.div 
          className="lg:col-span-3 bg-black rounded-xl shadow-2xl flex flex-col overflow-hidden relative"
          layout
        >
          {callStatus === 'connected' || callStatus === 'connecting' ? (
            <>
              <div className="flex-grow relative bg-gray-800">
                <video ref={remoteVideoRef} className="w-full h-full object-cover" autoPlay playsInline muted={!isAudioEnabled}></video>
                <div className="absolute inset-0 flex items-center justify-center">
                  {!remoteVideoRef.current?.srcObject && <UserCircle className="w-32 h-32 text-gray-600" />}
                </div>
              </div>
              <motion.video 
                ref={localVideoRef} 
                className="absolute bottom-4 right-4 w-32 h-24 md:w-48 md:h-36 object-cover rounded-lg border-2 border-gray-700 shadow-md" 
                autoPlay 
                playsInline 
                muted
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              ></motion.video>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center bg-gray-800 p-8">
              <Video className="w-24 h-24 text-gray-500 mb-6" />
              {callStatus === 'disconnected' && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Listo para tu videoconsulta</h2>
                  <p className="text-gray-400 mb-8 text-center max-w-md">
                    Conéctate con tu especialista para una consulta personalizada y seguimiento en tiempo real.
                  </p>
                  <Button onClick={handleStartCall} size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg">
                    Iniciar Llamada
                  </Button>
                </>
              )}
              {callStatus === 'ended' && (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Llamada Finalizada</h2>
                  <p className="text-gray-400 mb-8">Gracias por usar nuestro servicio de videoconsulta.</p>
                </>
              )}
            </div>
          )}

          {(callStatus === 'connected' || callStatus === 'connecting') && (
            <div className="bg-gray-800/80 backdrop-blur-sm p-3 flex justify-center items-center space-x-3 absolute bottom-0 left-0 right-0">
              <Button variant="ghost" onClick={handleToggleAudio} className={`hover:bg-gray-700 p-3 rounded-full ${isAudioEnabled ? 'text-white' : 'text-red-500'}`}>
                <Mic size={22} />
              </Button>
              <Button variant="ghost" onClick={handleToggleVideo} className={`hover:bg-gray-700 p-3 rounded-full ${isVideoEnabled ? 'text-white' : 'text-red-500'}`}>
                <Video size={22} />
              </Button>
              <Button variant="destructive" onClick={handleEndCall} className="bg-red-600 hover:bg-red-700 p-3 rounded-full">
                <PhoneOff size={22} />
              </Button>
              <Button variant="ghost" onClick={unimplementedFeatureToast} className="hover:bg-gray-700 p-3 rounded-full text-white">
                <ScreenShare size={22} />
              </Button>
              <Button variant="ghost" onClick={handleToggleChat} className={`hover:bg-gray-700 p-3 rounded-full ${isChatOpen ? 'text-blue-400' : 'text-white'}`}>
                <MessageSquare size={22} />
              </Button>
              <Button variant="ghost" onClick={handleToggleFullScreen} className="hover:bg-gray-700 p-3 rounded-full text-white">
                {isFullScreen ? <Minimize size={22} /> : <Maximize size={22} />}
              </Button>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="lg:col-span-1 bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          layout
        >
          <AnimatePresence>
            {isChatOpen ? (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3 }}
                className="flex-grow flex flex-col p-4"
              >
                <CardHeader className="p-0 mb-3">
                  <CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="h-5 w-5 text-blue-400"/>Chat con Especialista</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow bg-gray-700 rounded-md p-3 overflow-y-auto mb-3">
                  <p className="text-sm text-gray-400">El chat aún no está implementado.</p>
                </CardContent>
                <div className="flex gap-2">
                  <input type="text" placeholder="Escribe un mensaje..." className="flex-grow bg-gray-700 border border-gray-600 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
                  <Button onClick={unimplementedFeatureToast} className="bg-blue-500 hover:bg-blue-600">Enviar</Button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="sensors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-grow p-4"
              >
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-lg flex items-center gap-2"><Activity className="h-5 w-5 text-green-400"/>Datos de Sensores (Paciente)</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
                  {patientSensors.map((sensor, index) => (
                    <SensorDataDisplay key={index} {...sensor} />
                  ))}
                </CardContent>
                 <CardFooter className="p-0 mt-4">
                  <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700" onClick={unimplementedFeatureToast}>
                    <Share2 className="h-4 w-4 mr-2" /> Compartir más datos
                  </Button>
                </CardFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default VideoConsulta;