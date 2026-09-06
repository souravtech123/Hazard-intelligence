import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/layers/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddLocationPage from "./pages/AddLocation/AddLocationPage";
import Habitations from "./pages/Habitation/Habitation";
import HabitationDetails from "./pages/Habitation/HabitationDetail";
import EditLocationPage from "./pages/EditLocation/EditLocationPage";
import Hazards from "./pages/Hazards/Hazards";
import RiskPage from "./pages/Risk/RiskPage";
import Relocation from "./pages/Reallocation/Reallocation";
import SiteDetail from "./pages/Reallocation/SiteDetail";
import Scenario from "./pages/Scenario/Scenario";
import Reports from "./pages/Reports/Report";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Default Project Entry Point */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected Dashboard Panel Routes - Requires Auth (admin / admin) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-location" element={<AddLocationPage />} />
            <Route path="habitations" element={<Habitations />} />
            <Route path="habitations/:id" element={<HabitationDetails />} />
            <Route path="habitations/:id/edit" element={<EditLocationPage />} />
            <Route path="hazards" element={<Hazards />} />
            <Route path="risk" element={<RiskPage />} />
            <Route path="relocation" element={<Relocation />} />
            <Route path="relocation/:id" element={<SiteDetail />} />
            <Route path="scenario" element={<Scenario />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Route>

        {/* Catch-all redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
