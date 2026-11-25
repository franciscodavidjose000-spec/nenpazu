import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { ConferenceSection } from './components/ConferenceSection';
import {
  ContactLocationSection,
  type ContactFormTab,
} from './components/ContactLocationSection';
import { DiningSection } from './components/DiningSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { HeroSection } from './components/HeroSection';
import { ImageLightbox } from './components/ImageLightbox';
import { Navbar } from './components/Navbar';
import { RatesTableSection } from './components/RatesTableSection';
import { RoomsSection } from './components/RoomsSection';
import { ServicesSection } from './components/ServicesSection';
import {
  GALLERY_PHOTOS,
  type InquiryOptionId,
  type PhotoAsset,
} from './data/hotelData';

export default function App() {
  const [selectedInquiryOption, setSelectedInquiryOption] = useState<InquiryOptionId | ''>('');
  const [activeContactTab, setActiveContactTab] = useState<ContactFormTab>('reserva');
  const [lightboxPhotos, setLightboxPhotos] = useState<PhotoAsset[]>(GALLERY_PHOTOS);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollToElement = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  const handleRequestReservation = (optionId?: InquiryOptionId) => {
    if (optionId) {
      setSelectedInquiryOption(optionId);
    }
    setActiveContactTab('reserva');
    scrollToElement('#reservas');
  };

  const handleExploreRooms = () => {
    scrollToElement('#quartos');
  };

  const handleZoomPhoto = (photo: PhotoAsset, collection: PhotoAsset[] = GALLERY_PHOTOS) => {
    const idx = collection.findIndex((item) => item.id === photo.id);
    setLightboxPhotos(collection);
    setLightboxIndex(idx >= 0 ? idx : 0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#0B1D36]">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C5A059] focus:text-[#0B1D36] focus:font-semibold focus:rounded-sm"
        >
          Ir para o conteúdo principal
        </a>

        <Navbar onRequestReservation={() => handleRequestReservation()} />

        <main id="conteudo-principal" className="flex-1">
          <HeroSection
            onExploreRooms={handleExploreRooms}
            onRequestReservation={() => handleRequestReservation()}
          />
          <AboutSection onZoomPhoto={(photo) => handleZoomPhoto(photo, [photo])} />
          <RoomsSection
            onSelectRoom={(roomId) => handleRequestReservation(roomId)}
            onZoomPhoto={(photo) => handleZoomPhoto(photo)}
          />
          <ServicesSection onZoomPhoto={(photo) => handleZoomPhoto(photo)} />
          <DiningSection onZoomPhoto={(photo) => handleZoomPhoto(photo)} />
          <ConferenceSection
            onSelectConferenceRoom={(roomId) => handleRequestReservation(roomId)}
          />
          <RatesTableSection />
          <GallerySection onZoomPhoto={handleZoomPhoto} />
          <ContactLocationSection
            selectedOption={selectedInquiryOption}
            activeTab={activeContactTab}
            onTabChange={setActiveContactTab}
          />
        </main>

        <Footer />

        <ImageLightbox
          photos={lightboxPhotos}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      </div>
    </MotionConfig>
  );
}
