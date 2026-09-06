import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthModal from "./AuthModal";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => {
            setShowAuthModal(false);
          }}
          onSuccess={() => {
            setIsAuthenticated(true);
            setShowAuthModal(false);
          }}
        />
        {!showAuthModal && <Navigate to="/" replace />}
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
