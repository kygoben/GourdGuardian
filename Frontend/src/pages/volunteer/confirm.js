import { useRouter } from "next/router";
import React from "react";
import PumpkinData from "@/components/Pumpkin";

export function confirm() {
  const router = useRouter();

  const callAPI = async () => {
    router.push({
      pathname: "/volunteer/pumpkinData",
      query: router.query,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-500"> {/* Changed background color to orange */}
      <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg">
        <PumpkinData
          title={router.query.title}
          sid={router.query.sid}
          category={router.query.category}
          extras={router.query.extras}
        />
        <div className="text-black text-lg my-2 text-center">Is this your stencil?</div>
        <button
          className="text-2xl bg-orange-700 text-white rounded-2xl cursor-pointer my-2 px-8 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
          onClick={callAPI}
        >
          Confirm
        </button>
        <a href="/volunteer/enterID">
          <button className="text-2xl border border-black bg-white text-black rounded-2xl cursor-pointer my-2 px-8 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
            Go Back
          </button>
        </a>
      </div>
    </div>
  );
}

export default confirm;
