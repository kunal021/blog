import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/context";

function Signout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signout } = useAuth();

  const handleSignout = () => {
    setLoading(true);
    signout();
    navigate("/signin");
    setLoading(false);
  };
  return (
    <Button
      onClick={handleSignout}
      variant="destructive"
      className="flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          Sign Out <LogOut className="w-5 h-5" />
        </>
      )}
    </Button>
  );
}

export default Signout;
