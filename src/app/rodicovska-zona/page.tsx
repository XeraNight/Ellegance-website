"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { 
  Sparkles, 
  Plus, 
  ShoppingBag, 
  BookOpen, 
  AlertCircle, 
  Check, 
  ChevronDown, 
  Phone, 
  Tag, 
  HelpCircle,
  Eye,
  Upload,
  ShieldCheck,
  Trophy,
  Clock,
  Calendar,
  ClipboardList,
  Trash2
} from "lucide-react";

import {
  sanitizeText,
  isValidContact,
  isValidPrice,
  validateImageFile,
  checkRateLimit,
  formatRemainingTime,
  recordFormOpenTime,
  isHumanInteractionTime,
} from "@/lib/security";

// Mock data for grooming instructions
const GROOMING_GUIDES = [
  {
    id: "girls-hair",
    category: "Dievčatá",
    title: "Súťažný drdol krok za krokom",
    subtitle: "Dokonalý a extrémne pevný účes, ktorý prežije celý súťažný deň.",
    difficulty: "Stredná",
    time: "25 minút",
    image: "/images/girls_dance_bun.png",
    materials: [
      "Hrebeň s úzkou špičkou a kefu s diviačími štetinami",
      "Pevné elastické gumičky (2ks vo farbe vlasov)",
      "Vlásenky (pinetky) a sponky",
      "Jemnú sieťku na drdol (neviditeľnú)",
      "Extrémne silný gél na vlasy (napr. Got2b Glued) a silný lak"
    ],
    steps: [
      "Vlasy dôkladne prečešte a naneste dostatočné množstvo gélu od korienkov ku končekom.",
      "Pomocou kefy začešte vlasy do hladkého a pevného chvosta. Výška chvosta závisí od kategórie (všeobecne na úrovni temena). Zafixujte gumičkou.",
      "Uistite sa, že nikde neodstávajú žiadne 'kopčeky'. Prípadné nerovnosti uhlaďte hrebeňom so špičkou.",
      "Z chvosta zatočte pevný prameň a omotajte ho okolo gumičky. Každú otočku zafixujte vlásenkami zasunutými smerom do stredu drdola.",
      "Cez hotový drdol pretiahnite jemnú sieťku a upevnite ju ďalšími sponkami.",
      "Celý účes dôkladne prestriekajte silným lakom na vlasy a uhlaďte prípadné odstávajúce jemné vlásky."
    ],
    proTip: "Drdol češte na vlhké vlasy – gél sa do nich lepšie zapracuje a účes bude dokonale hladký bez lesklých šupín."
  },
  {
    id: "boys-style",
    category: "Chlapci",
    title: "Súťažný chlapčenský styling",
    subtitle: "Uhladený, elegantný a mužný vzhľad, ktorý drží tvar pri každom otočení.",
    difficulty: "Jednoduchá",
    time: "10 minút",
    image: "/images/boys_dance_hair.png",
    materials: [
      "Hrebeň s jemnými zubami",
      "Profesionálny lesklý gél alebo pomáda s vysokou fixáciou",
      "Lak na vlasy na finálnu fixáciu"
    ],
    steps: [
      "Vlasy mierne navlhčite rozprašovačom.",
      "Rozotrite v dlanich primerané množstvo pomády alebo lesklého gélu a rovnomerne votrite do vlasov.",
      "Vytvorte presnú a čistú cestičku na boku pomocou hrebeňa (odporúča sa zarovnať s vnútorným kútikom oka).",
      "Vlasy začešte smerom dozadu a nabok, boky uhlaďte tesne k hlave.",
      "Prednú vlnu môžete mierne nadvihnúť pre modernejší 'pompadour' vzhľad.",
      "Účes zafixujte lakom z bezpečnej vzdialenosti."
    ],
    proTip: "Vyhnite sa matným voskom. Na parkete pod silnými svetlami vyzerajú najlepšie gély s vysokým leskom (mokrý efekt)."
  },
  {
    id: "dress-rules",
    category: "Pravidlá",
    title: "Pravidlá oblečenia SZTŠ (Deti & Juniori)",
    subtitle: "Dôležité obmedzenia pre detské kategórie, aby ste sa vyhli diskvalifikácii.",
    difficulty: "Dôležité",
    time: "Čítanie: 5 min",
    image: "/images/children_dance_outfit.png",
    materials: [
      "Oficiálna kniha pravidiel SZTŠ",
      "Súťažný poriadok"
    ],
    steps: [
      "Deti I a Deti II (do 11 rokov): Oblečenie musí byť zjednotené, jednofarebné a bez akýchkoľvek ozdôb (žiadne kamienky, flitre, pierka, lesklá čipka či kovové aplikácie).",
      "Materiály a farby dievčenských šiat: Povolené sú iba bežné elastické materiály (lycra, zamat, satén, krep). Vzory, sieťovina (mesh) a čipka sú u detí zakázané. Telová sieťka (nude mesh) na trupe je prísne zakázaná.",
      "Strih šiat a dĺžka sukne: Sukňa musí byť celá z jedného druhu materiálu a rovnakej farby, dĺžka nesmie byť kratšia ako 10 cm nad stredom kolena a dlhšia ako tesne pod koleno. Nesmie odhaľovať spodnú bielizeň.",
      "Dievčenská obuv a podpätky: Dievčatá v detských kategóriách môžu tancovať výhradne v topánkach s hrubým kockovým podpätkom (block heel) s maximálnou výškou 3.5 cm. Ihličkové alebo úzke podpätky sú zakázané.",
      "Chlapčenské oblečenie: Biela hladká košeľa alebo bavlnené body s dlhým rukávom (nesmie byť z lesklého saténu či priesvitného materiálu) + čierne matné nohavice klasického strihu (žiadne lampasy/lesklé bočné pásy) + čierne ponožky a čierne tanečné topánky.",
      "Motýlik / kravata pre chlapcov: U detských kategórií je povinný čierny saténový motýlik. U juniorov je povolená aj klasická čierna kravata.",
      "Líčenie, účesy a šperky: U kategórií Deti je akýkoľvek make-up, lak na nechty, samoopaľovací krém alebo trblietky prísne zakázané."
    ],
    proTip: "Pred súťažou si vždy skontrolujte aktuálne znenie pravidiel SZTŠ a neváhajte sa spýtať či poradiť s inými skúsenými rodičami v klube – radi vám pomôžu s drobnými detailmi a praktickými radami, ktoré už sami zažili."
  }
];

interface BazaarItem {
  id: string;
  title: string;
  size: string;
  price: string;
  condition: string;
  contact: string;
  image: string;
  category: string;
  description: string;
}

export default function RodicovskaZonaPage() {
  const [activeGuide, setActiveGuide] = useState<string | null>("girls-hair");
  const [bazaarItems, setBazaarItems] = useState<BazaarItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New listing state
  const [newTitle, setNewTitle] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentPin, setParentPin] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  // Security and upload states
  const [newImage, setNewImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationValue, setVerificationValue] = useState<number>(0);
  const [honeypotValue, setHoneypotValue] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const formOpenedAtRef = useRef<number>(0);

  // Deletion states
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePhoneOrEmail, setDeletePhoneOrEmail] = useState("");
  const [deletePin, setDeletePin] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const getBazaarItemImage = (imagePath: string | null | undefined) => {
    if (!imagePath) {
      return getAssetPath("/images/bazaar_dance_shoes.png");
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return getAssetPath(imagePath);
  };

  useEffect(() => {
    fetchBazaarItems();
  }, []);

  const fetchBazaarItems = async () => {
    try {
      const { data, error } = await supabase
        .from("bazaar_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bazaar items:", error);
        return;
      }

      if (data) {
        const mappedItems = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          size: item.size,
          price: item.price,
          condition: item.condition,
          contact: item.contact,
          image: item.image_url,
          category: item.category,
          description: item.description || "",
        }));
        setBazaarItems(mappedItems);
      } else {
        setBazaarItems([]);
      }
    } catch (err) {
      console.error("Exception fetching bazaar items:", err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError("");
    // Full validation: size + MIME type + magic bytes (A05, A08)
    const result = await validateImageFile(file);
    if (!result.valid) {
      setFileError(result.error ?? "Neplatný súbor.");
      e.target.value = ""; // reset input
      return;
    }

    setImageFile(file); // Save real file object for upload

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddInzerat = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // ── Bot protection layer 1: Honeypot (A04) ─────────────────────────
    if (honeypotValue) {
      // Silently simulate success to confuse bots
      setIsAddModalOpen(false);
      return;
    }

    // ── Bot protection layer 2: Timing check (A04) ─────────────────────
    if (!isHumanInteractionTime(formOpenedAtRef.current)) {
      setFormError("Formulár bol odoslaný príliš rýchlo. Prosím, vyplňte ho ručne.");
      return;
    }

    // ── Bot protection layer 3: Consent slider ─────────────────────────
    if (verificationValue < 100) {
      setFormError("Pred odoslaním inzerátu musíte vyjadriť súhlas s podmienkami predaja pomocou posuvníka.");
      return;
    }

    // ── Rate limiting (A01) ─────────────────────────────────────────────
    // const rateCheck = checkRateLimit();
    // if (!rateCheck.allowed) {
    //   const remaining = rateCheck.remainingMs ? formatRemainingTime(rateCheck.remainingMs) : "chvíľu";
    //   setFormError(`Odoslali ste príliš veľa inzerátov. Skúste znova o ${remaining}.`);
    //   return;
    // }

    // ── Input validation (A03 – Injection prevention) ───────────────────
    if (!newTitle.trim() || !newPrice.trim() || !parentPhone.trim() || !parentPin.trim()) {
      setFormError("Vyplňte prosím všetky povinné polia, vrátane telefónneho čísla a klubového PIN kódu.");
      return;
    }

    if (!isValidContact(parentPhone)) {
      setFormError("Telefónne číslo obsahuje nepovolené znaky.");
      return;
    }

    if (!isValidPrice(newPrice)) {
      setFormError("Cena obsahuje nepovolené znaky. Použite iba číslice a symbol €.");
      return;
    }

    // Rate limit check bypassed for development testing

    setIsLoading(true);

    try {
      // ── Supabase verification: check if parent exists with the provided PIN ──
      const { data: parentData, error: parentError } = await supabase
        .from("allowed_parents")
        .select("name, phone")
        .eq("phone", parentPhone.trim())
        .eq("club_pin", parentPin.trim())
        .maybeSingle();

      if (parentError) {
        console.error("Parent verification error:", parentError.message, parentError.details);
        setFormError(`Chyba pri overovaní rodiča: ${parentError.message}`);
        setIsLoading(false);
        return;
      }

      if (!parentData) {
        setFormError("Zadané telefónne číslo alebo klubový PIN kód nie je registrovaný v našej databáze. Overte si kód u trénera.");
        setIsLoading(false);
        return;
      }

      // ── Upload image to Storage bucket bazaar_images ──
      let imageUrl = "/images/bazaar_dance_shoes.png";
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `bazaar-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("bazaar_images")
          .upload(fileName, imageFile, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) {
          console.error("Image upload error:", uploadError);
          setFormError("Nepodarilo sa nahrať fotografiu do úložiska.");
          setIsLoading(false);
          return;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("bazaar_images")
          .getPublicUrl(fileName);
        
        if (publicUrlData) {
          imageUrl = publicUrlData.publicUrl;
        }
      }

      // ── Sanitize all text inputs (XSS – A03) ────────────────────────────
      const priceFormatted = `${sanitizeText(newPrice).replace("€", "").trim()} €`;
      const newItemData = {
        title: sanitizeText(newTitle),
        size: sanitizeText(newSize) || "Nezadaná",
        price: priceFormatted,
        condition: sanitizeText(newCondition) || "Dobrý stav",
        contact: `${parentData.name} (${parentData.phone})`,
        image_url: imageUrl,
        category: sanitizeText(newCategory) || "Iné",
        description: sanitizeText(newDesc) || "Žiadny dodatočný popis.",
        parent_phone: parentData.phone,
      };

      const { error: insertError } = await supabase
        .from("bazaar_items")
        .insert(newItemData);

      if (insertError) {
        console.error("Database insert error:", insertError);
        setFormError("Nepodarilo sa uložiť inzerát do databázy.");
        setIsLoading(false);
        return;
      }

      // Refresh items list dynamically
      await fetchBazaarItems();
      setJustAdded(true);
      setIsLoading(false);

      // Reset form
      setNewTitle("");
      setNewSize("");
      setNewPrice("");
      setNewCondition("");
      setNewCategory("");
      setNewDesc("");
      setNewImage("");
      setImageFile(null);
      setParentPhone("");
      setParentPin("");
      setFileError("");
      setFormError("");
      setVerificationValue(0);
      setHoneypotValue("");

      setTimeout(() => {
        setIsAddModalOpen(false);
        setJustAdded(false);
      }, 1500);
    } catch (err) {
      console.error("Unexpected error in handleAddInzerat:", err);
      setFormError("Nastala neočakávaná chyba pri odosielaní. Skúste znova.");
      setIsLoading(false);
    }
  };

  const handleDeleteInzerat = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError("");

    if (!deleteItemId) return;
    if (!deletePhoneOrEmail.trim() || !deletePin.trim()) {
      setDeleteError("Vyplňte prosím všetky overovacie údaje.");
      return;
    }

    setIsDeleting(true);

    try {
      // 1. Check if admin bypass matches
      const isAdmin1 = deletePhoneOrEmail.trim() === "jakubkalina05@gmail.com" && deletePin.trim() === "4453";
      const isAdmin2 = deletePhoneOrEmail.trim() === "petervidasic@gmail.com" && deletePin.trim() === "8888";
      const isAdmin = isAdmin1 || isAdmin2;

      if (isAdmin) {
        // Admins can delete ANY item!
        const { error: deleteError } = await supabase
          .from("bazaar_items")
          .delete()
          .eq("id", deleteItemId);

        if (deleteError) {
          console.error("Admin delete error:", deleteError);
          setDeleteError("Nepodarilo sa odstrániť inzerát z databázy.");
          setIsDeleting(false);
          return;
        }
      } else {
        // 2. Regular parents - check if registered in whitelist and matches PIN
        const { data: parentData, error: parentError } = await supabase
          .from("allowed_parents")
          .select("phone, name")
          .eq("phone", deletePhoneOrEmail.trim())
          .eq("club_pin", deletePin.trim())
          .maybeSingle();

        if (parentError) {
          console.error("Verification error:", parentError);
          setDeleteError("Chyba pri overovaní. Skúste to znova.");
          setIsDeleting(false);
          return;
        }

        if (!parentData) {
          setDeleteError("Zadané telefónne číslo alebo PIN kód nie je registrovaný.");
          setIsDeleting(false);
          return;
        }

        // Verify if this item belongs to this parent
        const { data: itemData, error: itemFetchError } = await supabase
          .from("bazaar_items")
          .select("parent_phone")
          .eq("id", deleteItemId)
          .maybeSingle();

        if (itemFetchError || !itemData) {
          setDeleteError("Inzerát sa nenašiel.");
          setIsDeleting(false);
          return;
        }

        if (itemData.parent_phone !== parentData.phone) {
          setDeleteError("Nemáte oprávnenie odstrániť tento inzerát. Môžete odstraňovať iba vlastné inzeráty.");
          setIsDeleting(false);
          return;
        }

        // Proceed to delete
        const { error: deleteError } = await supabase
          .from("bazaar_items")
          .delete()
          .eq("id", deleteItemId);

        if (deleteError) {
          console.error("Delete error:", deleteError);
          setDeleteError("Nepodarilo sa vymazať inzerát.");
          setIsDeleting(false);
          return;
        }
      }

      // Refresh list
      await fetchBazaarItems();

      // Cleanup and close
      setIsDeleteModalOpen(false);
      setDeleteItemId(null);
      setDeletePhoneOrEmail("");
      setDeletePin("");
      setDeleteError("");
      setIsDeleting(false);
    } catch (err) {
      console.error("Unexpected delete error:", err);
      setDeleteError("Nastala neočakávaná chyba.");
      setIsDeleting(false);
    }
  };

  const filteredItems = bazaarItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.size.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-12 sm:pb-24 bg-obsidian-900 relative overflow-hidden selection:bg-gold-500/30">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-black mb-3 block">
            Pre rodičov našich talentov
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Zóna pre <span className="text-gold-500 font-light italic">rodičov</span>
          </h1>
          <p className="text-zinc-300 text-sm font-light leading-relaxed">
            Praktické návody pre prípravu mladých tanečníkov na súťaže a bezpečný klubový bazár pre výmenu oblečenia a topánok.
          </p>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-6"></div>
        </div>

        {/* Section 1: Grooming and Dress Instructions */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif text-white font-bold">Návody a súťažná vizáž</h2>
              <p className="text-zinc-400 text-xs font-light">Ako správne pripraviť dieťa na tanečný parket</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Guide Selectors */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {GROOMING_GUIDES.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setActiveGuide(guide.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-1.5 ${
                    activeGuide === guide.id 
                      ? "bg-gradient-to-br from-gold-500/[0.06] via-gold-500/[0.02] to-transparent border-gold-500/30 shadow-[0_4px_20px_rgba(212,175,55,0.05)]" 
                      : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                  }`}
                >
                  <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full w-fit ${
                    guide.category === "Dievčatá" ? "bg-pink-500/10 text-pink-400" :
                    guide.category === "Chlapci" ? "bg-blue-500/10 text-blue-400" : "bg-gold-500/10 text-gold-500"
                  }`}>
                    {guide.category}
                  </span>
                  <h3 className={`font-serif text-sm font-bold transition-colors ${activeGuide === guide.id ? "text-gold-500" : "text-white"}`}>
                    {guide.title}
                  </h3>
                  <p className="text-zinc-400 text-xs font-light line-clamp-2 leading-relaxed">
                    {guide.subtitle}
                  </p>
                </button>
              ))}
            </div>

            {/* Guide Detail Display */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {GROOMING_GUIDES.map((guide) => {
                  if (guide.id !== activeGuide) return null;
                  return (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 md:p-8 rounded-3xl border border-white/10 bg-obsidian-950/40 backdrop-blur-md shadow-2xl space-y-6 text-left"
                    >
                      <div className="border-b border-white/5 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">{guide.title}</h3>
                          <p className="text-gold-500/80 text-xs font-light tracking-wide">{guide.subtitle}</p>
                        </div>
                        <div className="flex gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                          <span className="bg-white/5 border border-white/10 text-zinc-300 px-3 py-1.5 rounded-full shrink-0">Obtiažnosť: {guide.difficulty}</span>
                          <span className="bg-white/5 border border-white/10 text-zinc-300 px-3 py-1.5 rounded-full shrink-0">Čas: {guide.time}</span>
                        </div>
                      </div>

                      {/* Steps list & Image Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
                        {/* Steps list Left */}
                        <div className="md:col-span-8 space-y-4">
                          <h4 className="text-white text-xs font-bold uppercase tracking-widest">Postup práce:</h4>
                          <div className="space-y-3">
                            {guide.steps.map((step, i) => (
                              <div key={i} className="flex gap-4 items-start p-3 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
                                <span className="w-6 h-6 shrink-0 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center font-mono text-[10px] font-bold text-gold-400">
                                  {i + 1}
                                </span>
                                <p className="text-sm text-zinc-200 leading-relaxed font-light">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Image Right */}
                        <div className="md:col-span-4 space-y-3">
                          <h4 className="text-white text-xs font-bold uppercase tracking-widest">Vizuálna ukážka:</h4>
                          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-obsidian-950">
                            <img 
                              src={getAssetPath(guide.image)} 
                              alt={guide.title} 
                              className="w-full h-full object-cover filter brightness-95 hover:scale-105 hover:brightness-100 transition-all duration-500" 
                            />
                          </div>
                          <span className="text-[10px] md:text-xs text-zinc-400 text-center block italic">Vzorový vzhľad podľa pravidiel SZTŠ</span>
                        </div>
                      </div>

                      {/* Pro Tip */}
                      <div className="p-4 rounded-2xl border border-gold-500/20 bg-gold-500/[0.02] flex gap-3.5 items-start mt-4">
                        <AlertCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-gold-500 text-[10px] font-black uppercase tracking-widest block mb-0.5">Trénerský Pro Tip:</span>
                          <p className="text-gray-300 text-xs leading-relaxed font-light">{guide.proTip}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Section 2: Súťažný manuál & Organizačné pokyny */}
        <section className="mb-24 text-left">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-500">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-serif text-white font-bold">Súťažný sprievodca pre rodičov</h2>
              <p className="text-zinc-400 text-xs font-light">Všetko, čo potrebujete vedieť o prihlasovaní a priebehu súťažného dňa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Column 1: Prihlasovanie na súťaže */}
            <div className="lg:col-span-6 flex flex-col p-6 md:p-8 rounded-3xl border border-white/10 bg-obsidian-950/40 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2 rounded-xl bg-gold-500/10 text-gold-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Prihlasovanie na súťaže</h3>
                  <p className="text-gold-500/80 text-[11px] md:text-xs uppercase tracking-wider font-bold">Oficiálny klubový proces</p>
                </div>
              </div>

              {/* CRITICAL ATTENTION WARNING */}
              <div className="p-4 rounded-2xl border border-gold-500/20 bg-gold-500/[0.02] flex gap-3.5 items-start">
                <AlertCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gold-500 text-xs font-black uppercase tracking-widest block mb-1">Dôležité upozornenie:</span>
                  <p className="text-gray-200 text-xs leading-relaxed font-normal">
                    Deti na všetky súťaže <strong>prihlasuje výhradne hlavný tréner</strong> ako oficiálny a licencovaný zástupca klubu. Rodičia neprihlasujú deti individuálne.
                  </p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <h4 className="text-white text-xs font-bold uppercase tracking-widest">Ako prebieha registrácia:</h4>
                
                <div className="space-y-3">
                  <div className="flex gap-4 items-start p-3 rounded-2xl bg-white/[0.01] border border-white/5">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center font-mono text-[10px] font-bold text-gold-400">1</span>
                    <div>
                      <h5 className="text-white text-sm font-bold mb-1">Vzájomná dohoda a nahlásenie</h5>
                      <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light">Rodič aktívne osloví trénera s predstihom, prípadne tréner sám kontaktuje rodičov detí s návrhom, aby sa spoločne skoordinovali, kto má záujem a je výkonnostne pripravený súťažiť.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-3 rounded-2xl bg-white/[0.01] border border-white/5">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center font-mono text-[10px] font-bold text-gold-400">2</span>
                    <div>
                      <h5 className="text-white text-sm font-bold mb-1">Potvrdenie (Rodič)</h5>
                      <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light">Rodič definitívne potvrdí účasť a nahlási potrebné údaje (výkonnostná trieda, veková kategória a mená páru/dieťaťa) trénerovi do stanoveného interného termínu (deadline). <strong>Štartovné sa neplatí vopred nášmu klubu, ale hradí sa až priamo na mieste konania súťaže pri registračnom stolíku usporiadateľského klubu (kde preberáte aj štartové číslo). Táto platba je úplne oddelená od bežných vstupeniek pre divákov.</strong></p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-3 rounded-2xl bg-white/[0.01] border border-white/5">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center font-mono text-[10px] font-bold text-gold-400">3</span>
                    <div>
                      <h5 className="text-white text-sm font-bold mb-1">Oficiálna registrácia (Klub)</h5>
                      <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light">Tréner ako splnomocnený zástupca tanečného klubu Ellegance vykoná hromadnú registráciu detí cez oficiálny portál SZTŠ.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Správanie na súťažiach & Checklist */}
            <div className="lg:col-span-6 flex flex-col p-6 md:p-8 rounded-3xl border border-white/10 bg-obsidian-950/40 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2 rounded-xl bg-gold-500/10 text-gold-500">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Súťažný deň & Etiketa</h3>
                  <p className="text-gold-500/80 text-[11px] md:text-xs uppercase tracking-wider font-bold">Kódex správania a harmonogram</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <h4 className="text-white text-xs font-bold uppercase tracking-widest">Časový plán a príchod:</h4>
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-gold-400 font-bold">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Príchod: 1.5 až 2 hodiny vopred</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-light">
                    Na miesto konania dorazte s dostatočným predstihom. Tento čas je nevyhnutný na vyzdvihnutie štartovného čísla, rozcvičenie, doladenie účesov, oblečenia a aklimatizáciu dieťaťa v súťažnej hale.
                  </p>
                </div>

                <h4 className="text-white text-xs font-bold uppercase tracking-widest pt-2">Ako sa správať na súťaži:</h4>
                <div className="space-y-3 text-sm text-gray-300 font-light leading-relaxed">
                  <div className="flex gap-2">
                    <span className="text-gold-500 font-bold">✓</span>
                    <p><strong>Dôvera a rešpekt k trénerovi:</strong> Upozorňujeme, že pokiaľ je tréner na súťaži nominovaný ako oficiálny porotca SZTŠ, podľa prísnych pravidiel zväzu <em>nesmie počas svojej rozhodcovskej funkcie prísť do žiadneho kontaktu so svojimi zverencami ani im nijako pomáhať/radiť na parkete alebo v zákulisí</em>. V takejto situácii preberajú plnú podporu a logistiku rodičia a tréner musí zachovať absolútnu neutralitu.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gold-500 font-bold">✓</span>
                    <p><strong>Pozitívna atmosféra:</strong> Podpora rodiča je kľúčová. Dieťa by malo ísť na parket s úsmevom a bez stresu z výsledku. Sme jeden tím a reprezentujeme klub Ellegance.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gold-500 font-bold">✓</span>
                    <p><strong>Súťažný checklist:</strong> Vždy majte so sebou rezervné pančuchy/ponožky, pinetky, silný lak na vlasy, zatváracie špendlíky (zicherky) na štartové čísla, dostatok vody a ľahké občerstvenie.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Club Mini-Bazaar Showcase */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-serif text-white font-bold">Klubový minibazár</h2>
                <p className="text-zinc-400 text-xs font-light">Burza súťažného oblečenia a tanečnej obuvi medzi rodičmi</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Hľadať v bazári..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-60 bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2 text-xs font-light text-white focus:outline-none transition-all pl-9"
                />
                <svg className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(true);
                  formOpenedAtRef.current = recordFormOpenTime();
                }}
                className="btn-gold flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Pridať inzerát
              </button>
            </div>
          </div>

          {/* Bazaar Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bazaarItems.length === 0 ? (
              <div className="col-span-full py-20 text-center rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-sm max-w-lg mx-auto w-full">
                <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto mb-4 animate-pulse" />
                <h3 className="font-serif text-lg font-bold text-white mb-2">Aktuálne nie je nič na predaj</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                  Klubový minibazár je momentálne prázdny. Ak máte tanečné oblečenie alebo obuv na posunutie, pridajte prvý inzerát!
                </p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="col-span-full py-16 text-center rounded-2xl border border-white/5 bg-white/[0.01]">
                <HelpCircle className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm font-light">Nenašli sa žiadne inzeráty vyhovujúce filtru.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6 }}
                  className="flex flex-col bg-obsidian-950/40 border border-white/10 rounded-[2rem] overflow-hidden shadow-xl hover:border-gold-500/25 transition-all duration-300 text-left group"
                >
                  {/* Photo area */}
                  <div className="relative aspect-[4/3] bg-obsidian-900 overflow-hidden border-b border-white/5">
                    <img
                      src={getBazaarItemImage(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-gold-500">
                      {item.category}
                    </div>
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteItemId(item.id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/30 rounded-full transition-all duration-300"
                      title="Odstrániť inzerát"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-gold-500 text-obsidian-900 px-4 py-1.5 rounded-2xl font-serif text-base font-bold shadow-lg flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" /> {item.price}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif text-base font-bold text-white group-hover:text-gold-500 transition-colors leading-tight line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-zinc-300 text-xs font-light leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Metadata details */}
                    <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-zinc-400">
                      <div className="flex justify-between">
                        <span>Veľkosť:</span>
                        <strong className="text-zinc-200 font-medium">{item.size}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Stav:</span>
                        <strong className="text-zinc-200 font-medium">{item.condition}</strong>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/5 border-dashed text-gold-500">
                        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Kontakt:</span>
                        <strong className="font-mono font-medium">{item.contact}</strong>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

      </div>

      {/* Add Listing Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-obsidian-900 border border-white/10 rounded-[2.25rem] p-6 sm:p-8 shadow-2xl text-left overflow-hidden max-h-[92vh] flex flex-col"
            >
              <h3 className="font-serif text-2xl text-white font-bold mb-1">Pridať inzerát</h3>
              <p className="text-gray-500 text-xs font-light mb-4">Inzerát bude po schválení trénerom pridaný do klubového bazáru.</p>

              {justAdded ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                  <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/30 text-gold-500 rounded-full flex items-center justify-center animate-bounce">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">Inzerát bol odoslaný!</h4>
                  <p className="text-gray-400 text-xs font-light">Práve sme pridali váš inzerát do zoznamu.</p>
                </div>
              ) : (
                <form onSubmit={handleAddInzerat} className="flex flex-col flex-1 overflow-hidden">
                  <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 max-h-[50vh] sm:max-h-[55vh] custom-scrollbar scroll-smooth">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Názov veci *</label>
                      <input
                        type="text"
                        placeholder="napr. Súťažné šaty"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Kategória *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-gold-500/50 focus:outline-none appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled className="bg-obsidian-900 text-gray-400">Vyberte...</option>
                        <option value="Dievčenské šaty" className="bg-obsidian-900">Dievčenské šaty</option>
                        <option value="Chlapčenské oblečenie" className="bg-obsidian-900">Chlapčenské oblečenie</option>
                        <option value="Obuv" className="bg-obsidian-900">Obuv</option>
                        <option value="Tréningové oblečenie" className="bg-obsidian-900">Tréningové oblečenie</option>
                        <option value="Iné" className="bg-obsidian-900">Iné</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Veľkosť *</label>
                      <input
                        type="text"
                        placeholder="napr. 134 alebo 34"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Cena *</label>
                      <input
                        type="text"
                        placeholder="napr. 45€"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Stav *</label>
                      <input
                        type="text"
                        placeholder="napr. Ako nové"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Telefónne číslo rodiča (na overenie) *</label>
                      <input
                        type="text"
                        placeholder="napr. 0903 123 456"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Klubový PIN kód *</label>
                      <input
                        type="password"
                        placeholder="Zadajte 4-miestny PIN"
                        value={parentPin}
                        onChange={(e) => setParentPin(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Fotografia *</label>
                    {newImage ? (
                      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gold-500/30 group">
                        <img src={newImage} alt="Náhľad" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => setNewImage("")}
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2.5 shadow-lg transition-transform hover:scale-110 flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold font-sans"
                          >
                            Odstrániť fotku
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="block relative border border-dashed border-white/20 hover:border-gold-500/40 rounded-2xl p-6 text-center transition-all bg-white/[0.01] hover:bg-white/[0.03] cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          required
                        />
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="w-5 h-5" />
                          </div>
                          <div>
                             <span className="text-[11px] md:text-xs text-gray-300 font-bold block">Nahrať fotku zo zariadenia</span>
                            <span className="text-[10px] md:text-xs text-gray-500 block mt-0.5">Podporované formáty: PNG, JPG, WEBP (max. 5MB)</span>
                          </div>
                        </div>
                      </label>
                    )}
                    {/* File validation error */}
                    {fileError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] text-red-400 mt-1.5 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {fileError}
                      </motion.p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">Popis veci</label>
                    <textarea
                      placeholder="Popíšte bližšie stav, materiál, strih, farbu..."
                      rows={3}
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-gold-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Honeypot field for bot protection */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="confirm_website_url"
                      value={honeypotValue}
                      onChange={(e) => setHoneypotValue(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Consent and Solemn declaration slider for bot protection (disguised) */}
                  <div className="space-y-1 relative pt-2">
                    <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-500 animate-pulse" /> Čestné prehlásenie a súhlas s pravidlami bazáru *
                    </label>
                    <div className="relative w-full h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center overflow-hidden group hover:border-gold-500/30 transition-all">
                      {/* Background slide progress */}
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-gold-500/20 to-gold-500/5 transition-all duration-75"
                        style={{ width: `${verificationValue}%` }}
                      ></div>
                      
                      {/* Slider input overlaid */}
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={verificationValue}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setVerificationValue(val);
                        }}
                        disabled={verificationValue >= 100}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing disabled:cursor-default"
                      />
                      
                      {/* Slider track visuals */}
                      <div className="w-full px-4 flex justify-between items-center pointer-events-none select-none z-10">
                        <span className={`text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                          verificationValue >= 100 ? "text-gold-400 translate-x-2" : "text-gray-400 group-hover:text-gray-300"
                        }`}>
                          {verificationValue >= 100 ? "Podmienky predaja schválené!" : "Potiahnutím potvrdzujem stav veci a súhlas..."}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gray-500">{verificationValue}%</span>
                          <div className={`w-8 h-8 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-center transition-all ${
                            verificationValue >= 100 ? "bg-gold-500 border-gold-400 text-obsidian-950 scale-110 shadow-[0_0_15px_rgba(212,175,55,0.4)]" : "text-gold-500 group-hover:scale-105"
                          }`}>
                            {verificationValue >= 100 ? <Check className="w-4 h-4 stroke-[3]" /> : <ChevronDown className="w-4 h-4 rotate-270" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>

                  {/* Form-level error message */}
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-500/[0.05] text-red-400 text-[10px] leading-relaxed"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </motion.div>
                  )}

                  <div className="pt-4 flex gap-3 justify-end border-t border-white/5 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      disabled={isLoading}
                      className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Zrušiť
                    </button>
                    <button
                      type="submit"
                      disabled={verificationValue < 100 || isLoading}
                      className="btn-gold px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:filter disabled:grayscale flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin"></div>
                          Odosielam...
                        </>
                      ) : "Odoslať inzerát"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Verification Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteItemId(null);
                setDeleteError("");
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-md bg-obsidian-950/90 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl text-left backdrop-blur-md overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-[60px] pointer-events-none"></div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Odstrániť inzerát</h3>
                    <p className="text-zinc-400 text-xs font-light">Pre vymazanie overte svoju totožnosť</p>
                  </div>
                </div>

                <form onSubmit={handleDeleteInzerat} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">
                      Telefónne číslo (Rodič) alebo E-mail (Admin) *
                    </label>
                    <input
                      type="text"
                      placeholder="napr. 0903 123 456 alebo jakubkalina05@gmail.com"
                      value={deletePhoneOrEmail}
                      onChange={(e) => setDeletePhoneOrEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-red-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] md:text-xs uppercase tracking-widest font-bold text-gray-500">
                      Klubový PIN kód *
                    </label>
                    <input
                      type="password"
                      placeholder="Zadajte 4-miestny PIN"
                      value={deletePin}
                      onChange={(e) => setDeletePin(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-red-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all font-mono"
                      required
                    />
                  </div>

                  {deleteError && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-500/[0.05] text-red-400 text-[10px] leading-relaxed"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{deleteError}</span>
                    </motion.div>
                  )}

                  <div className="pt-4 flex gap-3 justify-end border-t border-white/5 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setDeleteItemId(null);
                        setDeleteError("");
                      }}
                      disabled={isDeleting}
                      className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Zrušiť
                    </button>
                    <button
                      type="submit"
                      disabled={isDeleting}
                      className="px-6 py-2.5 rounded-xl bg-red-650 hover:bg-red-650/80 text-white text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isDeleting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Odstraňujem...
                        </>
                      ) : "Vymazať"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
