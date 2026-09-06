import {
  LayoutDashboard,
  Home,
  AlertTriangle,
  ShieldAlert,
  MapPinned,
  GitBranch,
  FileText,
  PlusCircle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navigation = [
  {
    name: "Command Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add New Location",
    path: "/dashboard/add-location",
    icon: PlusCircle,
  },
  {
    name: "Habitations",
    path: "/dashboard/habitations",
    icon: Home,
  },
  {
    name: "Hazards Monitoring",
    path: "/dashboard/hazards",
    icon: AlertTriangle,
  },
  {
    name: "Risk Scoring",
    path: "/dashboard/risk",
    icon: ShieldAlert,
  },
  {
    name: "Relocation Sites",
    path: "/dashboard/relocation",
    icon: MapPinned,
  },
  {
    name: "Disaster Scenarios",
    path: "/dashboard/scenario",
    icon: GitBranch,
  },
  {
    name: "Audit Reports",
    path: "/dashboard/reports",
    icon: FileText,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <aside className="w-64 h-screen border-r border-gray-800/80 bg-gray-900/95 backdrop-blur-md flex flex-col shadow-2xl">
      {/* Brand Header with Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800/80">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Hazard-Intelligence Logo" className="w-8 h-8 shrink-0 drop-shadow-md" />
          <div>
            <h2 className="text-base font-black tracking-tight text-white flex items-center gap-1">
              Hazard-<span className="text-red-500">Intelligence</span>
            </h2>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">
              Jharkhand Control Command
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-gray-400">
          Core Operations
        </div>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-900/40 border border-red-500/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Region Status Badge */}
      <div className="p-4 mx-4 mb-2 rounded-xl bg-gray-950/80 border border-gray-800/80 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px] mb-1">
          <Sparkles size={13} />
          <span>Active GIS Scope</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-tight">
          Ranchi • Khunti • Ramgarh Subarnarekha Basin
        </p>
      </div>

      {/* Logout button at bottom */}
      <div className="p-4 border-t border-gray-800/80">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-900/40 transition-all"
        >
          <LogOut size={16} />
          <span>Exit Command Panel</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;