import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/landingPage.module.css";
import SignInPrompt from "@/components/VolunteerSignInPrompt";
import { useState, useEffect } from "react";
import Navbar from "@/components/AdminNav";
import Filters from "@/components/Filters";
import StatusData from "@/components/StatusData";
import SearchBar from "@/components/SearchBar";

export default function landingPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="display: flex">
        <Filters />
        <div className="display: flex, flex-direction: column">
          <SearchBar />
          <StatusData />
        </div>
      </div>
    </>
  );
}
