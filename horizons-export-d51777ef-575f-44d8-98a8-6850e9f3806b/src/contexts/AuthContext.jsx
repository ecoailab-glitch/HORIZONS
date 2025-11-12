import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase.js';
import { toast } from "@/components/ui/use-toast.jsx";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
        toast({ title: "Error de Sesión", description: error.message, variant: "destructive" });
      }
      setUser(session?.user ?? null);
      if (session?.user) {
        await getProfile(session.user);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await getProfile(session.user);
      } else {
        setProfile(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const getProfile = async (currentUser) => {
    if (!currentUser) return;
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url, role`)
        .eq('id', currentUser.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };
  
  const login = async (email, password) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Error de Login", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login exitoso!", description: "Bienvenido de nuevo." });
    }
    setLoading(false);
    return { error };
  };

  const register = async (fullName, email, password) => {
    setLoading(true);
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast({ title: "Error de Registro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Registro exitoso!", description: "Por favor, revisa tu email para confirmar tu cuenta." });
    }
    setLoading(false);
    return { user, error };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Error al cerrar sesión", description: error.message, variant: "destructive" });
    } else {
      setUser(null);
      setProfile(null);
      toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
    }
  };

  const value = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};