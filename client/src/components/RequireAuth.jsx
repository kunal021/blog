/* eslint-disable react/prop-types */
import { useAuth } from "@/context";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!token && !loading) {
      navigate("/unauthorized");
    }
  }, [loading, navigate, token]);

  if (loading) {
    return (
      <div className="fixed top-10 left-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (token) {
    return children;
  }
}

export default RequireAuth;
