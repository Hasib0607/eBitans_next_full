"use client";
import useTheme from "@/hooks/use-theme";
import React, { useEffect, useState } from "react";
import MobileAppImage from "@/assets/apps-mobile.png";
import ReactQRCode from "react-qr-code";

const MobileAppIcon = () => {
  const { store_id, design } = useTheme();
  //   const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [appUrl, setAppUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://admin.ebitans.com/api/v1/app-status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ store_id }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // console.log("Parsed Response Data:", data);
          // Set the app URL from the API response
          setAppUrl(data.appurl);
        } else {
          //   console.log("Failed to fetch data:", response.status);
        }
      } catch (error) {
        // console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [store_id]);

  // Only render the component if appUrl exists
  if (!appUrl) {
    return null; // Render nothing
  }

  return (
    <div className="sm:container sm:py-10 py-5">
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-5 px-5"
        style={
          {
            "--header-color": design?.header_color,
            "--text-color": design?.text_color,
          } as React.CSSProperties
        }
      >
        {/* Left side: Download Mobile App button */}
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-6xl font-bold mb-2 uppercase tracking-widest">
            Download
          </h2>
          <h2 className="text-xl md:text-4xl font-bold mb-5 md:mb-12 uppercase tracking-wider">
            Our App
          </h2>
          <a
            href={appUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-color)] bg-[var(--header-color)] px-6 md:px-8 py-3 md:text-xl font-bold rounded-md transition"
          >
            Download Now
          </a>
        </div>

        {/* Center: QR Code */}
        <div className="w-full sm:w-1/4 h-64 flex justify-center items-center bg-gradient-to-t from-[#f1593a] to-[#dad8e0] rounded-lg opacity-80 shadow-lg">
          {appUrl ? (
            <ReactQRCode value={appUrl} size={128} className="shadow-xl" />
          ) : (
            <p>Loading QR code...</p>
          )}
        </div>

        {/* Right side: Image */}
        <div className="w-full sm:w-1/4">
          <img
            src={MobileAppImage?.src}
            alt="Mobile App Icon"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileAppIcon;
