"use client";
import Image from "next/image";

interface SubHeroProps {
  heading?: string;
  description?: string;
  image?: {
    url?: string | null;
    alt?: string | null;
  } | null;
}

export default function SubHero({
  heading = "Exterior Paint",
  description = "Not all paint is the same. Exterior paint has characteristics that make it better suited for outdoor environments and surfaces.",
  image,
}: SubHeroProps) {
  const imageUrl = image?.url?.trim() ? image.url : "/assets/jt/exterior-hero.png";
  const imageAlt = image?.alt?.trim() ? image.alt : heading;

  return (
    <section className="relative mt-20 w-full bg-white overflow-hidden">

      {/* Text — top left */}
      <div className="container mx-auto relative z-10 px-6 pt-15 pb-6 text-center md:text-start">
        <h1 className="text-[52px] md:text-[64px] font-extrabold leading-tight mb-4 font-['Avenir']">
          {heading}
        </h1>
        {description && (
          <p className="text-[24px] leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        <div className="relative z-2 flex flex-wrap justify-center xl:justify-start gap-3">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-[8px] bg-[#A5EBCD] px-5 py-3 text-[16px] font-semibold text-black transition-colors"
              >
                Request a Free Estimate
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
            </div>
      </div>

      {/* Image */}
      <div className="relative w-full h-120 md:h-147.5">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

    </section>
  );
}