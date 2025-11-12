import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Cookies from 'js-cookie';

function PrivacyConsent() {
  const [consents, setConsents] = useState({
    dataProcessing: false,
    healthData: false,
    marketing: false
  });
  const { toast } = useToast();

  const handleConsentChange = (key) => {
    setConsents(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = () => {
    if (!consents.dataProcessing || !consents.healthData) {
      toast({
        variant: "destructive",
        title: "Consentimiento requerido",
        description: "Debes aceptar el procesamiento de datos y datos de salud para continuar"
      });
      return;
    }

    // Guardar consentimientos
    Object.entries(consents).forEach(([key, value]) => {
      Cookies.set(`consent_${key}`, value, { expires: 365 });
    });

    toast({
      title: "Preferencias guardadas",
      description: "Tus preferencias de privacidad han sido actualizadas"
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Configuración de Privacidad
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="dataProcessing"
              checked={consents.dataProcessing}
              onCheckedChange={() => handleConsentChange('dataProcessing')}
            />
            <div className="space-y-1">
              <label
                htmlFor="dataProcessing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Procesamiento de Datos (Requerido)
              </label>
              <p className="text-sm text-muted-foreground">
                Autorizo el procesamiento de mis datos personales de acuerdo con la política de privacidad.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="healthData"
              checked={consents.healthData}
              onCheckedChange={() => handleConsentChange('healthData')}
            />
            <div className="space-y-1">
              <label
                htmlFor="healthData"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Datos de Salud (Requerido)
              </label>
              <p className="text-sm text-muted-foreground">
                Autorizo el procesamiento de mis datos de salud para el seguimiento y recomendaciones personalizadas.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketing"
              checked={consents.marketing}
              onCheckedChange={() => handleConsentChange('marketing')}
            />
            <div className="space-y-1">
              <label
                htmlFor="marketing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Comunicaciones de Marketing (Opcional)
              </label>
              <p className="text-sm text-muted-foreground">
                Deseo recibir actualizaciones y ofertas personalizadas.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-4 rounded-lg flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-1" />
          <p className="text-sm">
            Tus datos están protegidos bajo las normativas GDPR y HIPAA. Puedes solicitar acceso,
            rectificación o eliminación de tus datos en cualquier momento.
          </p>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Guardar Preferencias
        </Button>
      </CardContent>
    </Card>
  );
}

export default PrivacyConsent;