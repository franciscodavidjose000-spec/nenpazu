import { Info } from 'lucide-react';
import { ADDITIONAL_RATES } from '../data/hotelData';
import { MotionReveal } from './MotionReveal';

export function RatesTableSection() {
  return (
    <section id="tarifario" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <MotionReveal className="max-w-2xl mb-10 lg:mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A57F38] font-semibold mb-3">
            Transparência e Flexibilidade
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-[#0B1D36] [text-wrap:balance]">
            Serviços Adicionais e Tarifário
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Opções complementares de regime alimentar e flexibilidade de horários de chegada ou
            partida para adequar a sua estadia às suas necessidades.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          {/* Desktop / Tablet Table */}
          <div className="hidden md:block overflow-hidden border border-slate-200 rounded-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0B1D36] text-white">
                  <th
                    scope="col"
                    className="py-4 px-6 text-xs font-semibold uppercase tracking-wider"
                  >
                    Serviço Adicional
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-xs font-semibold uppercase tracking-wider"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-right"
                  >
                    Tarifa Informativa
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {ADDITIONAL_RATES.map((rate, idx) => (
                  <tr
                    key={rate.id}
                    className={
                      idx % 2 === 0
                        ? 'bg-white hover:bg-[#F6F7F9] transition-colors'
                        : 'bg-[#F6F7F9]/60 hover:bg-[#F6F7F9] transition-colors'
                    }
                  >
                    <td className="py-4 px-6 text-sm font-semibold text-[#0B1D36]">
                      {rate.service}
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{rate.category}</td>
                    <td className="py-4 px-6 text-right tabular-nums">
                      <span className="text-sm font-semibold text-[#0B1D36]">
                        {rate.priceLabel}
                      </span>
                      <span className="text-xs text-slate-500 ml-1.5">{rate.unitLabel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Adapted Stacked Layout */}
          <div className="md:hidden divide-y divide-slate-200 border border-slate-200 rounded-sm bg-white">
            {ADDITIONAL_RATES.map((rate) => (
              <div key={rate.id} className="p-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#0B1D36]">{rate.service}</p>
                  <p className="text-xs text-slate-500 mt-1">{rate.category}</p>
                </div>
                <div className="text-right shrink-0 tabular-nums">
                  <p className="text-sm font-semibold text-[#0B1D36]">{rate.priceLabel}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{rate.unitLabel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mandatory Disclaimer */}
          <div className="mt-5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
            <Info className="w-4 h-4 text-[#A57F38] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              Valores apresentados a título informativo, sujeitos a disponibilidade e confirmação
              pela administração do Hotel Nempanzu no momento do pedido.
            </p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
