import React, { useState, useRef } from "react";
import { supabase } from "./../../supabaseConnection.js";

function Viewer({ stencilId, showPdf }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const lastFetchedStencilRef = useRef(null);
  const fetchTimeoutRef = useRef(null);

  const fetchPdf = async (currentStencilId) => {
    console.log("Fetching PDF for stencilId:", currentStencilId);
    try {
      const { data, error } = await supabase.storage
        .from("stencils")
        .createSignedUrl(`${currentStencilId}.pdf`, 60);

      if (lastFetchedStencilRef.current !== currentStencilId) {
        return;
      }

      if (error) {
        throw error;
      }

      setPdfUrl(data?.signedUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMouseEnter = () => {
    lastFetchedStencilRef.current = stencilId;
    fetchTimeoutRef.current = setTimeout(() => fetchPdf(stencilId), 150);
  };

  const handleMouseLeave = () => {
    clearTimeout(fetchTimeoutRef.current);
    setPdfUrl(null);
    lastFetchedStencilRef.current = null;
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex items-center justify-center"
      >
        {stencilId}
      </div>
      {pdfUrl && showPdf && (
        <div
          className="fixed bottom-0 left-0 flex items-center justify-start"
          style={{ zIndex: 1000 }}
        >
          <iframe
            src={`${pdfUrl}#zoom=10`}
            width="225vw"
            height="320vh"
            style={{ border: "none" }}
          ></iframe>
        </div>
      )}
    </>
  );
}

export default Viewer;
