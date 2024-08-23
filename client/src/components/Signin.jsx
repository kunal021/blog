import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
function Signin() {
  return (
    <div className="flex mx-2 sm:w-[400px] sm:mx-auto">
      <main className="flex-1 py-12">
        <div className="rounded-lg bg-background p-6 shadow-sm border border-gray-300">
          <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
          <form className="space-y-4 ">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Signin
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="#" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signin;
