import React from "react";
    import { Link } from "react-router-dom";
    import { Button } from "@/components/ui/button.jsx";
    import { Settings, Home, Video, Stethoscope, Pill, FlaskConical, BrainCircuit } from "lucide-react";

    function Navbar() {
      return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <Link to="/" className="flex items-center gap-2">
                <img alt="NutriPersonal Logo" className="h-10 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_n5JRA8ajB2pBf2U0_rRk3hG-D1tJ_3r2QpUf-c0_w&s" />
                <span className="text-2xl font-bold text-green-600">NutriPersonal</span>
              </Link>

              <div className="hidden lg:flex items-center space-x-1">
                <Link to="/"><Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:bg-green-50 hover:text-green-600"><Home className="h-5 w-5" />Inicio</Button></Link>
                <Link to="/disruptores-endocrinos"><Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600"><FlaskConical className="h-5 w-5" />Disruptores</Button></Link>
                <Link to="/video-consulta"><Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"><Video className="h-5 w-5" />Videoconsulta</Button></Link>
                <Link to="/doctor-features"><Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"><Stethoscope className="h-5 w-5" />Doctor</Button></Link>
                <Link to="/pharma-features"><Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:bg-red-50 hover:text-red-600"><Pill className="h-5 w-5" />Farmacia</Button></Link>
                <Link to="/robin-health-insights"><Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"><BrainCircuit className="h-5 w-5" />Robin</Button></Link>
                <Link to="/preferences"><Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600"><Settings className="h-5 w-5" />Preferencias</Button></Link>
              </div>

               <div className="flex lg:hidden">
                    <Button variant="ghost">Menú</Button>
               </div>
            </div>
          </div>
        </nav>
      );
    }

    export default Navbar;