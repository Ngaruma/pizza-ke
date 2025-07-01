
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the page you're looking for. The page "{location.pathname}" doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Home className="h-4 w-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <Link to="/browse">
            <Button variant="outline" className="w-full">
              <Search className="h-4 w-4 mr-2" />
              Browse Pizzas
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Link to="/vendors" className="text-orange-600 hover:text-orange-700">Restaurants</Link>
            <span>•</span>
            <Link to="/about" className="text-orange-600 hover:text-orange-700">About</Link>
            <span>•</span>
            <Link to="/contact" className="text-orange-600 hover:text-orange-700">Contact</Link>
            <span>•</span>
            <Link to="/blogs" className="text-orange-600 hover:text-orange-700">Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
