"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { getAssetPath } from "@/lib/utils";

// ─── Security constants ───────────────────────────────────
/** Allowed course values – prevents arbitrary values being inserted into DB */
const ALLOWED_COURSES = ["svadba", "latinfit", "senior", "ine", "venceky", "vystupenie"] as const;
/** Minimum delay between submissions (ms) – simple client-side rate limiting */
const RATE_LIMIT_MS = 60_000; // 60 seconds
const RATE_LIMIT_KEY = "ellegance_last_contact_submit";
// ─────────────────────────────────────────────────────────

function validateForm(name: string, contact: string, course: string): string | null {
  if (!name.trim() || name.trim().length < 2) return "Meno musí mať aspoň 2 znaky.";
  if (name.length > 100) return "Meno je príliš dlhé (max. 100 znakov).";
  if (!contact.trim() || contact.trim().length < 5) return "Kontakt musí mať aspoň 5 znakov.";
  if (contact.length > 200) return "Kontaktný údaj je príliš dlhý (max. 200 znakov).";
  if (!ALLOWED_COURSES.includes(course as any)) return "Vyberte platnú možnosť kurzu.";
  return null; // valid
}

function checkRateLimit(): string | null {
  try {
    const last = localStorage.getItem(RATE_LIMIT_KEY);
    if (last) {
      const elapsed = Date.now() - parseInt(last, 10);
      if (elapsed < RATE_LIMIT_MS) {
        const remaining = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
        return `Správu môžete odoslať znova za ${remaining} sekúnd.`;
      }
    }
  } catch {
    // localStorage not available (SSR, private mode) — allow submission
  }
  return null;
}

function KontaktForm() {
  const searchParams = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  /** Honeypot field – bots fill this, humans don't */
  const honeypotRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const kurz = searchParams.get("kurz");
    if (kurz) {
      setSelectedCourse(kurz);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // ── Honeypot check: bots fill hidden fields, real users don't
    if (honeypotRef.current?.value) {
      // Silently fake success to confuse bots without revealing detection
      setSuccess(true);
      return;
    }

    // ── Client-side rate limiting
    const rateLimitError = checkRateLimit();
    if (rateLimitError) {
      setError(rateLimitError);
      return;
    }

    // ── Input validation
    const validationError = validateForm(name, contact, selectedCourse);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setSuccess(null);

    try {
      const { error: submitError } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: name.trim().slice(0, 100),
            contact: contact.trim().slice(0, 200),
            course: selectedCourse, // already validated against allowlist above
          },
        ]);

      if (submitError) throw submitError;

      // ── Send email notification on successful DB save (Formspree / Web3Forms)
      try {
        const emailEndpoint = process.env.NEXT_PUBLIC_EMAIL_ENDPOINT || "https://formspree.io/f/mqkrrbyk";
        await fetch(emailEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            contact: contact.trim(),
            course: selectedCourse,
            _subject: `Nová správa z webu Ellegance od ${name.trim()}`,
          }),
        });
      } catch (emailErr) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.warn("[DEV] E-mailová notifikácia zlyhala:", emailErr);
        }
      }

      // Record timestamp for rate limiting
      try { localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString()); } catch {}

      setSuccess(true);
      setName("");
      setContact("");
      setSelectedCourse("");
    } catch (err: unknown) {
      // Do NOT log raw error to console in production – it exposes Supabase internals
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("[DEV] Chyba pri odosielaní formulára:", err);
      }
      setError("Prepáčte, nepodarilo sa nám zapísať vašu požiadavku. Skúste to prosím znova.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background image with blur and dark overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getAssetPath("/images/image.png")} 
          alt="Pozadie" 
          className="w-full h-full object-cover opacity-50 filter blur-[0.5px] scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-40 flex flex-col lg:flex-row gap-16 relative z-20">

        {/* Left Column: Contact Form */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-10 text-center lg:text-left">Napíšte nám</h2>

          <motion.div
            initial={{ rotate: -2, scale: 0.95 }}
            whileHover={{ rotate: 0.5, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative bg-transparent p-4 sm:p-10 md:p-16 overflow-visible origin-center"
          >
            {/* Realistic Paper Backdrop - Now transparent PNG */}
            <div className="absolute -inset-4 sm:-inset-6 md:-inset-10 pointer-events-none z-0">
              <img 
                src={getAssetPath("/images/handmade_paper.png")} 
                alt="Ručne robený papier" 
                className="w-full h-full object-fill pointer-events-none"
              />
            </div>

            <div className="relative z-10 max-w-[340px] md:max-w-[400px] mx-auto pl-5 pr-2 sm:pl-7 sm:pr-3">
              <h1 className="font-serif text-2xl md:text-3.5xl text-[#2a2624] mb-8 text-center border-b border-[#c4b5a9] pb-5 italic">Kontaktný formulár</h1>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-14 h-14 bg-[#e6dfd9] text-[#2a4494] rounded-full flex items-center justify-center mb-5 shadow-sm border border-[#c4b5a9]">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-[#2a2624] mb-3 italic">Správa odoslaná</h3>
                  <p className="font-sans text-xs text-[#8c7e74] max-w-sm leading-relaxed mb-6">
                    Vaša správa bola úspešne odoslaná. Čoskoro vás budeme kontaktovať, aby sme dohodli ďalšie kroky!
                  </p>
                  <button
                    onClick={() => setSuccess(null)}
                    className="btn-gold py-2.5 px-6 rounded-full font-serif text-xs italic tracking-wider shadow-md"
                  >
                    Poslať ďalšiu správu
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                  {/* ── Honeypot field: hidden from real users, bots fill it ── */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <label htmlFor="hp_website">Website</label>
                    <input
                      id="hp_website"
                      name="website"
                      type="text"
                      ref={honeypotRef}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Field 1: Name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-nunito text-[9px] uppercase tracking-[0.3em] text-[#8c7e74] font-bold">1. Vaše meno a priezvisko</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Meno a priezvisko..."
                      className="w-full bg-transparent border-b-2 border-dotted border-[#c4b5a9] py-1.5 px-1 text-lg font-handwriting text-[#2a4494] placeholder-[#c4b5a9]/50 focus:border-[#d4af37] focus:outline-none transition-all"
                      required
                      maxLength={100}
                      autoComplete="name"
                      disabled={loading}
                    />
                  </div>

                  {/* Field 2: Contact */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact" className="font-nunito text-[9px] uppercase tracking-[0.3em] text-[#8c7e74] font-bold">2. E-mail alebo telefónne číslo</label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Váš e-mail alebo telefón..."
                      className="w-full bg-transparent border-b-2 border-dotted border-[#c4b5a9] py-1.5 px-1 text-lg font-handwriting text-[#2a4494] placeholder-[#c4b5a9]/50 focus:border-[#d4af37] focus:outline-none transition-all"
                      required
                      maxLength={200}
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>

                  {/* Field 3: Course Selection */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="course" className="font-nunito text-[9px] uppercase tracking-[0.3em] text-[#8c7e74] font-bold">3. Vyberte kurz alebo službu</label>
                    <select
                      id="course"
                      name="course"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full bg-transparent border-b-2 border-dotted border-[#c4b5a9] py-1.5 px-1 text-base font-handwriting text-[#2a4494] focus:border-[#d4af37] focus:outline-none appearance-none cursor-pointer"
                      required
                      disabled={loading}
                    >
                      <option value="" disabled className="font-sans text-xs">Vyberte možnosť...</option>
                      <option value="svadba" className="font-sans text-xs">Svadobný tanec</option>
                      <option value="latinfit" className="font-sans text-xs">Latin Fit</option>
                      <option value="senior" className="font-sans text-xs">Spoločenské tance pre seniorov</option>
                      <option value="ine" className="font-sans text-xs">Iná požiadavka...</option>
                      <option value="venceky" className="font-sans text-xs">Venčekové slávnosti</option>
                      <option value="vystupenie" className="font-sans text-xs">Tanečné vystúpenie</option>
                    </select>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 font-sans text-xxs text-center font-bold"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit Button - Now centered and refined */}
                  <div className="mt-4 flex justify-center">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      whileHover={{ scale: 1.02 }}
                      type="submit"
                      className="btn-gold py-2.5 px-8 rounded-full font-serif text-sm italic tracking-wider shadow-md disabled:opacity-55 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? "Odosielam..." : "Odoslať správu"}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Info & Exact Contacts */}
        <div className="w-full lg:w-[45%] flex flex-col gap-10 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>

          <div className="bg-black p-8 rounded-3xl border border-gold-500/30 shadow-[0_0_40px_rgba(212,175,55,0.05)]">
            <h3 className="font-serif text-2xl text-white mb-8 border-b border-gold-500/10 pb-4">Spojte sa s nami</h3>

            <div className="flex flex-col gap-8 font-sans">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gold-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Adresa klubu</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">Tanečný klub Ellegance<br />Fejova 1, 040 01 Košice</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-gold-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Telefónne kontakty</h4>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-400 flex justify-between gap-4"><span>Verejnosť:</span> <span className="text-gold-400 font-mono">0902 529 395</span></p>
                    <p className="text-sm text-gray-400 flex justify-between gap-4"><span>Súťažný tanec:</span> <span className="text-gold-400 font-mono">0915 949 727</span></p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 text-gold-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">E-mail</h4>
                  <p className="text-sm text-gray-400 font-light underline decoration-gold-500/30 underline-offset-4">info@tkellegance.sk</p>
                </div>
              </div>

              {/* Billing Info Section */}
              <div className="pt-6 border-t border-gold-500/10 flex flex-col gap-4">
                <h4 className="text-white/40 font-bold text-[9px] uppercase tracking-[0.3em] mb-2">Fakturačné údaje</h4>
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-sm text-gray-400 flex justify-between gap-4 italic"><span className="font-serif">IČO:</span> <span className="text-gray-300">42096456</span></p>
                  <p className="text-sm text-gray-400 flex justify-between gap-4 italic"><span className="font-serif">DIČ:</span> <span className="text-gray-300">2022417144</span></p>
                  <p className="text-sm text-gray-400 flex justify-between gap-4 italic"><span className="font-serif">IČ DPH:</span> <span className="text-gray-300">SK2022417144</span></p>
                  <p className="text-[13px] text-gray-400 flex flex-col md:flex-row md:justify-between gap-1 md:gap-4 italic mt-2">
                    <span className="font-serif">IBAN:</span>
                    <span className="text-gold-500/80 font-mono text-[11px] md:text-xs">SK60 0200 0000 0023 4422 7355</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default function KontaktPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black text-gold-500">
        Načítavam...
      </div>
    }>
      <KontaktForm />
    </Suspense>
  );
}
