import { useState } from 'react';
import {
  ArrowUpDown,
  BellRing,
  Briefcase,
  Car,
  CircleDot,
  Clock,
  Coffee,
  Dumbbell,
  Gamepad2,
  Maximize2,
  Presentation,
  Scissors,
  Shirt,
  Sparkles,
  Trees,
  Trophy,
  Utensils,
  Waves,
  Wifi,
  Wind,
  Wine,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  LEISURE_PHOTOS,
  SERVICES_DATA,
  type PhotoAsset,
  type ServiceItem,
} from '../data/hotelData';
import { MotionReveal } from './MotionReveal';
import { ResilientImage } from './ResilientImage';

interface ServicesSectionProps {
  onZoomPhoto: (photo: PhotoAsset) => void;
}

type ServiceFilter = 'todos' | ServiceItem['category'];

const FILTER_OPTIONS: { id: ServiceFilter; label: string }[] = [
  { id: 'todos', label: 'Todos (20)' },
  { id: 'conforto', label: 'Alojamento e Conforto' },
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'lazer', label: 'Lazer e Bem-estar' },
  { id: 'negocios', label: 'Negócios e Eventos' },
];

function ServiceIcon({ name }: { name: ServiceItem['iconName'] }) {
  const iconClass = 'w-5 h-5 text-[#A57F38] shrink-0';
  const props = { className: iconClass, strokeWidth: 1.75, 'aria-hidden': true as const };

  switch (name) {
    case 'utensils':
      return <Utensils {...props} />;
    case 'wine':
      return <Wine {...props} />;
    case 'coffee':
      return <Coffee {...props} />;
    case 'waves':
      return <Waves {...props} />;
    case 'wifi':
      return <Wifi {...props} />;
    case 'car':
      return <Car {...props} />;
    case 'clock':
      return <Clock {...props} />;
    case 'bell-ring':
      return <BellRing {...props} />;
    case 'wind':
      return <Wind {...props} />;
    case 'arrow-up-down':
      return <ArrowUpDown {...props} />;
    case 'shirt':
      return <Shirt {...props} />;
    case 'briefcase':
      return <Briefcase {...props} />;
    case 'presentation':
      return <Presentation {...props} />;
    case 'sparkles':
      return <Sparkles {...props} />;
    case 'gamepad-2':
      return <Gamepad2 {...props} />;
    case 'circle-dot':
      return <CircleDot {...props} />;
    case 'trophy':
      return <Trophy {...props} />;
    case 'trees':
      return <Trees {...props} />;
    case 'dumbbell':
      return <Dumbbell {...props} />;
    case 'scissors':
      return <Scissors {...props} />;
  }
}

export function ServicesSection({ onZoomPhoto }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ServiceFilter>('todos');
  const shouldReduceMotion = useReducedMotion();

  const visibleServices =
    activeFilter === 'todos'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((service) => service.category === activeFilter);

  return (
    <section id="servicos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A57F38] font-semibold mb-3">
              Lazer e Comodidades
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-[#0B1D36] [text-wrap:balance]">
              Serviços e Comodidades
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Pensado para responder às exigências de viajantes corporativos e momentos de
              descanso em família, com piscina exterior, sala de jogos e atendimento permanente.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filtrar serviços por categoria"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F6F7F9] border border-slate-200/80 rounded-sm self-start lg:self-end"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveFilter(option.id)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B1D36] text-white'
                      : 'text-slate-600 hover:text-[#0B1D36] hover:bg-white/70'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </MotionReveal>

        {/* Real Leisure Photography Showcase: Pool & Games Room */}
        <MotionReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {LEISURE_PHOTOS.map((photo) => (
            <figure
              key={photo.id}
              className="group bg-[#F6F7F9] border border-slate-200/80 rounded-sm overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => onZoomPhoto(photo)}
                aria-label={`Ampliar fotografia: ${photo.title}`}
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 text-left cursor-pointer"
              >
                <ResilientImage
                  src={photo.src}
                  alt={photo.alt}
                  fallbackTitle={photo.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 w-9 h-9 rounded-sm bg-[#0B1D36]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Maximize2 className="w-4 h-4 text-[#D8B979]" />
                </span>
              </button>
              <figcaption className="px-5 py-4 bg-white border-t border-slate-200/80 flex-1">
                <h3 className="font-serif text-xl font-semibold text-[#0B1D36]">{photo.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {photo.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleServices.map((service) => (
            <motion.div
              key={service.id}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-4 p-5 bg-[#F6F7F9] border border-slate-200/70 rounded-sm transition-all duration-200 hover:bg-white hover:border-[#C5A059]/70 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-sm bg-white border border-slate-200/80 flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:border-[#C5A059]/60">
                <ServiceIcon name={service.iconName} />
              </div>
              <span className="text-sm font-medium text-[#0B1D36] leading-snug">
                {service.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
