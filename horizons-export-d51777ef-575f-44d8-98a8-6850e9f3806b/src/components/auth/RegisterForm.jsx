import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus, Mail, Lock, Building, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "user",
    specialization: "",
    license: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      throw new Error("El nombre es requerido");
    }
    if (!formData.email.trim()) {
      throw new Error("El correo electrónico es requerido");
    }
    if (!formData.password) {
      throw new Error("La contraseña es requerida");
    }
    if (formData.password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }
    if (formData.userType === "specialist" && !formData.specialization) {
      throw new Error("La especialización es requerida para especialistas");
    }
    if (formData.userType === "specialist" && !formData.license) {
      throw new Error("El número de licencia es requerido para especialistas");
    }
    if (formData.userType === "pharma" && !formData.company) {
      throw new Error("El nombre de la farmacia es requerido");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      validateForm();

      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: formData.userType,
        specialization: formData.specialization,
        license: formData.license,
        company: formData.company,
      });

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada. Por favor, verifica tu correo electrónico.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-20 p-4"
    >
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <UserPlus className="h-6 w-6" />
            Registro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuario</Label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-background"
                disabled={loading}
              >
                <option value="user">Usuario</option>
                <option value="specialist">Especialista</option>
                <option value="pharma">Farmacéutica</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Tu nombre completo"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {formData.userType === "specialist" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Especialización</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="Tu especialización"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Número de Licencia</Label>
                  <Input
                    id="license"
                    name="license"
                    value={formData.license}
                    onChange={handleChange}
                    placeholder="Número de licencia profesional"
                    required
                    disabled={loading}
                  />
                </div>
              </>
            )}

            {formData.userType === "pharma" && (
              <div className="space-y-2">
                <Label htmlFor="company">Nombre de la Farmacia</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Nombre de tu farmacia"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="tu@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registrando..." : "Registrarse"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Inicia sesión aquí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default RegisterForm;