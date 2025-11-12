import React from "react";
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
    import { Toaster } from "@/components/ui/toaster.jsx";
    import { AuthProvider } from "@/contexts/AuthContext.jsx";
    import LandingPage from "@/components/LandingPage.jsx";
    import Dashboard from "@/components/Dashboard.jsx";
    import UserFeatures from "@/components/UserFeatures.jsx";
    import UserProfile from "@/components/user/UserProfile.jsx";
    import MealTracker from "@/components/user/MealTracker.jsx";
    import NutritionPlan from "@/components/user/NutritionPlan.jsx";
    import ProgressTracking from "@/components/user/ProgressTracking.jsx";
    import Messaging from "@/components/user/Messaging.jsx";
    import VideoConsulta from "@/components/VideoConsulta.jsx";
    import DoctorFeatures from "@/components/DoctorFeatures.jsx";
    import DoctorDashboard from "@/components/doctor/DoctorDashboard.jsx";
    import DoctorPatients from "@/components/doctor/DoctorPatients.jsx";
    import DoctorNutritionPlans from "@/components/doctor/DoctorNutritionPlans.jsx";
    import DoctorReports from "@/components/doctor/DoctorReports.jsx";
    import DoctorAnalytics from "@/components/doctor/DoctorAnalytics.jsx";
    import DoctorCommunication from "@/components/doctor/DoctorCommunication.jsx";
    import PharmaFeatures from "@/components/PharmaFeatures.jsx";
    import PharmaDashboard from "@/components/pharma/PharmaDashboard.jsx";
    import PharmaPrescriptions from "@/components/pharma/PharmaPrescriptions.jsx";
    import PharmaPatients from "@/components/pharma/PharmaPatients.jsx";
    import PharmaInventory from "@/components/pharma/PharmaInventory.jsx";
    import PharmaCommunication from "@/components/pharma/PharmaCommunication.jsx";
    import PharmaProfile from "@/components/pharma/PharmaProfile.jsx";
    import Navbar from "@/components/Navbar.jsx";
    import AppPreferences from "@/components/preferences/AppPreferences.jsx";
    import FoodDatabase from "@/components/preferences/FoodDatabase.jsx";
    import PatternAnalysis from "@/components/preferences/PatternAnalysis.jsx";
    import RegionalConfig from "@/components/preferences/RegionalConfig.jsx";
    import BigDataAnalysis from "@/components/preferences/BigDataAnalysis.jsx";
    import PrivacySettings from "@/components/preferences/PrivacySettings.jsx";
    import DeviceSettings from "@/components/preferences/DeviceSettings.jsx";
    import AISettings from "@/components/preferences/AISettings.jsx";
    import EndocrineDisruptors from "@/components/user/EndocrineDisruptors.jsx";
    import PatientContext from "@/components/doctor/PatientContext.jsx";
    import RobinHealthInsights from "@/components/robin/RobinHealthInsights.jsx";
    import DisruptorsDatabase from "@/components/preferences/DisruptorsDatabase.jsx";
    import RobinControlPanel from "@/components/preferences/RobinControlPanel.jsx";
    import RegisterForm from "@/components/auth/RegisterForm.jsx";

    function App() {
      return (
        <Router>
          <AuthProvider>
            <div className="min-h-screen">
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/user-features" element={<UserFeatures />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/meals" element={<MealTracker />} />
                <Route path="/nutrition-plan" element={<NutritionPlan />} />
                <Route path="/progress" element={<ProgressTracking />} />
                <Route path="/messages" element={<Messaging />} />
                <Route path="/video-consulta" element={<VideoConsulta />} />
                <Route path="/doctor-features" element={<DoctorFeatures />} />
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/patients" element={<DoctorPatients />} />
                <Route path="/doctor/nutrition-plans" element={<DoctorNutritionPlans />} />
                <Route path="/doctor/reports" element={<DoctorReports />} />
                <Route path="/doctor/analytics" element={<DoctorAnalytics />} />
                <Route path="/doctor/communication" element={<DoctorCommunication />} />
                <Route path="/pharma-features" element={<PharmaFeatures />} />
                <Route path="/pharma/dashboard" element={<PharmaDashboard />} />
                <Route path="/pharma/prescriptions" element={<PharmaPrescriptions />} />
                <Route path="/pharma/patients" element={<PharmaPatients />} />
                <Route path="/pharma/inventory" element={<PharmaInventory />} />
                <Route path="/pharma/communication" element={<PharmaCommunication />} />
                <Route path="/pharma/profile" element={<PharmaProfile />} />
                <Route path="/preferences" element={<AppPreferences />} />
                <Route path="/preferences/devices" element={<DeviceSettings />} />
                <Route path="/preferences/food-database" element={<FoodDatabase />} />
                <Route path="/preferences/pattern-analysis" element={<PatternAnalysis />} />
                <Route path="/preferences/regional-config" element={<RegionalConfig />} />
                <Route path="/preferences/big-data" element={<BigDataAnalysis />} />
                <Route path="/preferences/privacy" element={<PrivacySettings />} />
                <Route path="/preferences/ai" element={<AISettings />} />
                <Route path="/disruptores-endocrinos" element={<EndocrineDisruptors />} />
                <Route path="/doctor/patient-context" element={<PatientContext />} />
                <Route path="/robin-health-insights" element={<RobinHealthInsights />} />
                <Route path="/preferences/disruptors-database" element={<DisruptorsDatabase />} />
                <Route path="/preferences/robin-control" element={<RobinControlPanel />} />
              </Routes>
              <Toaster />
            </div>
          </AuthProvider>
        </Router>
      );
    }

    export default App;