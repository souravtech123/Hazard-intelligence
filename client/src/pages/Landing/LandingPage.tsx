import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  GitBranch,
  FileText,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Lock,
  Layers,
  Activity,
  CheckCircle2,
} from "lucide-react";
import AuthModal from "../../components/auth/AuthModal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenPanel = () => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    if (isAuth) {
      navigate("/dashboard");
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-gray-800/80 bg-gray-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Hazard-Intelligence Logo" className="w-9 h-9 drop-shadow-lg shrink-0" />
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Hazard-<span className="text-red-500">Intelligence</span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                Jharkhand Region • Disaster Risk & Relocation System
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#jharkhand" className="hover:text-white transition-colors">Jharkhand Scope</a>
            <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
          </nav>

          <button
            onClick={handleOpenPanel}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-900/30 hover:from-red-500 hover:to-red-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Lock size={16} />
            <span>Open Main Panel</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section id="overview" className="relative pt-16 pb-20 px-6 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-red-400" />
            <span>Hazard-Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Proactive Hazard Risk Scoring & <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Smart Relocation Intelligence
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hazard-Intelligence is an end-to-end decision support platform designed to identify flood and landslide vulnerabilities in high-risk habitations, track vulnerable populations, simulate severe disaster scenarios, and match displaced citizens to safe relocation sites.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenPanel}
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-xl bg-red-600 hover:bg-red-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-red-900/40 transition-all hover:scale-[1.02]"
            >
              <span>Access Main Panel (Admin)</span>
              <ArrowRight size={18} />
            </button>
            <a
              href="#capabilities"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-800/60 hover:bg-gray-800 px-8 py-4 text-base font-semibold text-gray-200 backdrop-blur-sm transition-all"
            >
              <span>Explore Capabilities</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border border-gray-800/80 rounded-2xl bg-gray-900/60 p-6 backdrop-blur-md">
            {[
              { label: "Target Region", val: "Jharkhand", desc: "Ranchi / Khunti / Ramgarh" },
              { label: "Tracked Habitations", val: "12 Areas", desc: "Subarnarekha Basin & Slopes" },
              { label: "Safe Relocation Sites", val: "5 High Capacity", desc: "Ormanjhi, Khelari, Lapung" },
              { label: "Prediction Latency", val: "< 50ms", desc: "FastAPI ML Inferences" },
            ].map((m, i) => (
              <div key={i} className="text-left border-l border-gray-800 pl-4 first:border-l-0 first:pl-0">
                <p className="text-xs font-medium text-gray-400">{m.label}</p>
                <p className="text-xl font-bold text-white mt-0.5">{m.val}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section id="capabilities" className="py-20 px-6 border-t border-gray-800/60 bg-gray-950/60 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">Hazard-Intelligence Capabilities</h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base">
              Comprehensive tools designed for disaster response authorities, GIS analysts, and emergency planning officers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MapPin,
                color: "text-red-400 bg-red-500/10 border-red-500/20",
                title: "Interactive GIS Hazard Map",
                desc: "Renders real-time color-coded risk markers (Critical, Very High, High, Low) for habitations, hazard inundation zones, and safe relocation diamond markers across Jharkhand.",
              },
              {
                icon: Activity,
                color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
                title: "Multivariate Risk Scoring Engine",
                desc: "Computes overall risk scores using weighted formulas (Flood 40%, Landslide 25%, Historical 20%, Exposure 15%) combined with Machine Learning feature regressions.",
              },
              {
                icon: Users,
                color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
                title: "Demographic Vulnerability Tracking",
                desc: "Monitors vulnerable population groups (children, elderly, differently-abled) in high-risk zones to prioritize evacuation routes and shelter healthcare capacity.",
              },
              {
                icon: Building2,
                color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                title: "Smart Relocation Site Matching",
                desc: "Evaluates high-elevation resettlement sites (Ormanjhi, Khelari, Lapung) by suitability scores, available land, water, healthcare, and road accessibility.",
              },
              {
                icon: GitBranch,
                color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
                title: "Disaster Scenario Simulator",
                desc: "Simulates severe 10%–100% hazard scenarios (Monsoon Floods, Flash Floods, Slopes Breakdowns) to forecast displaced population counts and shelter capacity deficits.",
              },
              {
                icon: FileText,
                color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
                title: "Automated Executive Assessment Reports",
                desc: "Generates structured relocation assessment reports and audit summaries detailing critical habitations, evacuation priorities, and site allocations.",
              },
            ].map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-gray-800 bg-gray-900/60 p-6 backdrop-blur-sm hover:border-gray-700 hover:bg-gray-900 transition-all duration-200"
                >
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${cap.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jharkhand Regional Scope Section */}
      <section id="jharkhand" className="py-20 px-6 border-t border-gray-800/60 bg-gray-900/30">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-4">
              <span>Jharkhand Region Focus</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Calibrated for Chota Nagpur Plateau & Subarnarekha River Basin
            </h2>
            <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              Hazard-Intelligence uses authentic geographic coordinates and demographic distributions mapped across Ranchi, Khunti, and Ramgarh districts:
            </p>

            <div className="mt-6 space-y-3">
              {[
                { label: "High-Risk Flood Basins", text: "Subarnarekha River Basin, Kanke Riverbank Basti, Nagri Flood Plain, Namkum Low-lying Basti." },
                { label: "Landslide Vulnerability", text: "Tatisilwai Highway Cut Slope, Bero Hillside Hamlet, Angara Ravine Community." },
                { label: "Safe Highland Resettlement", text: "Ormanjhi Safe Highland Zone (8,000 capacity), Khelari Plateau (10,000 capacity), Lapung Township." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-800 bg-gray-900/80 p-4">
                  <CheckCircle2 size={20} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-red-400" />
                <span className="text-xs font-bold text-gray-200">Hazard-Intelligence Live Monitoring</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ACTIVE MAP DATA
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { name: "Kanke Riverbank Basti", lat: "23.4441° N", lng: "85.3196° E", risk: "88.5 / 100", level: "CRITICAL" },
                { name: "Nagri Flood Plain", lat: "23.3180° N", lng: "85.3900° E", risk: "93.0 / 100", level: "CRITICAL" },
                { name: "Tatisilwai Slope", lat: "23.3600° N", lng: "85.4400° E", risk: "79.0 / 100", level: "VERY HIGH" },
                { name: "Ormanjhi Safe Zone", lat: "23.4150° N", lng: "85.2750° E", risk: "8.0 / 100", level: "SAFE SITE" },
                { name: "Khelari Resettlement", lat: "23.5250° N", lng: "85.1650° E", risk: "6.0 / 100", level: "SAFE SITE" },
              ].map((loc, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-gray-950/80 p-3 border border-gray-800/80">
                  <div>
                    <span className="font-semibold text-white">{loc.name}</span>
                    <span className="block text-[11px] text-gray-500">{loc.lat}, {loc.lng}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${loc.level === "CRITICAL" ? "bg-red-950 text-red-400 border border-red-800" : loc.level === "VERY HIGH" ? "bg-orange-950 text-orange-400 border border-orange-800" : "bg-emerald-950 text-emerald-400 border border-emerald-800"}`}>
                      {loc.level}
                    </span>
                    <span className="block text-[10px] text-gray-400 mt-1">{loc.risk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Section */}
      <section className="py-16 px-6 border-t border-gray-800/60 bg-gradient-to-b from-gray-950 to-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white">Access the Hazard-Intelligence Panel</h2>
          <p className="mt-3 text-gray-400 text-sm">
            Use the administrative authentication credentials to view live GIS maps, run simulations, and allocate relocation sites.
          </p>

          <button
            onClick={handleOpenPanel}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-red-600 hover:bg-red-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-red-900/50 transition-all hover:scale-[1.02]"
          >
            <Lock size={18} />
            <span>Open Hazard-Intelligence Panel (admin / admin)</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Auth Modal Trigger */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default LandingPage;