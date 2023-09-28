import React from "react";
import Link from "next/link";

export default function index() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 bg-cover"
      style={{ backgroundImage: 'url("https://www.reimangardens.com/wp-content/gallery/home/Sycamore-Falls-1.jpg")' }}
    >
      <div className="space-y-4">
        <Link
          href="/volunteer/enterID"
          className="inline-block bg-white py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
        >
          Click here to go to volunteer page
        </Link>
        <Link
          href="/admin/status"
          className="inline-block bg-white py-2 px-4 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
        >
          Click here to go to admin page
        </Link>
      </div>
    </div>
  );
}
