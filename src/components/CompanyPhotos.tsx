import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import img2 from "../assets/Images/Bg/img2.jpg";
import img3 from "../assets/Images/Bg/img3.jpg";
import img4 from "../assets/Images/Bg/img4.jpg";
import img5 from "../assets/Images/Bg/img5.jpg";
import img6 from "../assets/Images/Bg/img6.jpg";

type Category = "all" | "pesas" | "cardio" | "funcional" | "grupales";

interface PhotoItem {
  src: string;
  alt: string;
  title: string;
  category: Exclude<Category, "all">;
}

const images: PhotoItem[] = [
  { src: img2, alt: "Área de pesas", title: "Zona de pesas", category: "pesas" },
  { src: img3, alt: "Cardio moderno", title: "Cardio premium", category: "cardio" },
  { src: img4, alt: "Clases grupales", title: "Clases grupales", category: "grupales" },
  { src: img5, alt: "Funcional", title: "Funcional", category: "funcional" },
  { src: img6, alt: "Recuperación", title: "Recuperación", category: "funcional" },
];

const FILTERS: { id: Category; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "pesas", label: "Pesas" },
  { id: "cardio", label: "Cardio" },
  { id: "funcional", label: "Funcional" },
  { id: "grupales", label: "Grupales" },
];

export default function CompanyPhotos() {
  const { colors } = CoreFitTheme;
  const [filter, setFilter] = useState<Category>("all");
  const filtered = filter === "all" ? images : images.filter((i) => i.category === filter);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setSelected(0);
  }, [filter, emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 6500);
    return () => clearInterval(id);
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative bg-black" style={{ perspective: 1400 }}>
      <div className="relative flex flex-col">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              data-magnetic
              className={`relative text-xs uppercase tracking-[0.25em] px-4 py-2 rounded-full cursor-pointer transition ${
                filter === f.id ? "text-black" : "text-white/70 hover:text-white"
              }`}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: colors.text }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>

        <LayoutGroup>
          <div className="relative overflow-hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {filtered.map((img, i) => (
                  <div
                    key={`${filter}-${i}`}
                    className="relative flex-[0_0_100%] min-w-0 min-h-[480px]"
                    style={{ aspectRatio: "16 / 9", maxHeight: "85vh" }}
                  >
                    <motion.img
                      layoutId={`photo-${filter}-${i}`}
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      style={{
                        filter: selected === i ? "blur(0)" : "blur(8px)",
                        opacity: selected === i ? 1 : 0.6,
                        transition: "filter 0.7s, opacity 0.7s",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-10 left-10 md:left-20 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: selected === i ? 1 : 0, y: selected === i ? 0 : 20 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="text-xs tracking-[0.5em] uppercase text-white/70">
                        {String(i + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-extrabold mt-2 drop-shadow-lg">
                        {img.title}
                      </h3>
                    </motion.div>
                    <button
                      onClick={() => setLightbox(i)}
                      aria-label="Expandir"
                      data-magnetic
                      className="absolute top-6 right-6 bg-white/10 hover:bg-white/25 backdrop-blur-md text-white p-3 rounded-full border border-white/20 cursor-pointer transition"
                    >
                      <Expand size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prev}
              aria-label="Anterior"
              data-magnetic
              className="absolute left-6 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/10 hover:bg-white/25 cursor-pointer text-white p-4 rounded-full transition border border-white/20 z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              data-magnetic
              className="absolute right-6 top-1/2 -translate-y-1/2 backdrop-blur-md bg-white/10 hover:bg-white/25 cursor-pointer text-white p-4 rounded-full transition border border-white/20 z-10"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="relative flex gap-3 justify-center py-6 bg-black overflow-x-auto">
            {filtered.map((img, i) => (
              <button
                key={`thumb-${filter}-${i}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Ir a ${img.title}`}
                className={`relative shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  i === selected
                    ? "ring-2 ring-white scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{ width: 88, height: 56 }}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <AnimatePresence>
            {lightbox !== null && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightbox(null)}
              >
                <motion.img
                  layoutId={`photo-${filter}-${lightbox}`}
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].alt}
                  className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(null);
                  }}
                  aria-label="Cerrar"
                  data-magnetic
                  className="absolute top-6 right-6 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full backdrop-blur-md border border-white/20 cursor-pointer"
                >
                  <X size={22} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
