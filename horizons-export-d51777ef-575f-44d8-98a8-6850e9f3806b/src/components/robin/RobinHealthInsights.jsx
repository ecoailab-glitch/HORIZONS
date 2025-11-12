import React, { useState } from 'react';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
    import { Button } from "@/components/ui/button.jsx";
    import { Input } from "@/components/ui/input.jsx";
    import { Textarea } from "@/components/ui/textarea.jsx";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
    import { UploadCloud, FlaskConical, Lightbulb, MessageCircle, Check, X, GitBranch, Share2 } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { toast } from "@/components/ui/use-toast.jsx";

    const mockIdeas = [
        {
            id: 1,
            title: 'Análisis del impacto de la Berberina en la resistencia a la insulina',
            author: 'Dra. Elena Vasco',
            status: 'En Discusión',
            simulation: {
                summary: 'Simulación inicial muestra una reducción del 15% en el índice HOMA-IR en 12 semanas con 500mg/día. Se observan posibles interacciones con metformina.',
                sources: ['PubMed ID: 25498346', 'EFSA Journal 2012;10(5):2682'],
            },
            comments: [
                { author: 'Dr. Kenji Tanaka', text: 'Interesante. ¿Podría Robin simular el efecto en combinación con ayuno intermitente 16/8?' },
                { author: 'Dra. Sofia Rossi', text: 'Los datos de la EFSA son de 2012. ¿Hay estudios más recientes sobre su seguridad hepática?' },
            ]
        },
        {
            id: 2,
            title: 'Uso de Ashwagandha para la modulación del cortisol en estrés crónico',
            author: 'Dr. Kenji Tanaka',
            status: 'Validado',
            simulation: {
                summary: 'Estudios consolidados apoyan una reducción del cortisol sérico del 20-30% con extracto KSM-66. Mínimos efectos adversos reportados.',
                sources: ['PubMed ID: 23439798', 'Journal of Ethnopharmacology, Vol. 195'],
            },
            comments: [
                { author: 'Dra. Elena Vasco', text: 'Totalmente de acuerdo. Lo he usado con éxito en mi práctica clínica. La validación es correcta.' },
            ]
        }
    ];


    function RobinHealthInsights() {
      const [ideas, setIdeas] = useState(mockIdeas);
      const [selectedIdea, setSelectedIdea] = useState(mockIdeas[0]);
      const [newIdeaTitle, setNewIdeaTitle] = useState('');
      const [newIdeaDescription, setNewIdeaDescription] = useState('');
      const [comment, setComment] = useState('');

      const handleSubmitIdea = () => {
          if(!newIdeaTitle) {
              toast({title: "Error", description: "El título de la idea es obligatorio.", variant: "destructive"});
              return;
          }
          const newIdea = {
              id: Date.now(),
              title: newIdeaTitle,
              author: 'Dr. Usuario Actual',
              status: 'Simulando',
              simulation: { summary: 'Robin está analizando miles de fuentes científicas para generar la simulación. Esto puede tardar unos minutos...', sources: [] },
              comments: []
          };
          setIdeas(prev => [newIdea, ...prev]);
          toast({ title: '¡Idea Enviada!', description: 'Robin ha comenzado a trabajar en tu propuesta.' });
          setNewIdeaTitle('');
          setNewIdeaDescription('');

          setTimeout(() => {
              setIdeas(prev => prev.map(idea => idea.id === newIdea.id ? {...idea, status: 'En Discusión', simulation: { summary: 'Simulación completada. Se predice un efecto moderado en el marcador X. Se necesitan más datos sobre el efecto Y.', sources: ['Fuente simulada A', 'Fuente simulada B']}} : idea));
              toast({ title: 'Simulación Completada', description: `La simulación para "${newIdea.title}" está lista para revisión.`, variant: 'success'});
          }, 4000);
      };
      
      const handleAddComment = () => {
          if (!comment.trim() || !selectedIdea) return;
          const newComment = { author: 'Dr. Usuario Actual', text: comment };
          const updatedIdeas = ideas.map(idea => 
              idea.id === selectedIdea.id ? {...idea, comments: [...idea.comments, newComment]} : idea
          );
          setIdeas(updatedIdeas);
          setSelectedIdea(updatedIdeas.find(i => i.id === selectedIdea.id));
          setComment('');
      };

      const getStatusPill = (status) => {
        switch(status) {
            case 'En Discusión': return <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full"><MessageCircle className="h-3 w-3"/> En Discusión</span>;
            case 'Validado': return <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-100 rounded-full"><Check className="h-3 w-3"/> Validado</span>;
            case 'Simulando': return <span className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full animate-pulse"><FlaskConical className="h-3 w-3"/> Simulando</span>;
            default: return <span className="px-2 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">{status}</span>;
        }
      };
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block bg-white p-4 rounded-full shadow-md mb-4">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_n5JRA8ajB2pBf2U0_rRk3hG-D1tJ_3r2QpUf-c0_w&s" alt="Robin Logo" className="h-12 w-12" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">Robin Health Insights</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">El laboratorio digital donde la inteligencia humana y artificial colaboran para potenciar el criterio médico.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card className="shadow-lg sticky top-24">
                            <CardHeader>
                                <CardTitle>Propuestas de Análisis</CardTitle>
                                <CardDescription>Ideas activas en la comunidad.</CardDescription>
                            </CardHeader>
                            <CardContent className="max-h-[60vh] overflow-y-auto p-2">
                                <div className="space-y-2">
                                    {ideas.map(idea => (
                                        <div key={idea.id} onClick={() => setSelectedIdea(idea)} className={`p-3 rounded-lg cursor-pointer border-2 ${selectedIdea?.id === idea.id ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-gray-50 border-transparent'}`}>
                                            <p className="font-semibold text-sm text-gray-800">{idea.title}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-xs text-gray-500">Por: {idea.author}</p>
                                                {getStatusPill(idea.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div key={selectedIdea?.id || 'empty'} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                {selectedIdea ? (
                                    <Card className="shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-2xl text-indigo-700">{selectedIdea.title}</CardTitle>
                                            <CardDescription>Propuesto por {selectedIdea.author} | Estado: {getStatusPill(selectedIdea.status)}</CardDescription>
                                        </CardHeader>
                                        <Tabs defaultValue="simulation" className="w-full">
                                            <TabsList className="mx-6">
                                                <TabsTrigger value="simulation"><FlaskConical className="mr-2 h-4 w-4"/>Simulación de Robin</TabsTrigger>
                                                <TabsTrigger value="discussion"><MessageCircle className="mr-2 h-4 w-4"/>Discusión ({selectedIdea.comments.length})</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="simulation" className="p-6">
                                                <h3 className="font-semibold text-lg mb-2">Análisis Generado por IA</h3>
                                                <p className="text-gray-600 whitespace-pre-wrap">{selectedIdea.simulation.summary}</p>
                                                <h4 className="font-semibold mt-4 mb-2">Fuentes Principales</h4>
                                                <ul className="list-disc list-inside text-sm text-blue-600">
                                                    {selectedIdea.simulation.sources.map((s, i) => <li key={i}><a href="#" className="hover:underline">{s}</a></li>)}
                                                </ul>
                                            </TabsContent>
                                            <TabsContent value="discussion" className="p-6">
                                                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                                                    {selectedIdea.comments.map((c,i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <Avatar className="h-8 w-8"><AvatarFallback>{c.author.substring(0,2)}</AvatarFallback></Avatar>
                                                            <div className="bg-gray-100 p-3 rounded-lg flex-1">
                                                                <p className="font-semibold text-sm">{c.author}</p>
                                                                <p className="text-sm text-gray-700">{c.text}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <Input placeholder="Añadir un comentario..." value={comment} onChange={e => setComment(e.target.value)} />
                                                    <Button onClick={handleAddComment}>Enviar</Button>
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                        <CardFooter className="flex justify-end gap-2 bg-gray-50 p-4">
                                            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50"><X className="mr-2 h-4 w-4"/>Rechazar Conclusión</Button>
                                            <Button variant="outline" className="text-green-600 border-green-300 hover:bg-green-50"><Check className="mr-2 h-4 w-4"/>Validar Conclusión</Button>
                                        </CardFooter>
                                    </Card>
                                ) : (
                                    <div className="text-center p-10"><p>Selecciona una propuesta para ver los detalles.</p></div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                        
                        <Card className="shadow-lg">
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-yellow-500"/>Proponer un Nuevo Análisis</CardTitle>
                                <CardDescription>Sube una nueva idea, suplemento o producto para que Robin y la comunidad lo analicen.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input placeholder="Título de la propuesta (ej: Efecto del Omega-3 en TDAH)" value={newIdeaTitle} onChange={e => setNewIdeaTitle(e.target.value)} />
                                <Textarea placeholder="Describe la hipótesis o pregunta que quieres resolver. Añade enlaces a estudios si los tienes." rows={3} value={newIdeaDescription} onChange={e => setNewIdeaDescription(e.target.value)} />
                            </CardContent>
                             <CardFooter>
                                <Button onClick={handleSubmitIdea} className="bg-indigo-600 hover:bg-indigo-700 w-full">
                                    <UploadCloud className="mr-2 h-5 w-5"/>Enviar Propuesta a Robin
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </motion.div>
        </div>
      );
    }

    export default RobinHealthInsights;