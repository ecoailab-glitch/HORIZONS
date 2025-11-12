import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar.jsx";
import { User, Mail, Phone, MapPin, Edit3, Save, ShieldCheck, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast.jsx";

function UserProfile() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    phone: '555-123-4567',
    address: 'Calle Falsa 123, Ciudad Ejemplo',
    avatar: 'https://avatar.vercel.sh/usuarioejemplo.png',
    bio: 'Entusiasta de la salud y el fitness. Buscando mejorar mis hábitos alimenticios y mi rendimiento físico.',
    age: 30,
    height: "175 cm",
    weight: "70 kg",
    goals: "Perder 5kg, correr 10km"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: "Perfil Actualizado", description: "Tu información ha sido guardada exitosamente." });
  };
  
  const unimplementedFeatureToast = () => {
    toast({
      title: "🚧 ¡En construcción!",
      description: "Esta función aún no está implementada, ¡pero puedes solicitarla en tu próximo prompt! 🚀",
    });
  };

  const ProfileField = ({ icon, label, value, name, editing, onChange, type = "text" }) => (
    <div className="flex items-center space-x-3 py-3 border-b border-gray-200">
      {React.cloneElement(icon, { className: "h-5 w-5 text-gray-500" })}
      <div className="flex-grow">
        <Label htmlFor={name} className="text-xs text-gray-500">{label}</Label>
        {editing ? (
          <Input id={name} name={name} type={type} value={value} onChange={onChange} className="text-sm p-1 border-0 focus:ring-0" />
        ) : (
          <p className="text-sm text-gray-800">{value || '-'}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full bg-white text-sky-600 hover:bg-sky-100" onClick={unimplementedFeatureToast}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
              <div className="text-center md:text-left">
                {isEditing ? (
                  <Input name="name" value={profile.name} onChange={handleChange} className="text-3xl font-bold bg-transparent border-0 border-b-2 border-white/50 text-white placeholder-white/70 focus:ring-0 mb-1 p-0" />
                ) : (
                  <CardTitle className="text-3xl md:text-4xl font-bold">{profile.name}</CardTitle>
                )}
                <CardDescription className="text-sky-100 text-sm md:text-base">
                  {isEditing ? (
                    <Input name="bio" value={profile.bio} onChange={handleChange} className="text-sm bg-transparent border-0 border-b-2 border-white/50 text-white placeholder-white/70 focus:ring-0 p-0" />
                  ) : (
                    profile.bio
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Información Personal</h3>
              <ProfileField icon={<User />} label="Nombre Completo" name="name" value={profile.name} editing={isEditing} onChange={handleChange} />
              <ProfileField icon={<Mail />} label="Correo Electrónico" name="email" value={profile.email} editing={isEditing} onChange={handleChange} type="email" />
              <ProfileField icon={<Phone />} label="Teléfono" name="phone" value={profile.phone} editing={isEditing} onChange={handleChange} type="tel" />
              <ProfileField icon={<MapPin />} label="Dirección" name="address" value={profile.address} editing={isEditing} onChange={handleChange} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Datos de Salud</h3>
              <div className="grid grid-cols-2 gap-x-6">
                <ProfileField icon={<User />} label="Edad" name="age" value={profile.age} editing={isEditing} onChange={handleChange} type="number" />
                <ProfileField icon={<User />} label="Altura" name="height" value={profile.height} editing={isEditing} onChange={handleChange} />
                <ProfileField icon={<User />} label="Peso" name="weight" value={profile.weight} editing={isEditing} onChange={handleChange} />
                <ProfileField icon={<User />} label="Objetivos" name="goals" value={profile.goals} editing={isEditing} onChange={handleChange} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button variant="outline" onClick={unimplementedFeatureToast} className="w-full flex items-center justify-center gap-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50">
                    <ShieldCheck className="h-5 w-5"/> Seguridad y Privacidad
                </Button>
                <Button variant="outline" onClick={unimplementedFeatureToast} className="w-full flex items-center justify-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-50">
                    <Bell className="h-5 w-5"/> Preferencias de Notificación
                </Button>
            </div>

          </CardContent>
          <CardFooter className="bg-gray-50 p-6 flex justify-end">
            {isEditing ? (
              <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                <Save className="mr-2 h-4 w-4" /> Guardar Cambios
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-sky-600 hover:bg-sky-700">
                <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default UserProfile;