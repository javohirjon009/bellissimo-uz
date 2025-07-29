"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const slides = [
  {
    id: "slide-1",
    image: "/images/a95649d2-ee7e-4606-a65e-262015e5b1c6_uz.webp",
    alt: "Birinchi slide",
  },
  {
    id: "slide-2",
    image: "/images/abdf7424-78c1-461e-a964-de97befabb53_uz.webp",
    alt: "Ikkinchi slide",
  },
  {
    id: "slide-3",
    image: "/images/a7b348ce-343a-4127-889b-583edd12b213_uz.webp",
    alt: "Uchinchi slide",
  },
  {
    id: "slide-4",
    image: "/images/c9be0889-930d-47b2-a90b-e754ca85f190.webp",
    alt: "To‘rtinchi slide",
  },
  {
    id: "slide-5",
    image: "/images/db9ec296-5c11-474a-a79e-57ed2debd2f2_uz.webp",
    alt: "Beshinchi slide",
  },
];

export default function Carousel() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
   
    <div className="relative max-w-[1200px] mx-auto h-[220px] sm:h-[300px] md:h-[400px] rounded-lg md:rounded-2xl px-4 md:px-5 sm:px-0">
    
      <button
        ref={prevRef}
        className="absolute cursor-pointer left-2 sm:left-4 top-1/2 z-10 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 sm:p-2 backdrop-blur-sm transition-all"
        aria-label="Oldingi slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>

      <button
        ref={nextRef}
        className="absolute cursor-pointer right-2 sm:right-4 top-1/2 z-10 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 sm:p-2 backdrop-blur-sm transition-all"
        aria-label="Keyingi slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper: SwiperType) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="w-full h-full rounded-lg md:rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full rounded-lg md:rounded-2xl">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority
                quality={90}
                className="rounded-lg md:rounded-2xl"
                style={{objectFit: "cover"}}
                sizes="(max-width: 640px) 90vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}