import { ArrowUpRight, Presentation } from 'lucide-react';
import { CONFERENCE_ROOMS, type InquiryOptionId } from '../data/hotelData';
import { MotionReveal } from './MotionReveal';

interface ConferenceSectionProps {
  onSelectConferenceRoom: (roomId: InquiryOptionId) => void;
}

export function ConferenceSection({ onSelectConferenceRoom }: ConferenceSectionProps) {
  return (
    <section id="conferencias" className="py-20 lg:py-28 bg-[#0B1D36] text-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <MotionReveal className="max-w-2xl mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#D8B979] font-semibold mb-3">
            Conferências e Eventos
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-white [text-wrap:balance]">
            Salas de Conferências
          </h2>
          <p className="mt-4 text-base text-white/80 leading-relaxed">
            Espaços dedicados para reuniões executivas, formações, conferências e encontros
            institucionais no Soyo, com apoio do centro de negócios e serviços de hotelaria.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CONFERENCE_ROOMS.map((room, index) => (
            <MotionReveal key={room.id} delay={index * 0.08} className="h-full">
              <article className="h-full flex flex-col justify-between p-7 sm:p-9 bg-[#132C4E]/80 border border-white/15 rounded-sm transition-colors duration-200 hover:border-[#C5A059]/70">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-11 h-11 rounded-sm bg-[#0B1D36] border border-[#C5A059]/40 flex items-center justify-center">
                      <Presentation
                        className="w-5 h-5 text-[#D8B979]"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="tabular-nums text-right">
                      <span className="text-xl font-semibold text-[#D8B979]">
                        {room.priceLabel}
                      </span>
                      <span className="block text-xs text-white/70">{room.unitLabel}</span>
                    </p>
                  </div>

                  <div className="pb-4 border-b border-white/10">
                    <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
                      {room.name}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectConferenceRoom(room.id)}
                    aria-label={`Solicitar informações e reserva para ${room.name}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#0B1D36] bg-[#C5A059] hover:bg-[#D8B979] rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    <span>Solicitar informações e reserva</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
