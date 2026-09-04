import {
  LayoutDashboard,
  Home,
  AlertTriangle,
  ShieldAlert,
  MapPinned,
  GitBranch,
  FileText,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Habitations",
    path: "/habitations",
    icon: Home,
  },
  {
    name: "Hazards",
    path: "/hazards",
    icon: AlertTriangle,
  },
  {
    name: "Risk Assessment",
    path: "/risk",
    icon: ShieldAlert,
  },
  {
    name: "Relocation",
    path: "/relocation",
    icon: MapPinned,
  },
  {
    name: "Scenarios",
    path: "/scenario",
    icon: GitBranch,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">
      <div className="h-16 flex items-center px-6 border-b">
        <h2 className="text-xl font-bold">
          Disaster<span className="text-red-600">Risk</span>
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;