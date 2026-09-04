import { Menu, Bell, User } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold">
          Disaster Risk Management
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={18} />
          </div>

          <span className="hidden sm:block text-sm font-medium">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;