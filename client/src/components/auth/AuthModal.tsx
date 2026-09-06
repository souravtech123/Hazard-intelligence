import { useState } from "react";
import { Lock, User, KeyRound, AlertCircle, X, ShieldCheck } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "admin" && password.trim() === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      onSuccess();
    } else {
      setError("Invalid username or password. Please use admin / admin.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-2xl border border-gray-800 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
            <Lock size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">Admin Authentication</h3>
            <p className="text-xs text-gray-400">Hazard-Intelligence Main Command Panel</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-950/80 p-3 text-xs font-bold text-red-400 border border-red-800">
            <AlertCircle size={16} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-3.5 text-red-400" />
              <input
                type="text"
                placeholder="Enter username (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 pl-11 pr-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                style={{ color: "#ffffff", caretColor: "#ef4444" }}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound size={18} className="absolute left-3.5 top-3.5 text-red-400" />
              <input
                type="password"
                placeholder="Enter password (admin)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 pl-11 pr-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-colors"
                style={{ color: "#ffffff", caretColor: "#ef4444" }}
                required
              />
            </div>
          </div>

          <div className="rounded-xl bg-gray-950 p-3.5 border border-gray-800 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
              <ShieldCheck size={14} />
              <span>Demo Credentials</span>
            </div>
            <div className="flex gap-4 font-mono text-gray-300 text-xs">
              <span>Username: <b className="text-white">admin</b></span>
              <span>Password: <b className="text-white">admin</b></span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-900/40 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            Authenticate & Access Main Panel →
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
