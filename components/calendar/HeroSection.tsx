"use client";

import Image from "next/image";

export default function HeroSection({
  imageSrc,
  monthLabel,
  subtitle,
}: {
  imageSrc: string;
  monthLabel: string;
  subtitle: string;
}) {
  return (
    <div className="group relative aspect-[4/3] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[min(42%,400px)] lg:min-h-[440px]">
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 400px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/5 transition-opacity duration-500 lg:bg-gradient-to-r lg:from-black/25 lg:via-black/35 lg:to-black/55" />
      <div className="absolute inset-x-0 bottom-0 p-5 lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:flex lg:h-full lg:w-[min(100%,220px)] lg:flex-col lg:justify-end lg:bg-gradient-to-l lg:from-black/70 lg:via-black/45 lg:to-transparent lg:p-7">
        <p className="font-serif text-3xl font-semibold tracking-tight text-white drop-shadow-lg transition-transform duration-300 group-hover:translate-y-[-2px] sm:text-4xl">
          {monthLabel}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/90">
          {subtitle}
        </p>
        <div className="mt-4 hidden h-1 w-12 rounded-full bg-white/40 lg:block" />
      </div>
    </div>
  );
}
