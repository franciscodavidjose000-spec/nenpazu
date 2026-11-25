import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, ExternalLink, Info, MapPin, Phone, Send } from 'lucide-react';
import {
  HOTEL_CONTACT,
  INQUIRY_ROOM_LABELS,
  type InquiryOptionId,
} from '../data/hotelData';
import {
  calculateEstimatedInquiryTotal,
  formatKwanza,
  validateContactMessage,
  validateReservationInquiry,
  type ContactMessageInput,
  type ReservationInquiryInput,
  type ValidationErrors,
} from '../utils/bookingLogic';
import { MotionReveal } from './MotionReveal';

export type ContactFormTab = 'reserva' | 'contacto';

interface ContactLocationSectionProps {
  selectedOption: InquiryOptionId | '';
  activeTab: ContactFormTab;
  onTabChange: (tab: ContactFormTab) => void;
}

interface SubmittedReservationSummary {
  name: string;
  phone: string;
  roomLabel: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  estimatedTotal: string | null;
}

export function ContactLocationSection({
  selectedOption,
  activeTab,
  onTabChange,
}: ContactLocationSectionProps) {
  // Reservation inquiry state
  const [reservation, setReservation] = useState<ReservationInquiryInput>({
    name: '',
    phone: '',
    roomType: selectedOption,
    checkIn: '',
    checkOut: '',
    guests: '1',
    notes: '',
  });
  const [reservationErrors, setReservationErrors] = useState<
    ValidationErrors<keyof ReservationInquiryInput>
  >({});
  const [submittedReservation, setSubmittedReservation] =
    useState<SubmittedReservationSummary | null>(null);

  // General contact form state
  const [contactForm, setContactForm] = useState<ContactMessageInput>({
    name: '',
    contact: '',
    subject: '',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState<
    ValidationErrors<keyof ContactMessageInput>
  >({});
  const [submittedContactName, setSubmittedContactName] = useState<string | null>(null);

  // Sync external room/conference selection
  useEffect(() => {
    if (selectedOption) {
      setReservation((prev) => ({ ...prev, roomType: selectedOption }));
      setSubmittedReservation(null);
      setReservationErrors((prev) => ({ ...prev, roomType: undefined }));
    }
  }, [selectedOption]);

  const estimate = calculateEstimatedInquiryTotal(
    reservation.roomType,
    reservation.checkIn,
    reservation.checkOut
  );

  const handleReservationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateReservationInquiry(reservation);
    setReservationErrors(errors);
    if (Object.keys(errors).length > 0 || !reservation.roomType) {
      return;
    }

    setSubmittedReservation({
      name: reservation.name.trim(),
      phone: reservation.phone.trim(),
      roomLabel: INQUIRY_ROOM_LABELS[reservation.roomType],
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      guests: reservation.guests,
      estimatedTotal: estimate ? formatKwanza(estimate.totalAmount) : null,
    });
  };

  const handleResetReservation = () => {
    setSubmittedReservation(null);
    setReservation({
      name: '',
      phone: '',
      roomType: selectedOption,
      checkIn: '',
      checkOut: '',
      guests: '1',
      notes: '',
    });
    setReservationErrors({});
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateContactMessage(contactForm);
    setContactErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmittedContactName(contactForm.name.trim());
    setContactForm({
      name: '',
      contact: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section id="contactos" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <MotionReveal className="max-w-2xl mb-12">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A57F38] font-semibold mb-3">
            Localização e Atendimento
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-[1.15] text-[#0B1D36] [text-wrap:balance]">
            Localização e Contactos
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Estamos localizados no Soyo, a aproximadamente 5 minutos do aeroporto. Entre em
            contacto direto por telefone ou envie o seu pedido para avaliação da nossa recepção.
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Location Details, Direct Call & Map */}
          <MotionReveal className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#F6F7F9] border border-slate-200/80 rounded-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#A57F38]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Endereço
                  </h3>
                  <p className="mt-1 text-base font-medium text-[#0B1D36]">
                    {HOTEL_CONTACT.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-slate-200">
                <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#A57F38]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Telefone · Recepção 24 horas
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-[#0B1D36] tabular-nums">
                    {HOTEL_CONTACT.phoneDisplay}
                  </p>
                  <div className="mt-4">
                    <a
                      href={HOTEL_CONTACT.phoneHref}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#0B1D36] hover:bg-[#132C4E] rounded-sm transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                      <span>Ligar agora ({HOTEL_CONTACT.phoneDisplay})</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="border border-slate-200/90 rounded-sm overflow-hidden bg-[#F6F7F9]">
              <div className="aspect-[16/11] w-full bg-[#EDF0F5] relative">
                <iframe
                  title="Mapa de localização do Hotel Nempanzu no Soyo, Angola"
                  src={HOTEL_CONTACT.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-600 truncate">
                  Rua do Matadouro, Soyo, Zaire
                </span>
                <a
                  href={HOTEL_CONTACT.mapExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1D36] hover:text-[#A57F38] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Abrir mapa</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </MotionReveal>

          {/* Right Column: Dual Forms (Reservation Request & General Contact) */}
          <MotionReveal delay={0.08} className="lg:col-span-7" >
            <div
              id="reservas"
              className="p-6 sm:p-8 lg:p-10 bg-white border border-slate-200 rounded-sm scroll-mt-24"
            >
              {/* Form Switcher */}
              <div
                role="tablist"
                aria-label="Tipo de solicitação"
                className="flex items-center gap-2 p-1 bg-[#F6F7F9] border border-slate-200/80 rounded-sm mb-8"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'reserva'}
                  aria-controls="panel-pedido-reserva"
                  id="tab-pedido-reserva"
                  onClick={() => onTabChange('reserva')}
                  className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    activeTab === 'reserva'
                      ? 'bg-[#0B1D36] text-white'
                      : 'text-slate-600 hover:text-[#0B1D36]'
                  }`}
                >
                  Pedido de Reserva
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'contacto'}
                  aria-controls="panel-formulario-contacto"
                  id="tab-formulario-contacto"
                  onClick={() => onTabChange('contacto')}
                  className={`flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-sm transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                    activeTab === 'contacto'
                      ? 'bg-[#0B1D36] text-white'
                      : 'text-slate-600 hover:text-[#0B1D36]'
                  }`}
                >
                  Formulário de Contacto
                </button>
              </div>

              {/* Panel 1: Reservation Request Form */}
              {activeTab === 'reserva' && (
                <div
                  role="tabpanel"
                  id="panel-pedido-reserva"
                  aria-labelledby="tab-pedido-reserva"
                >
                  {submittedReservation ? (
                    <div
                      role="status"
                      className="p-6 bg-[#F6F7F9] border border-[#C5A059]/60 rounded-sm space-y-5"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-6 h-6 text-[#0B1D36] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <h3 className="font-serif text-2xl font-semibold text-[#0B1D36]">
                            Pedido de disponibilidade registado
                          </h3>
                          <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
                            Obrigado, <strong>{submittedReservation.name}</strong>. O seu pedido
                            foi preparado para análise e <strong>não constitui uma reserva confirmada</strong>.
                            A confirmação final depende da verificação de disponibilidade pela
                            equipa do Hotel Nempanzu através do contacto{' '}
                            <span className="font-semibold tabular-nums">
                              {submittedReservation.phone}
                            </span>
                            .
                          </p>
                        </div>
                      </div>

                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-sm">
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Alojamento / Sala
                          </dt>
                          <dd className="font-semibold text-[#0B1D36] mt-0.5">
                            {submittedReservation.roomLabel}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Hóspedes / Participantes
                          </dt>
                          <dd className="font-semibold text-[#0B1D36] mt-0.5 tabular-nums">
                            {submittedReservation.guests}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Entrada
                          </dt>
                          <dd className="font-semibold text-[#0B1D36] mt-0.5 tabular-nums">
                            {submittedReservation.checkIn}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-wider text-slate-500">
                            Saída
                          </dt>
                          <dd className="font-semibold text-[#0B1D36] mt-0.5 tabular-nums">
                            {submittedReservation.checkOut}
                          </dd>
                        </div>
                        {submittedReservation.estimatedTotal && (
                          <div className="sm:col-span-2 pt-3 border-t border-slate-200">
                            <dt className="text-xs uppercase tracking-wider text-slate-500">
                              Estimativa informativa base
                            </dt>
                            <dd className="font-semibold text-[#0B1D36] mt-0.5 tabular-nums">
                              {submittedReservation.estimatedTotal} (sujeito a confirmação pelo hotel)
                            </dd>
                          </div>
                        )}
                      </dl>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={handleResetReservation}
                          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B1D36] hover:bg-[#132C4E] rounded-sm transition-colors cursor-pointer"
                        >
                          Fazer novo pedido
                        </button>
                        <a
                          href={HOTEL_CONTACT.phoneHref}
                          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0B1D36] border border-slate-300 hover:border-[#0B1D36] rounded-sm transition-colors"
                        >
                          Ligar para a recepção
                        </a>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleReservationSubmit} noValidate className="space-y-5">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-[#0B1D36]">
                          Solicitar reserva ou disponibilidade
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Preencha os dados da sua estadia. Este pedido depende da confirmação do
                          hotel.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="res-name"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Nome completo *
                          </label>
                          <input
                            id="res-name"
                            type="text"
                            required
                            value={reservation.name}
                            onChange={(e) => {
                              setReservation({ ...reservation, name: e.target.value });
                              if (reservationErrors.name) {
                                setReservationErrors({ ...reservationErrors, name: undefined });
                              }
                            }}
                            placeholder="Ex.: António Manuel"
                            aria-invalid={Boolean(reservationErrors.name)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none"
                          />
                          {reservationErrors.name && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {reservationErrors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="res-phone"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Telefone *
                          </label>
                          <input
                            id="res-phone"
                            type="tel"
                            required
                            value={reservation.phone}
                            onChange={(e) => {
                              setReservation({ ...reservation, phone: e.target.value });
                              if (reservationErrors.phone) {
                                setReservationErrors({ ...reservationErrors, phone: undefined });
                              }
                            }}
                            placeholder="Ex.: 928 514 386"
                            aria-invalid={Boolean(reservationErrors.phone)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none tabular-nums"
                          />
                          {reservationErrors.phone && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {reservationErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="res-room-type"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Tipo de quarto / sala *
                          </label>
                          <select
                            id="res-room-type"
                            required
                            value={reservation.roomType}
                            onChange={(e) => {
                              setReservation({
                                ...reservation,
                                roomType: e.target.value as InquiryOptionId | '',
                              });
                              if (reservationErrors.roomType) {
                                setReservationErrors({
                                  ...reservationErrors,
                                  roomType: undefined,
                                });
                              }
                            }}
                            aria-invalid={Boolean(reservationErrors.roomType)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none"
                          >
                            <option value="">Seleccione uma opção</option>
                            {(Object.keys(INQUIRY_ROOM_LABELS) as InquiryOptionId[]).map((id) => (
                              <option key={id} value={id}>
                                {INQUIRY_ROOM_LABELS[id]}
                              </option>
                            ))}
                          </select>
                          {reservationErrors.roomType && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {reservationErrors.roomType}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="res-guests"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Número de hóspedes *
                          </label>
                          <input
                            id="res-guests"
                            type="number"
                            min={1}
                            max={200}
                            required
                            value={reservation.guests}
                            onChange={(e) => {
                              setReservation({ ...reservation, guests: e.target.value });
                              if (reservationErrors.guests) {
                                setReservationErrors({ ...reservationErrors, guests: undefined });
                              }
                            }}
                            aria-invalid={Boolean(reservationErrors.guests)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none tabular-nums"
                          />
                          {reservationErrors.guests && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {reservationErrors.guests}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="res-check-in"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Data de entrada *
                          </label>
                          <input
                            id="res-check-in"
                            type="date"
                            required
                            value={reservation.checkIn}
                            onChange={(e) => {
                              setReservation({ ...reservation, checkIn: e.target.value });
                              if (reservationErrors.checkIn) {
                                setReservationErrors({
                                  ...reservationErrors,
                                  checkIn: undefined,
                                });
                              }
                            }}
                            aria-invalid={Boolean(reservationErrors.checkIn)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none tabular-nums"
                          />
                          {reservationErrors.checkIn && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {reservationErrors.checkIn}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="res-check-out"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Data de saída *
                          </label>
                          <input
                            id="res-check-out"
                            type="date"
                            required
                            value={reservation.checkOut}
                            onChange={(e) => {
                              setReservation({ ...reservation, checkOut: e.target.value });
                              if (reservationErrors.checkOut) {
                                setReservationErrors({
                                  ...reservationErrors,
                                  checkOut: undefined,
                                });
                              }
                            }}
                            aria-invalid={Boolean(reservationErrors.checkOut)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none tabular-nums"
                          />
                          {reservationErrors.checkOut && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {reservationErrors.checkOut}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="res-notes"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                        >
                          Observações adicionais (opcional)
                        </label>
                        <textarea
                          id="res-notes"
                          rows={2}
                          value={reservation.notes}
                          onChange={(e) =>
                            setReservation({ ...reservation, notes: e.target.value })
                          }
                          placeholder="Indique preferência de regime alimentar, early check-in ou necessidades específicas."
                          className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none"
                        />
                      </div>

                      {/* Informational Rate Estimate Strip */}
                      {estimate && (
                        <div className="p-4 bg-[#F6F7F9] border border-slate-200 rounded-sm flex flex-wrap items-center justify-between gap-2 text-sm">
                          <span className="text-slate-700">
                            {estimate.isConference
                              ? 'Tarifa base por reserva da sala:'
                              : `Estimativa base (${estimate.nights} ${
                                  estimate.nights === 1 ? 'noite' : 'noites'
                                }):`}
                          </span>
                          <span className="font-semibold text-[#0B1D36] tabular-nums">
                            {formatKwanza(estimate.totalAmount)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-start gap-2.5 text-xs text-slate-600 pt-1">
                        <Info className="w-4 h-4 text-[#A57F38] shrink-0 mt-0.5" aria-hidden="true" />
                        <p>
                          O envio deste formulário não confirma automaticamente a reserva. A
                          disponibilidade será confirmada pelo Hotel Nempanzu.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0B1D36] bg-[#C5A059] hover:bg-[#D8B979] rounded-sm transition-colors duration-150 cursor-pointer"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Enviar pedido de disponibilidade</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Panel 2: General Contact Form */}
              {activeTab === 'contacto' && (
                <div
                  role="tabpanel"
                  id="panel-formulario-contacto"
                  aria-labelledby="tab-formulario-contacto"
                >
                  {submittedContactName ? (
                    <div
                      role="status"
                      className="p-6 bg-[#F6F7F9] border border-[#C5A059]/60 rounded-sm space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-6 h-6 text-[#0B1D36] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <h3 className="font-serif text-2xl font-semibold text-[#0B1D36]">
                            Mensagem registada
                          </h3>
                          <p className="mt-1.5 text-sm text-slate-700 leading-relaxed">
                            Obrigado pelo seu contacto, <strong>{submittedContactName}</strong>. A
                            nossa equipa responderá com a maior brevidade possível. Para assuntos
                            urgentes, contacte-nos através do telefone{' '}
                            <span className="font-semibold tabular-nums">
                              {HOTEL_CONTACT.phoneDisplay}
                            </span>
                            .
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmittedContactName(null)}
                        className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0B1D36] hover:bg-[#132C4E] rounded-sm transition-colors cursor-pointer"
                      >
                        Enviar outra mensagem
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-[#0B1D36]">
                          Enviar mensagem ao hotel
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Esclareça dúvidas sobre alojamento, eventos empresariais, gastronomia ou
                          serviços adicionais.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Nome *
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => {
                              setContactForm({ ...contactForm, name: e.target.value });
                              if (contactErrors.name) {
                                setContactErrors({ ...contactErrors, name: undefined });
                              }
                            }}
                            placeholder="O seu nome"
                            aria-invalid={Boolean(contactErrors.name)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none"
                          />
                          {contactErrors.name && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {contactErrors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="contact-info"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                          >
                            Telefone ou E-mail *
                          </label>
                          <input
                            id="contact-info"
                            type="text"
                            required
                            value={contactForm.contact}
                            onChange={(e) => {
                              setContactForm({ ...contactForm, contact: e.target.value });
                              if (contactErrors.contact) {
                                setContactErrors({ ...contactErrors, contact: undefined });
                              }
                            }}
                            placeholder="Ex.: 928 514 386 ou e-mail"
                            aria-invalid={Boolean(contactErrors.contact)}
                            className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none"
                          />
                          {contactErrors.contact && (
                            <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                              {contactErrors.contact}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                        >
                          Assunto *
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          required
                          value={contactForm.subject}
                          onChange={(e) => {
                            setContactForm({ ...contactForm, subject: e.target.value });
                            if (contactErrors.subject) {
                              setContactErrors({ ...contactErrors, subject: undefined });
                            }
                          }}
                          placeholder="Ex.: Informações sobre eventos ou grupos"
                          aria-invalid={Boolean(contactErrors.subject)}
                          className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none"
                        />
                        {contactErrors.subject && (
                          <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                            {contactErrors.subject}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D36] mb-1.5"
                        >
                          Mensagem *
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          required
                          value={contactForm.message}
                          onChange={(e) => {
                            setContactForm({ ...contactForm, message: e.target.value });
                            if (contactErrors.message) {
                              setContactErrors({ ...contactErrors, message: undefined });
                            }
                          }}
                          placeholder="Escreva a sua mensagem para a equipa do Hotel Nempanzu..."
                          aria-invalid={Boolean(contactErrors.message)}
                          className="w-full px-3.5 py-2.5 text-sm text-[#0B1D36] bg-white border border-slate-300 rounded-sm focus:border-[#0B1D36] focus:outline-none"
                        />
                        {contactErrors.message && (
                          <p role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
                            {contactErrors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-[#0B1D36] hover:bg-[#132C4E] rounded-sm transition-colors duration-150 cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                        <span>Enviar mensagem</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
