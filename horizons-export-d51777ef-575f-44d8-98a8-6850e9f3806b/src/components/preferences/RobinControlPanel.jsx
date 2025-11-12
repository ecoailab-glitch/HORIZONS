import React, { useState } from 'react';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
    import { Button } from "@/components/ui/button.jsx";
    import { Slider } from "@/components/ui/slider.jsx";
    import { Switch } from "@/components/ui/switch.jsx";
    import { Label } from "@/components/ui/label.jsx";
    import { ArrowLeft, BrainCircuit, Bot, Users, BookOpen, Scaling } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { toast } from "@/components/ui/use-toast.jsx";

    function RobinControlPanel() {
        const [settings, setSettings] = useState({
            simulationDepth: 75,
            humanCollaboration: true,
            autoValidation: false,
            sourceDiversity: 90,
        });

        const handleSave = () => {
            toast({
                title: 'Ajustes Guardados',
                description: 'La configuración de Robin ha sido actualizada.',
            });
        };
        
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <BrainCircuit className="h-8 w-8 text-indigo-600" />
                            <h1 className="text-3xl font-bold">Panel de Control de Robin</h1>
                        </div>
                        <Link to="/preferences">
                            <Button variant="outline" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" /> Volver a Preferencias
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Parámetros de Simulación</CardTitle>
                                <CardDescription>Ajusta cómo Robin procesa la información y genera las simulaciones.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-3">
                                    <Label htmlFor="sim-depth" className="flex items-center gap-2"><Scaling/> Profundidad de Simulación</Label>
                                    <div className="flex items-center gap-4">
                                        <Slider id="sim-depth" defaultValue={[settings.simulationDepth]} max={100} step={1} onValueChange={([val]) => setSettings(p => ({...p, simulationDepth: val}))} />
                                        <span className="font-bold text-indigo-600 w-12 text-center">{settings.simulationDepth}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Define el balance entre velocidad y profundidad del análisis. Mayor valor es más preciso pero más lento.</p>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="source-diversity" className="flex items-center gap-2"><BookOpen/> Diversidad de Fuentes</Label>
                                     <div className="flex items-center gap-4">
                                        <Slider id="source-diversity" defaultValue={[settings.sourceDiversity]} max={100} step={1} onValueChange={([val]) => setSettings(p => ({...p, sourceDiversity: val}))} />
                                        <span className="font-bold text-indigo-600 w-12 text-center">{settings.sourceDiversity}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Prioriza la inclusión de una gama más amplia de estudios, incluyendo pre-prints y revisiones sistemáticas.</p>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Parámetros de Colaboración</CardTitle>
                                <CardDescription>Configura cómo los profesionales interactúan con las conclusiones de Robin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                    <div>
                                        <Label htmlFor="human-collab" className="font-semibold flex items-center gap-2"><Users/> Colaboración Humana</Label>
                                        <p className="text-xs text-gray-600">Permitir que los especialistas comenten y voten las simulaciones.</p>
                                    </div>
                                    <Switch id="human-collab" checked={settings.humanCollaboration} onCheckedChange={(val) => setSettings(p => ({...p, humanCollaboration: val}))} />
                                </div>
                                 <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                                    <div>
                                        <Label htmlFor="auto-validation" className="font-semibold flex items-center gap-2"><Bot/> Validación Automática</Label>
                                        <p className="text-xs text-gray-600">Permitir a Robin validar conclusiones con una confianza >95% sin revisión humana.</p>
                                    </div>
                                    <Switch id="auto-validation" checked={settings.autoValidation} onCheckedChange={(val) => setSettings(p => ({...p, autoValidation: val}))} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="mt-8 flex justify-end">
                        <Button onClick={handleSave} size="lg" className="bg-indigo-600 hover:bg-indigo-700">Guardar Configuración</Button>
                    </div>
                </div>
            </div>
        );
    }

    export default RobinControlPanel;