import { Maximize2 } from 'lucide-react';
import { DINING_OPTIONS, DINING_PHOTOS, type PhotoAsset } from '../data/hotelData';
import { MotionReveal } from './MotionReveal';
import { ResilientImage } from './ResilientImage';

interface DiningSectionProps {
  onZoomPhoto: (photo: PhotoAsset) => void;
}

export function DiningSection({ onZoomPhoto }: DiningSectionProps) {
  return (
    <section id="gastronomia" className="py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Content Column */}
          <MotionReveal className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A57F38] font-semibold mb-3">
              Sabores e Hospitalidade
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-[#0B1D36] [text-wrap:balance]">
              Restaurante e Gastronomia
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-xl">
              Experiência gastronómica diária concebida para acompanhar todos os momentos da sua
              estadia no Soyo, desde o pequeno-almoço aos jantares de negócios ou lazer.
            </p>

            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {DINING_OPTIONS.map((item) => (
                <div
                  key={item.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div className="pr-4">
                    <h3 className="font-serif text-xl font-semibold text-[#0B1D36]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.subtitle}</p>
                  </div>

                  {item.priceLabel ? (
                    <div className="shrink-0 sm:text-right tabular-nums mt-1 sm:mt-0">
                      <span className="text-base font-semibold text-[#0B1D36]">
                        {item.priceLabel}
                      </span>
                      <span className="block text-xs text-slate-500">por pessoa</span>
                    </div>
                  ) : (
                    <div className="shrink-0 sm:text-right mt-1 sm:mt-0">
                      <span className="text-xs uppercase tracking-wider text-[#A57F38] font-medium">
                        Disponível diariamente
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </MotionReveal>

          {/* Photography Column: Both Real Restaurant Photographs */}
          <MotionReveal delay={0.08} className="lg:col-span-6 space-y-6">
            {DINING_PHOTOS.map((photo) => (
              <figure
                key={photo.id}
                className="group bg-white border border-slate-200/80 rounded-sm overflow-hidden transition-all duration-200 hover:border-[#C5A059]/75 hover:shadow-[0_14px_30px_-14px_rgba(11,29,54,0.16)]"
              >
                <button
                  type="button"
                  onClick={() => onZoomPhoto(photo)}
                  aria-label={`Ampliar fotografia: ${photo.title}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 block text-left cursor-pointer"
                >
                  <ResilientImage
                    src={photo.src}
                    alt={photo.alt}
                    fallbackTitle={photo.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#061326]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-3 right-3 w-9 h-9 rounded-sm bg-[#0B1D36]/85 text-white flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
                  >
                    <Maximize2 className="w-4 h-4 text-[#D8B979]" />
                  </span>
                </button>
                <figcaption className="px-5 py-3.5 border-t border-slate-200/80">
                  <p className="font-serif text-lg font-semibold text-[#0B1D36]">
                    {photo.title}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                    {photo.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
