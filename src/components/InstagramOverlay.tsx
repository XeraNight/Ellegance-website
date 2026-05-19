"use client";
import React, { useState } from 'react';

interface InstagramOverlayProps {
  imageSrc: string;
  mode?: "feed" | "reels";
}

export default function InstagramOverlay({ imageSrc, mode = "feed" }: InstagramOverlayProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(138);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  if (mode === "reels") {
    return (
      <div className="absolute inset-0 flex flex-col justify-between text-white pb-8 pt-6 px-4 font-sans pointer-events-auto" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 15%, transparent 80%, rgba(0,0,0,0.6) 100%)' }}>
        {/* Top Header */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 bg-black flex items-center justify-center">
              <img src="/images/ellegance_logo_full.png" alt="Profile" className="w-[80%] h-[80%] object-contain" />
            </div>
            <span className="text-[13px] font-semibold text-white drop-shadow-md tracking-wide">tk_ellegance</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-[11px] font-semibold tracking-wider">Sledovať</button>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-end pr-1">
            {/* Action Bar (Right side) */}
            <div className="flex flex-col items-center gap-5 drop-shadow-lg mb-2">
              <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={handleLike}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill={isLiked ? "#ff3040" : "none"} stroke={isLiked ? "#ff3040" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform active:scale-75 ${isLiked ? 'scale-110' : ''}`}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  <span className="text-[11px] font-medium">{likes}</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  <span className="text-[11px] font-medium">23</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="flex flex-col gap-1 pr-12 drop-shadow-md">
              <span className="text-[13px] leading-snug">
                  <span className="font-bold mr-2">tk_ellegance</span>
                  Paul Miqulescu & Anastasiia na parkete! 💃🕺 Nesmierna energia na Grand Prix. <span className="text-gold-500">#tkellegance #košice #dance</span>
              </span>
          </div>
          
          {/* Music */}
          <div className="flex items-center gap-2 drop-shadow-md overflow-hidden whitespace-nowrap mt-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              <span className="text-[11px] font-medium">Pôvodné audio • TK Ellegance</span>
          </div>
        </div>
      </div>
    );
  }

  // Feed Mode
  return (
    <div className="absolute inset-0 w-full h-full bg-black text-white flex flex-col font-sans z-20 pointer-events-auto">
      {/* App Header (simulated navigation) */}
      <div className="flex items-center gap-4 px-4 py-2 mt-3 border-b border-white/10">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
         <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Príspevky</span>
            <span className="text-sm font-bold">tk_ellegance</span>
         </div>
         <div className="w-6" />
      </div>

      {/* Post Header */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-900 border border-white/10 flex items-center justify-center p-1">
             <img src="/images/ellegance_logo_full.png" alt="Profile" className="w-full h-full object-contain" />
          </div>
          <span className="text-[13px] font-semibold tracking-tight">tk_ellegance</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </div>

      {/* Post Image */}
      <div className="w-full aspect-[4/5] bg-zinc-900 relative flex-shrink-0">
         <img src={imageSrc} alt="Post content" className="w-full h-full object-cover" />
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-4">
           {/* Heart */}
           <svg onClick={handleLike} className={`cursor-pointer transition-transform active:scale-75 ${isLiked ? 'scale-110' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "#ff3040" : "none"} stroke={isLiked ? "#ff3040" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
           {/* Comment */}
           <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
           {/* Send */}
           <svg className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
        {/* Bookmark */}
        <svg onClick={handleSave} className={`cursor-pointer transition-transform active:scale-75 ${isSaved ? 'scale-110' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      </div>

      {/* Likes */}
      <div className="px-3 text-[13px] font-semibold mb-1">
        Páči sa to používateľovi _d.krajcar_ a {likes} ďalším
      </div>

      {/* Caption */}
      <div className="px-3 text-[13px] leading-tight">
        <span className="font-semibold mr-1">tk_ellegance</span>
        <span>Paul Miqulescu & Anastasiia! 💃🕺 Nesmierna energia na parkete. <span className="text-blue-400">#tkellegance #košice</span></span>
      </div>
      
      {/* Time */}
      <div className="px-3 text-[10px] text-gray-500 mt-2 uppercase font-medium">
        Pred 1 dňom • <span className="text-white capitalize cursor-pointer">Zobraziť preklad</span>
      </div>
    </div>
  );
}
