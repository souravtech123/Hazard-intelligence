import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layers/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Habitations from "./pages/Habitation/Habitation";
import HabitationDetails from "./pages/Habitation/HabitationDetail";
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
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="habitations" element={<Habitations />} />
          <Route path="habitations/:id" element={<HabitationDetails />} />
          <Route path="hazards" element={<Hazards />} />
          <Route path="risk" element={<RiskPage />} />
          <Route path="relocation" element={<Relocation />} />
          <Route path="relocation/:id" element={<SiteDetail />} />
          <Route path="scenario" element={<Scenario />} />
          <Route path="reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
