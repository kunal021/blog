import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex justify-center items-center min-h-[80vh] w-full">
      <div className="flex flex-col gap-5 m-5">
        <p className="text-xl md:text-3xl font-bold text-center">
          Authorization Needed
        </p>
        <p>You are not authorized to acces this page</p>
        <div className="flex justify-around">
          <div>
            Please{" "}
            <Link to="/signin" className="text-blue-500 underline">
              Sign In
            </Link>{" "}
            <span className="font-semibold">OR</span>{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Sign Up
            </Link>{" "}
            to continue
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
