import React from "react";
import ProgressBar from "./ProgressBar";
import { supabase } from "./../../supabaseConnection.js";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("SignOut Error: ", error);
    else router.reload();
  };

  return (
    <div className="bg-white p-4 shadow-md">
      <div className="flex justify-between ">
        <div className="flex items-center space-x-4">
          <div className="text-orange-500 font-bold text-3xl tracking-wider">GourdGuardian</div>
          <ProgressBar className="bg-yellow-800 h-2 rounded-full" />
        </div>
        <div className="flex space-x-2">
          <a href="/admin/volunteerControls" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">VolunteerLocks</a>
          <a href="/admin/status" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">Status</a>
          <a onClick={handleSignOut} href="/" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
