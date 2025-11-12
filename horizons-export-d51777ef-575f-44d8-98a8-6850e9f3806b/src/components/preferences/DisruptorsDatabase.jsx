import React, { useState } from 'react';
    import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card.jsx";
    import { Button } from "@/components/ui/button.jsx";
    import { Input } from "@/components/ui/input.jsx";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog.jsx";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
    import { Search, PlusCircle, FlaskConical, ArrowLeft, Edit, Trash2 } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import { toast } from "@/components/ui/use-toast.jsx";

    const mockSubstances = [
        { id: 'S001', name: 'Bisfenol-A (BPA)', riskLevel: 'Alto', category: 'Plásticos', status: 'Activo' },
        { id: 'S002', name: 'Parabenos', riskLevel: 'Medio', category: 'Cosméticos', status: 'Activo' },
        { id: 'S003', name: 'Ftalatos (DBP)', riskLevel: 'Alto', category: 'Plásticos', status: 'Activo' },
        { id: 'S004', name: 'Phenoxyethanol', riskLevel: 'Bajo', category: 'Conservantes', status: 'Activo' },
        { id: 'S005', name: 'Triclosán', riskLevel: 'Medio', category: 'Antibacterianos', status: 'En Revisión' },
    ];

    function DisruptorsDatabase() {
        const [substances, setSubstances] = useState(mockSubstances);
        const [searchTerm, setSearchTerm] = useState('');
        
        const filteredSubstances = substances.filter(s => 
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const getRiskPill = (level) => {
            switch(level) {
                case 'Alto': return <span className="px-2 py-0.5 text-xs font-semibold text-red-800 bg-red-100 rounded-full">{level}</span>;
                case 'Medio': return <span className="px-2 py-0.5 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">{level}</span>;
                default: return <span className="px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{level}</span>;
            }
        };

        const getStatusPill = (status) => {
            return status === 'Activo'
                ? <span className="px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{status}</span>
                : <span className="px-2 py-0.5 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">{status}</span>;
        };
        
        const unimplementedFeatureToast = () => {
            toast({
              title: "🚧 ¡En construcción!",
              description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
            });
        };

        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <FlaskConical className="h-8 w-8 text-teal-600" />
                            <h1 className="text-3xl font-bold">Base de Datos de Disruptores</h1>
                        </div>
                        <Link to="/preferences">
                            <Button variant="outline" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" /> Volver a Preferencias
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Gestión de Sustancias</CardTitle>
                            <CardDescription>Añade, edita o desactiva sustancias en el sistema de escaneo.</CardDescription>
                            <div className="flex justify-between items-center pt-4">
                                <div className="relative w-full max-w-sm">
                                    <Input placeholder="Buscar por nombre o categoría..." className="pl-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                                </div>
                                <Button onClick={unimplementedFeatureToast}><PlusCircle className="mr-2 h-4 w-4"/> Añadir Sustancia</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Categoría</TableHead>
                                        <TableHead>Nivel de Riesgo</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSubstances.map(substance => (
                                        <TableRow key={substance.id}>
                                            <TableCell className="font-medium">{substance.name}</TableCell>
                                            <TableCell>{substance.category}</TableCell>
                                            <TableCell>{getRiskPill(substance.riskLevel)}</TableCell>
                                            <TableCell>{getStatusPill(substance.status)}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Edit className="h-4 w-4"/></Button>
                                                <Button variant="ghost" size="icon" onClick={unimplementedFeatureToast}><Trash2 className="h-4 w-4 text-red-500"/></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <p className="text-xs text-gray-500">Mostrando {filteredSubstances.length} de {substances.length} sustancias.</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }

    export default DisruptorsDatabase;