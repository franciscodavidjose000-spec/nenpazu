import { MapPin, Phone } from 'lucide-react';
import { HOTEL_CONTACT } from '../data/hotelData';

const FOOTER_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#sobre', label: 'Sobre o Hotel' },
  { href: '#quartos', label: 'Quartos e Suítes' },
  { href: '#servicos', label: 'Serviços e Comodidades' },
  { href: '#gastronomia', label: 'Restaurante e Gastronomia' },
  { href: '#conferencias', label: 'Salas de Conferências' },
  { href: '#tarifario', label: 'Tarifário' },
  { href: '#galeria', label: 'Galeria Fotográfica' },
  { href: '#contactos', label: 'Localização e Contactos' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#061326] text-white border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <p className="font-serif text-2xl font-semibold tracking-[0.12em] text-white">
              {HOTEL_CONTACT.name}
            </p>
            <div className="w-12 h-[1px] bg-[#C5A059]" aria-hidden="true" />
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-sm">
              “{HOTEL_CONTACT.tagline}”
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D8B979] mb-4">
              Navegação
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 text-sm text-white/80">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#D8B979] transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Phone */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D8B979] mb-4">
              Contactos
            </h2>
            <div className="flex items-start gap-3 text-sm text-white/80">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" aria-hidden="true" />
              <span>{HOTEL_CONTACT.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Phone className="w-4 h-4 text-[#C5A059] shrink-0" aria-hidden="true" />
              <a
                href={HOTEL_CONTACT.phoneHref}
                className="hover:text-[#D8B979] transition-colors tabular-nums font-medium"
              >
                {HOTEL_CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/60">
          <p>© {currentYear} Hotel Nempanzu. Todos os direitos reservados.</p>
          <p>Soyo · Província do Zaire · Angola</p>
        </div>
      </div>
    </footer>
  );
}
