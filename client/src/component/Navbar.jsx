import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

function Navbar() {
  const navigator = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => navigator("/")}
      />

      {user ? (
        <div className="scale-150 my-3">
          <UserButton />
        </div>
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-black text-white py-2.5 px-10"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
