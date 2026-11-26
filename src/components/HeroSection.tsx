import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, ChevronDown } from 'lucide-react';
import { CLIENT_PHOTOS, HERO_CONTENT } from '../data/hotelData';

interface HeroSectionProps {
  onExploreRooms: () => void;
  onRequestReservation: () => void;
}

export function HeroSection({ onExploreRooms, onRequestReservation }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-[100svh] w-full overflow-hidden flex items-end lg:items-center bg-[#061326]"
    >
      {/* Outer Parallax Layer + Inner Continuous Ken Burns Motion Layer */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: parallaxY }}
        className="absolute inset-0 w-full h-full will-change-transform"
        aria-hidden="true"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [1.02, 1.08, 1.02],
                  x: ['0%', '-1.2%', '0%'],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 24,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
          className="w-full h-full will-change-transform"
        >
          <img
            src={CLIENT_PHOTOS.facadeFront.src}
            alt={CLIENT_PHOTOS.facadeFront.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Measured deep navy scrim for crisp white typography readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#061326]/92 via-[#0B1D36]/68 to-[#061326]/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#061326]/85 via-[#061326]/45 to-transparent"
      />

      {/* Hero Foreground Content with Sequenced Luxury Entrance */}
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity: contentOpacity }}
        className="relative z-10 max-w-[1200px] w-full mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pb-24 lg:py-32"
      >
        <div className="max-w-3xl">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[#D8B979] font-medium mb-4"
          >
            {HERO_CONTENT.locationLabel}
          </motion.p>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.25rem,4.5vw,4rem)] font-semibold leading-[1.08] tracking-tight text-white [text-wrap:balance]"
          >
            {HERO_CONTENT.title}
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[1px] bg-[#C5A059] my-6 origin-left"
            aria-hidden="true"
          />

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg leading-relaxed text-white/90 max-w-2xl font-normal"
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              type="button"
              onClick={onExploreRooms}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold tracking-wider uppercase text-[#0B1D36] bg-[#C5A059] hover:bg-[#D8B979] rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_10px_24px_-8px_rgba(197,160,89,0.55)] whitespace-nowrap cursor-pointer"
            >
              <span>{HERO_CONTENT.primaryCta}</span>
              <ArrowDownRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onRequestReservation}
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-wider uppercase text-white border border-white/40 bg-[#0B1D36]/45 hover:bg-white hover:text-[#0B1D36] hover:border-white rounded-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
            >
              {HERO_CONTENT.secondaryCta}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Gentle Floating Scroll Cue */}
      <motion.a
        href="#sobre"
        aria-label="Descer para a secção Sobre o Hotel"
        animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
        }
        className="hidden sm:inline-flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 items-center justify-center w-10 h-10 text-white/75 hover:text-[#D8B979] transition-colors"
      >
        <ChevronDown className="w-6 h-6" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
