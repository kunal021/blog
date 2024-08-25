import { SquareArrowOutUpRight, SquarePen, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context";

function Navbar() {
  const { token } = useAuth();
  return (
    <div className="flex justify-between items-center px-8 py-3 bg-muted border-b border-b-gray-300">
      <Link
        to={"/"}
        className="text-xl font-semibold text-gray-800 md:text-2xl"
      >
        Blog
      </Link>
      <div className="flex gap-3 scale-[85%] sm:scale-100">
        {token ? (
          <div className="flex gap-3 justify-center items-center">
            <Button variant="outline">
              <Link
                to={"/create"}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Write <SquarePen className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-300 hover:bg-blue-50"
            >
              <Link
                to={"/profile"}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <User className="w-5 h-5" /> Profile
              </Link>
            </Button>
          </div>
        ) : (
          <Button variant="outline">
            <Link
              to={"/signin"}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Sign In <SquareArrowOutUpRight className="w-5 h-5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
