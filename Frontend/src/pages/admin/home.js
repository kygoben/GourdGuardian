import React from "react";

export default function Home() {

  return (
    <div className="items-center space-y-12 text-center space-x-2">
      <div>
        <text className="text-center text-2xl underline underline-offset-8">
          Jack-O-Lantern Tracker
        </text>
      </div>
      <div className="flex-auto">
        <button className="outline">Event Dashboard</button>
        <button className="outline">Stencil Library</button>
        <button className="outline">Stencil Selection</button>
        <button className="outline">Dashboard</button>
        <button className="outline">Dashboard</button>
        <button className="outline">Dashboard</button>
      </div>
    </div>
  );
}
