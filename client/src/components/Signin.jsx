import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z, ZodError } from "zod";
import makeRequest from "@/utils/makeRequest";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
function Signin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { token, loading: authLoading, signin } = useAuth();

  useEffect(() => {
    if (token && !authLoading) {
      navigate("/");
    }
  }, [authLoading, navigate, token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: "", password: "" });
    try {
      schema.parse(data);
      const response = await makeRequest(
        "POST",
        "https://blog-lwf2.onrender.com/api/auth/signin",
        data,
        {},
        setLoading
      );

      if (response.status === 200) {
        signin(response.data.user, response.data.token);
        toast.success("Signed In Successfully", {
          action: {
            label: "Undo",
          },
        });
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          setError((prevError) => ({
            ...prevError,
            [err.path[0]]: err.message,
          }));
        });
      } else {
        console.error("Unexpected error:", error);
        toast.error(error.response?.data?.message || "Error signing in", {
          action: {
            label: "Undo",
          },
        });
      }
    }
  };
  return (
    <div className="flex mx-2 sm:w-[400px] sm:mx-auto">
      <main className="flex-1 py-12">
        <div className="rounded-lg bg-background p-6 shadow-sm border border-gray-300">
          <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={data.email}
                onChange={handleChange}
              />
              {error && <p className="text-red-500">{error.email}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={data.password}
                onChange={handleChange}
              />
              {error && <p className="text-red-500">{error.password}</p>}
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signin;
