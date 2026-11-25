import { ArrowUpRight, BedDouble, Maximize2 } from 'lucide-react';
import { ROOMS_DATA, type InquiryOptionId, type PhotoAsset } from '../data/hotelData';
import { MotionReveal } from './MotionReveal';
import { ResilientImage } from './ResilientImage';

interface RoomsSectionProps {
  onSelectRoom: (roomId: InquiryOptionId) => void;
  onZoomPhoto: (photo: PhotoAsset) => void;
}

export function RoomsSection({ onSelectRoom, onZoomPhoto }: RoomsSectionProps) {
  return (
    <section id="quartos" className="py-20 lg:py-28 bg-[#F6F7F9]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <MotionReveal className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A57F38] font-semibold mb-3">
            Alojamento
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-[#0B1D36] [text-wrap:balance]">
            Quartos e Suítes
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Com 102 quartos disponíveis entre as categorias Single, Duplo, Twin e Suítes,
            oferecemos soluções pensadas para viagens de negócios e estadias de lazer.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS_DATA.map((room, index) => (
            <MotionReveal key={room.id} delay={index * 0.06} className="h-full">
              <article className="group h-full flex flex-col bg-white border border-slate-200/90 rounded-sm overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#C5A059]/60">
                {room.photo ? (
                  <button
                    type="button"
                    onClick={() => onZoomPhoto(room.photo!)}
                    aria-label={`Ampliar fotografia: ${room.photo.title}`}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 block text-left cursor-pointer"
                  >
                    <ResilientImage
                      src={room.photo.src}
                      alt={room.photo.alt}
                      fallbackTitle={room.photo.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 w-9 h-9 rounded-sm bg-[#0B1D36]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Maximize2 className="w-4 h-4 text-[#D8B979]" />
                    </span>
                  </button>
                ) : (
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#0B1D36] via-[#132C4E] to-[#061326] flex flex-col items-center justify-center p-8 text-center border-b border-slate-200/80">
                    <BedDouble
                      className="w-9 h-9 text-[#C5A059] mb-3"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <p className="font-serif text-2xl font-semibold tracking-wide text-white">
                      {room.name}
                    </p>
                    <div className="w-10 h-[1px] bg-[#C5A059]/70 my-3" aria-hidden="true" />
                    <p className="text-xs sm:text-sm text-white/75 max-w-xs leading-relaxed">
                      Categoria oficial do Hotel Nempanzu. Fotografia específica disponível
                      mediante solicitação à recepção.
                    </p>
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
                      <h3 className="font-serif text-2xl font-semibold tracking-wide text-[#0B1D36]">
                        {room.name}
                      </h3>
                      <p className="text-right tabular-nums">
                        <span className="text-lg font-semibold text-[#0B1D36]">
                          {room.priceLabel}
                        </span>
                        <span className="text-xs text-slate-500 ml-1.5">
                          {room.unitLabel}
                        </span>
                      </p>
                    </div>

                    <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-slate-600">
                      {room.description}
                    </p>
                    {room.photo && (
                      <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                        {room.photo.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-7 pt-4">
                    <button
                      type="button"
                      onClick={() => onSelectRoom(room.id)}
                      aria-label={`Consultar disponibilidade para ${room.name}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#0B1D36] hover:bg-[#132C4E] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                    >
                      <span>Consultar disponibilidade</span>
                      <ArrowUpRight className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
