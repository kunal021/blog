import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
