import { SquarePen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-3 bg-white border-b border-b-gray-300">
      <Link
        to={"/"}
        className="text-xl font-semibold text-gray-800 md:text-2xl"
      >
        Blog
      </Link>
      <div className="flex gap-3">
        <Button variant="outline">
          <Link
            to={"/create"}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Write <SquarePen className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
