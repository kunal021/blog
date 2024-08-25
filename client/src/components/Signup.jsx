import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z, ZodError } from "zod";
import { useEffect, useState } from "react";
import makeRequest from "@/utils/makeRequest";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { token, loading: authLoading } = useAuth();

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
    setError({ name: "", email: "", password: "" });
    try {
      schema.parse(data);
      const response = await makeRequest(
        "POST",
        "https://blog-lwf2.onrender.com/api/auth/signup",
        data,
        {},
        setLoading
      );

      if (response.status === 201) {
        toast.success("Signed Up Successfully", {
          action: {
            label: "Undo",
          },
        });
        navigate("/signin");
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
        toast.error(error.response?.data?.message || "Error signing up", {
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
          <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={data.name}
                onChange={handleChange}
              />
              {error && <p className="text-red-500">{error.name}</p>}
            </div>
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
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
