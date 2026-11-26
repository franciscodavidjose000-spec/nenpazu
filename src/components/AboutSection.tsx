import { Maximize2 } from 'lucide-react';
import { ABOUT_PARAGRAPHS, CLIENT_PHOTOS, type PhotoAsset } from '../data/hotelData';
import { MotionReveal } from './MotionReveal';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  onZoomPhoto: (photo: PhotoAsset) => void;
}

export function AboutSection({ onZoomPhoto }: AboutSectionProps) {
  const facadePhoto = CLIENT_PHOTOS.facadeFront;

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Photography Column: Real Hotel Facade */}
          <MotionReveal className="lg:col-span-6 flex flex-col">
            <figure className="group h-full flex flex-col border border-slate-200/80 rounded-sm overflow-hidden bg-[#F6F7F9] transition-colors duration-200 hover:border-[#C5A059]/70">
              <button
                type="button"
                onClick={() => onZoomPhoto(facadePhoto)}
                aria-label={`Ampliar fotografia: ${facadePhoto.title}`}
                className="relative flex-1 min-h-[280px] sm:min-h-[360px] w-full overflow-hidden text-left cursor-pointer"
              >
                <ResilientImage
                  src={facadePhoto.src}
                  alt={facadePhoto.alt}
                  fallbackTitle={facadePhoto.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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
              <figcaption className="px-5 py-4 bg-white border-t border-slate-200/80">
                <p className="font-serif text-lg font-semibold text-[#0B1D36]">
                  {facadePhoto.title}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  {facadePhoto.description}
                </p>
              </figcaption>
            </figure>
          </MotionReveal>

          {/* Editorial Copy Column */}
          <MotionReveal delay={0.08} className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A57F38] font-semibold mb-3">
              Hospitalidade no Soyo
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-[#0B1D36] [text-wrap:balance]">
              Sobre o Hotel Nempanzu
            </h2>

            <div className="w-12 h-[1px] bg-[#C5A059] my-6" aria-hidden="true" />

            <div className="space-y-4 text-[15px] sm:text-base leading-[1.7] text-slate-700 max-w-prose">
              {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Key Facts Strip */}
            <div className="mt-10 pt-7 border-t border-slate-200 grid grid-cols-3 gap-6">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B1D36] tabular-nums">
                  102
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Quartos e Suítes</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B1D36] tabular-nums">
                  ~5 min
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Do Aeroporto do Soyo</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B1D36] tabular-nums">
                  24h
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Recepção permanente</p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
