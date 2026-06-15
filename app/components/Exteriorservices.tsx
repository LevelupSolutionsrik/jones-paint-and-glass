"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface ProductItem {
  text: string;
}

interface Product {
  id?: string;
  tag: string;
  title: string;
  subtitle?: string;
  image?: {
    url?: string | null;
    alt?: string | null;
  } | null;
  imageLeft?: boolean;
  items?: ProductItem[];
}

interface ExteriorServicesBlockProps {
  sectionTag?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  products?: Product[];
}

// ── Max items shown before "Read More" appears ──
const MAX_VISIBLE_ITEMS = 3

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const imageUrl = p.image?.url?.trim() ? p.image.url : '/assets/jt/exterior-ser-1.png'
  const imageAlt = p.image?.alt?.trim() ? p.image.alt : p.title
  const hasItems = p.items && p.items.length > 0
  const visibleItems = p.items?.slice(0, MAX_VISIBLE_ITEMS) || []
  const allItems = p.items || []
  const hasMore = allItems.length > MAX_VISIBLE_ITEMS

  // ── Check if content overflows its container ──
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    setIsOverflowing(el.scrollHeight > el.clientHeight || hasMore)
  }, [p.items, hasMore])

  // ── Close lightbox on Escape key ──
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
    }
    window.addEventListener('keydown', handler)
    // Prevent body scroll when lightbox open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  return (
    <>
      <div
        className={`flex flex-col ${p.imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 overflow-hidden`}
      >
        {/* Image */}
        <div className="w-full lg:w-[48%] flex-shrink-0">
          <div className="w-full h-full bg-[#EEF4FB] overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-[16px]"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
            {p.tag}
          </p>
          <h3 className="text-[38px] font-extrabold mb-2 font-['Avenir']">
            {p.title}
          </h3>
          {p.subtitle && (
            <p className="text-[24px] leading-relaxed mb-4 w-[80%]">
              {p.subtitle}
            </p>
          )}

          {/* Content with max height + fade */}
          {hasItems && (
            <div className="relative">
              <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ${
                  isOverflowing ? 'max-h-[160px]' : ''
                }`}
              >
                <ul className="list-disc pl-6 space-y-1">
                  {visibleItems.map((item, i) => (
                    <li key={i} className="text-[18px] leading-relaxed">
                      {item.text}
                    </li>
                  ))}
                  {hasMore && (
                    <li className="text-[18px] leading-relaxed text-gray-400">
                      +{allItems.length - MAX_VISIBLE_ITEMS} more...
                    </li>
                  )}
                </ul>
              </div>

              {/* Fade gradient overlay */}
              {isOverflowing && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>
          )}

          {/* Read More button */}
          {(hasMore || isOverflowing) && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="mt-4 self-start inline-flex items-center gap-2 text-[16px] font-semibold text-[#0052C6] hover:text-[#003fa0] transition-colors group"
            >
              Read More
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Lightbox image */}
            <div className="w-full h-[200px] md:h-[280px] overflow-hidden rounded-t-2xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={280}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lightbox content */}
            <div className="p-6 md:p-8">
              <p className="text-[14px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
                {p.tag}
              </p>
              <h3 className="text-[28px] md:text-[36px] font-extrabold mb-3 font-['Avenir']">
                {p.title}
              </h3>
              {p.subtitle && (
                <p className="text-[18px] md:text-[22px] leading-relaxed mb-5 text-gray-600">
                  {p.subtitle}
                </p>
              )}
              {hasItems && (
                <ul className="list-disc pl-6 space-y-2">
                  {allItems.map((item, i) => (
                    <li key={i} className="text-[16px] md:text-[18px] leading-relaxed">
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function ExteriorServices({
  sectionTag = "Exterior Paint",
  heading = "Products & Services",
  description = "Whether you know exactly what you're looking for or need a little guidance, Jones Paint & Glass has what you need.",
  buttonText = "Get a Quote",
  buttonLink = "#",
  products = [],
}: ExteriorServicesBlockProps) {
  if (!products || products.length === 0) return null

  return (
    <section className="relative py-14 md:py-20 bg-white overflow-hidden">

      {/* Paint splash */}
      <div
        className="pointer-events-none absolute top-60 lg:top-10 right-0 w-full h-56 lg:h-120 z-0"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-17.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">

        {/* Header */}
        <div className="mb-20 text-center lg:text-start">
          <p className="text-[16px] font-bold tracking-[0.18em] text-[#0052C6] uppercase mb-2">
            {sectionTag}
          </p>
          <h2 className="text-[36px] md:text-[48px] font-extrabold mb-3 font-['Avenir']">
            {heading}
          </h2>
          {description && (
            <p className="text-[18px] leading-relaxed mx-auto lg:mx-0 max-w-xl mb-5">
              {description}
            </p>
          )}
          {buttonText && (
            
            <a  href={buttonLink}
              className="group inline-flex items-center gap-2 bg-[#0052C6] hover:bg-[#003fa0] transition-colors text-white font-bold text-[16px] px-5 py-3 rounded-[8px]"
            >
              {buttonText}
              <svg
                className="w-4 h-4 transition-transform duration-300 text-white group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>

        {/* Product rows */}
        <div className="flex flex-col gap-6">
          {products.map((p, index) => (
            <ProductCard key={p.id || index} p={p} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}