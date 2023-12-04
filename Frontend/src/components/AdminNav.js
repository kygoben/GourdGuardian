import React from "react";
import ProgressBar from "./ProgressBar";
import { supabase } from "./../../supabaseConnection.js";
import { useRouter } from "next/router";

const Navbar = ({ total, finished, stage, showProgress }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("SignOut Error: ", error);
    else router.reload();
  };

  let bgColor = "";
  switch (stage) {
    case 1:
      bgColor = "bg-white";
      break;
    case 2:
      bgColor = "bg-purple-500";
      break;
    case 3:
      bgColor = "bg-gray-500";
      break;
    case 4:
      bgColor = "bg-indigo-500";
      break;
    default:
      bgColor = "bg-white";
  }

  return (
    <nav className={`p-4 shadow-md ${bgColor} sticky`}>
      <div className="flex justify-between items-center">
          <div className="text-orange-500 font-bold text-3xl tracking-wider">GourdGuardian</div>
          {showProgress && <ProgressBar total={total} finished={finished} className="bg-orange-500 h-5 rounded" />}
    
        <div className="flex space-x-2">
          <a href="/admin/stencil" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">Manage Stencils</a>
          <a href="/admin/select" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">Selection</a>
          <a href="/admin/volunteerControls" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">VolunteerLocks</a>
          <a href="/admin/status" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">Event Management</a>
          <a onClick={handleSignOut} href="/" className="px-3 py-1 rounded-md bg-orange-500 text-white transition-colors hover:bg-brown-700 font-semibold">Logout</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
