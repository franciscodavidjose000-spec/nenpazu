import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import {
  GALLERY_PHOTOS,
  type GalleryCategory,
  type PhotoAsset,
} from '../data/hotelData';
import { MotionReveal } from './MotionReveal';
import { ResilientImage } from './ResilientImage';

interface GallerySectionProps {
  onZoomPhoto: (photo: PhotoAsset, collection: PhotoAsset[]) => void;
}

const CATEGORIES: GalleryCategory[] = [
  'Todas',
  'Fachada e Recepção',
  'Quartos',
  'Piscina e Lazer',
  'Restaurante',
  'Áreas Exteriores',
];

export function GallerySection({ onZoomPhoto }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('Todas');
  const shouldReduceMotion = useReducedMotion();

  const filteredPhotos =
    selectedCategory === 'Todas'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === selectedCategory);

  return (
    <section id="galeria" className="py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A57F38] font-semibold mb-3">
              Galeria Fotográfica
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-[#0B1D36] [text-wrap:balance]">
              Fotografias Reais do Hotel Nempanzu
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Explore os espaços reais do hotel no Soyo. Clique em qualquer fotografia para abrir a
              visualização ampliada com descrição detalhada.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar galeria por espaço"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-slate-200/80 rounded-sm self-start lg:self-end"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B1D36] text-white'
                      : 'text-slate-600 hover:text-[#0B1D36] hover:bg-[#F6F7F9]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <figure className="h-full flex flex-col bg-white border border-slate-200/80 rounded-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => onZoomPhoto(photo, filteredPhotos)}
                  aria-label={`Ampliar fotografia: ${photo.title}`}
                  className="group relative block w-full text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <ResilientImage
                      src={photo.src}
                      alt={photo.alt}
                      fallbackTitle={photo.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 w-9 h-9 rounded-sm bg-[#0B1D36]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Maximize2 className="w-4 h-4 text-[#D8B979]" />
                  </span>
                </button>

                <figcaption className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-slate-100">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#A57F38] font-semibold">
                      {photo.category}
                    </p>
                    <h3 className="font-serif text-lg font-semibold text-[#0B1D36] mt-0.5">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
