
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-accent rounded-full mb-6">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-6xl font-bold text-navy mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link to="/">
            <Button className="bg-blue-accent hover:bg-blue-600">
              Go to Login
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            Return to the employee portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
