import { Menu, User, LogOut, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <header className="h-16 border-b border-gray-800/80 bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl border border-gray-800 bg-gray-800/60 hover:bg-gray-800 text-gray-300"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-7 h-7 drop-shadow-md hidden sm:block" />
          <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>Hazard-Intelligence</span>
            <span className="text-xs text-gray-500 font-normal hidden md:inline">| Main Command Panel</span>
          </h1>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-[11px] font-mono text-emerald-400">
            <Radio size={12} className="animate-pulse" />
            <span>LIVE SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 bg-gray-800/80 border border-gray-700/60 px-3 py-1.5 rounded-xl">
          <div className="w-6 h-6 rounded-lg bg-red-600/30 border border-red-500/40 text-red-400 flex items-center justify-center text-xs font-black">
            <User size={13} />
          </div>
          <span className="text-xs font-bold text-gray-200">Admin</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/40 border border-red-900/60 px-3.5 py-2 rounded-xl transition-all"
          title="Log out and return to Landing Page"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;