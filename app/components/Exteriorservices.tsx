"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

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

const MAX_VISIBLE_ITEMS = 3

function Lightbox({ p, onClose }: { p: Product; onClose: () => void }) {
  const imageUrl = p.image?.url?.trim() ? p.image.url : '/assets/jt/exterior-ser-1.png'
  const imageAlt = p.image?.alt?.trim() ? p.image.alt : p.title
  const allItems = p.items || []

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal */}
      <div
        className="relative z-10 bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image header */}
        <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden rounded-t-2xl bg-[#EEF4FB]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />

          {/* Tag badge */}
          <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-1">
            <span className="text-[12px] font-bold text-[#0052C6] uppercase tracking-[0.1em]">
              {p.tag}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">

          {/* Title + subtitle */}
          <h3 className="text-[24px] md:text-[28px] font-extrabold mb-2 font-['Avenir']">
            {p.title}
          </h3>
          {p.subtitle && (
            <p className="text-[16px] md:text-[18px] text-gray-500 leading-relaxed mb-5">
              {p.subtitle}
            </p>
          )}

          {/* Divider */}
          {allItems.length > 0 && (
            <div className="h-px bg-gray-100 mb-5" />
          )}

          {/* Items label */}
          {allItems.length > 0 && (
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-3">
              What's included
            </p>
          )}

          {/* Items list — card style */}
          {allItems.length > 0 && (
            <div className="flex flex-col gap-3 mb-6">
              {allItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-[#F4F7FF] rounded-[12px] px-4 py-3"
                >
                  {/* Check icon */}
                  <div className="w-7 h-7 rounded-full bg-[#E6F1FB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#185FA5]" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-[15px] leading-relaxed text-gray-800">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* CTA row */}
          <div className="flex gap-3 mt-2">
            
            <a  href="#"
              className="flex-1 flex items-center justify-center gap-2 bg-[#0052C6] hover:bg-[#003fa0] text-white font-bold text-[15px] py-3 rounded-[10px] transition-colors"
            >
              Get a Quote
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[15px] transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const imageUrl = p.image?.url?.trim() ? p.image.url : '/assets/jt/exterior-ser-1.png'
  const imageAlt = p.image?.alt?.trim() ? p.image.alt : p.title
  const allItems = p.items || []
  const visibleItems = allItems.slice(0, MAX_VISIBLE_ITEMS)
  const hasMore = allItems.length > MAX_VISIBLE_ITEMS

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

          {/* Visible items */}
          {visibleItems.length > 0 && (
            <ul className="list-disc pl-6 space-y-1 mb-2">
              {visibleItems.map((item, i) => (
                <li key={i} className="text-[18px] leading-relaxed">
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {/* Read More trigger */}
          {hasMore && (
            <div className="mt-3">
              {/* Hidden items count pill */}
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  +{allItems.length - MAX_VISIBLE_ITEMS} more items
                </span>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0052C6] hover:text-[#003fa0] transition-colors cursor-pointer"
                >
                  Read More
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox p={p} onClose={() => setLightboxOpen(false)} />
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
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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