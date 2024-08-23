import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="fixed flex justify-center items-center w-full min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}

export default Loader;
