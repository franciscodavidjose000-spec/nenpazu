import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PhotoAsset } from '../data/hotelData';
import { ResilientImage } from './ResilientImage';

interface ImageLightboxProps {
  photos: PhotoAsset[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({
  photos,
  activeIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const shouldReduceMotion = useReducedMotion();
  const activePhoto = activeIndex !== null ? photos[activeIndex] ?? null : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && photos.length > 1) {
        onNavigate((activeIndex + 1) % photos.length);
      } else if (event.key === 'ArrowLeft' && photos.length > 1) {
        onNavigate((activeIndex - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onClose, onNavigate, photos.length]);

  return (
    <AnimatePresence>
      {activePhoto && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização ampliada: ${activePhoto.title}`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#061326]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl w-full bg-[#0B1D36] border border-white/15 rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-white/10">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#D8B979] font-medium">
                  {activePhoto.category}
                </p>
                <h3 className="font-serif text-xl font-semibold text-white mt-0.5">
                  {activePhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-1 max-w-2xl">
                  {activePhoto.description}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar visualização ampliada"
                className="w-10 h-10 shrink-0 inline-flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-[#061326] max-h-[72vh] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhoto.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.3, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0.3 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex items-center justify-center"
                >
                  <ResilientImage
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    fallbackTitle={activePhoto.title}
                    loading="eager"
                    className="w-full max-h-[70vh] object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate((activeIndex - 1 + photos.length) % photos.length)
                    }
                    aria-label="Fotografia anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-sm bg-[#0B1D36]/80 hover:bg-[#0B1D36] text-white border border-white/20 hover:border-[#C5A059] flex items-center justify-center transition-all duration-150 hover:scale-105 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate((activeIndex + 1) % photos.length)}
                    aria-label="Fotografia seguinte"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-sm bg-[#0B1D36]/80 hover:bg-[#0B1D36] text-white border border-white/20 hover:border-[#C5A059] flex items-center justify-center transition-all duration-150 hover:scale-105 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
