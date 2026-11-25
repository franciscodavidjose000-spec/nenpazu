import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, Phone, X } from 'lucide-react';
import { HOTEL_CONTACT } from '../data/hotelData';

interface NavbarProps {
  onRequestReservation: () => void;
}

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#quartos', label: 'Quartos' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#contactos', label: 'Contactos' },
];

const MOBILE_EXTRA_LINKS = [
  { href: '#gastronomia', label: 'Restaurante e Gastronomia' },
  { href: '#conferencias', label: 'Salas de Conferências' },
  { href: '#tarifario', label: 'Serviços Adicionais e Tarifário' },
];

export function Navbar({ onRequestReservation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleMobileNavigate = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#0B1D36]/95 backdrop-blur-md border-b border-white/10 shadow-sm'
          : 'bg-gradient-to-b from-[#061326]/75 to-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 lg:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          className="font-serif text-lg sm:text-xl font-semibold tracking-[0.12em] text-white whitespace-nowrap shrink-0 hover:text-[#D8B979] transition-colors"
        >
          HOTEL NEMPANZU
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-white/90 hover:text-[#D8B979] transition-colors whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-[#C5A059] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA on desktop + Mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRequestReservation}
            className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0B1D36] bg-[#C5A059] hover:bg-[#D8B979] rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Solicitar reserva
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-white hover:text-[#D8B979] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Menu móvel"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#0B1D36] border-t border-white/10 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col space-y-1">
              {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNavigate(item.href);
                  }}
                  className="py-3 text-base font-medium text-white/90 hover:text-[#D8B979] border-b border-white/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestReservation();
                }}
                className="w-full py-3.5 px-5 text-sm font-semibold tracking-wider uppercase text-[#0B1D36] bg-[#C5A059] hover:bg-[#D8B979] rounded-sm transition-colors cursor-pointer"
              >
                Solicitar reserva
              </button>
              <a
                href={HOTEL_CONTACT.phoneHref}
                className="w-full py-3 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-white border border-white/25 hover:border-[#C5A059] hover:text-[#D8B979] rounded-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                <span>Ligar: {HOTEL_CONTACT.phoneDisplay}</span>
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
