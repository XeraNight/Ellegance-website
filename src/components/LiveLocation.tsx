"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

interface LiveLocationProps {
  defaultCity?: string;
  defaultCountry?: string;
  className?: string;
}

export default function LiveLocation({
  defaultCity = "Košice",
  defaultCountry = "Slovakia",
  className = "",
}: LiveLocationProps) {
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch user's location via IP
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (response.ok) {
          const data = await response.json();
          setLocation({
            city: data.city,
            country: data.country_name,
          });
        }
      } catch (error) {
        console.error("Failed to fetch location:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const displayCity = location?.city || defaultCity;
  const displayCountry = location?.country || defaultCountry;

  return (
    <div className={`flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md w-fit ${className}`}>
      <div className="relative flex items-center justify-center">
        <MapPin className="w-4 h-4 text-gold-500 relative z-10" />
        <span className="absolute w-3 h-3 bg-gold-500 rounded-full animate-ping opacity-50"></span>
      </div>
      
      <div className="text-sm font-sans tracking-widest uppercase">
        {loading ? (
          <span className="text-gray-500">Zisťujem polohu...</span>
        ) : (
          <span className="text-gray-300">
            {displayCity}, <span className="text-white font-semibold">{displayCountry}</span>
          </span>
        )}
      </div>
    </div>
  );
}
