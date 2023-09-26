import React, { useEffect, useState } from "react";
import { supabase } from "./../../supabaseConnection.js";

function Viewer({ stencilId, showPdf }) {
  const [pdfUrl, setPdfUrl] = useState(null);


  const fetchPdf = async () => {
    console.log("Fetching PDF for stencilId:", stencilId);
    try {
      const { data, error } = await supabase.storage
        .from("stencils")
        .createSignedUrl(`${stencilId}.pdf`, 60);

      console.log("data:", data);
      if (error) {
        throw error;
      }

      setPdfUrl(data?.signedUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div
        onMouseEnter={fetchPdf}
        onMouseLeave={() => setPdfUrl(null)}
        className="flex items-center justify-center"
      >
        {stencilId}
      </div>
      {pdfUrl && showPdf && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <object
            data={pdfUrl}
            type="application/pdf"
            width="70%"
            height="80%"
            className="mx-auto"
          >
            <a href={pdfUrl}>Download the PDF</a>
          </object>
        </div>
      )}
    </>
  );
}

export default Viewer;
