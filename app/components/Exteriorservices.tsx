"use client";
import Image from "next/image";

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

export default function ExteriorServices({
  sectionTag = "Exterior Paint",
  heading = "Products & Services",
  description = "Whether you know exactly what you're looking for or need a little guidance, Jones Paint & Glass has what you need.",
  buttonText = "Get a Quote",
  buttonLink = "#",
  products = [],
}: ExteriorServicesBlockProps) {
  if (!products || products.length === 0) return null;

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
          {products.map((p, index) => {
            const imageUrl = p.image?.url?.trim() ? p.image.url : '/assets/jt/exterior-ser-1.png';
            const imageAlt = p.image?.alt?.trim() ? p.image.alt : p.title;

            return (
              <div
                key={p.id || index}
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
                    <p className="text-[#0052C6] text-[24px] leading-relaxed mb-4 w-[80%]">
                      {p.subtitle}
                    </p>
                  )}
                  {p.items && p.items.length > 0 && (
                    <ul className="list-disc pl-6 space-y-1">
                      {p.items.map((item, i) => (
                        <li key={i} className="text-[18px] leading-relaxed">
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}