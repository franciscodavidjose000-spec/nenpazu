import { CONFERENCE_ROOMS, ROOMS_DATA, type InquiryOptionId } from '../data/hotelData';

export interface ReservationInquiryInput {
  name: string;
  phone: string;
  roomType: InquiryOptionId | '';
  checkIn: string;
  checkOut: string;
  guests: string;
  notes?: string;
}

export interface ContactMessageInput {
  name: string;
  contact: string;
  subject: string;
  message: string;
}

export type ValidationErrors<T extends string = string> = Partial<Record<T, string>>;

export function formatKwanza(amount: number): string {
  const safe = Math.max(0, Math.round(amount));
  const formatted = safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formatted} Kz`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T00:00:00Z`);
  const end = new Date(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  const diffMs = end.getTime() - start.getTime();
  const nights = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 0;
}

export function getInquiryUnitRate(optionId: InquiryOptionId | ''): number | null {
  if (!optionId) return null;
  const room = ROOMS_DATA.find((r) => r.id === optionId);
  if (room) return room.priceAmount;
  const conf = CONFERENCE_ROOMS.find((c) => c.id === optionId);
  if (conf) return conf.priceAmount;
  return null;
}

export function isConferenceOption(optionId: InquiryOptionId | ''): boolean {
  return optionId === 'kimpa-vita' || optionId === 'nanga';
}

export function calculateEstimatedInquiryTotal(
  optionId: InquiryOptionId | '',
  checkIn: string,
  checkOut: string
): { nights: number; totalAmount: number; isConference: boolean } | null {
  const unitRate = getInquiryUnitRate(optionId);
  if (unitRate === null || !optionId) return null;

  if (isConferenceOption(optionId)) {
    return {
      nights: 1,
      totalAmount: unitRate,
      isConference: true,
    };
  }

  const nights = calculateNights(checkIn, checkOut);
  if (nights <= 0) return null;

  return {
    nights,
    totalAmount: unitRate * nights,
    isConference: false,
  };
}

export function countPhoneDigits(phone: string): number {
  return phone.replace(/\D/g, '').length;
}

export function validateReservationInquiry(
  input: ReservationInquiryInput
): ValidationErrors<keyof ReservationInquiryInput> {
  const errors: ValidationErrors<keyof ReservationInquiryInput> = {};

  if (!input.name.trim() || input.name.trim().length < 2) {
    errors.name = 'Por favor, indique o seu nome completo.';
  }

  const digits = countPhoneDigits(input.phone);
  if (digits < 9) {
    errors.phone = 'Indique um número de telefone válido (mínimo 9 dígitos).';
  }

  if (!input.roomType) {
    errors.roomType = 'Seleccione o tipo de quarto ou sala pretendida.';
  }

  if (!input.checkIn) {
    errors.checkIn = 'Seleccione a data de entrada.';
  }

  if (!input.checkOut) {
    errors.checkOut = 'Seleccione a data de saída.';
  } else if (input.checkIn && !isConferenceOption(input.roomType)) {
    const nights = calculateNights(input.checkIn, input.checkOut);
    if (nights <= 0) {
      errors.checkOut = 'A data de saída deve ser posterior à data de entrada.';
    }
  } else if (input.checkIn && isConferenceOption(input.roomType)) {
    const start = new Date(`${input.checkIn}T00:00:00Z`).getTime();
    const end = new Date(`${input.checkOut}T00:00:00Z`).getTime();
    if (Number.isNaN(start) || Number.isNaN(end) || end < start) {
      errors.checkOut = 'A data de término não pode ser anterior à data de início.';
    }
  }

  const guestsNum = Number(input.guests);
  if (!input.guests || Number.isNaN(guestsNum) || guestsNum < 1 || !Number.isInteger(guestsNum)) {
    errors.guests = 'Indique um número válido de hóspedes (mínimo 1).';
  }

  return errors;
}

export function validateContactMessage(
  input: ContactMessageInput
): ValidationErrors<keyof ContactMessageInput> {
  const errors: ValidationErrors<keyof ContactMessageInput> = {};

  if (!input.name.trim() || input.name.trim().length < 2) {
    errors.name = 'Por favor, indique o seu nome.';
  }

  const trimmedContact = input.contact.trim();
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
  const hasPhone = countPhoneDigits(trimmedContact) >= 9;
  if (!trimmedContact || (!hasEmail && !hasPhone)) {
    errors.contact = 'Indique um telefone (9+ dígitos) ou endereço de e-mail válido.';
  }

  if (!input.subject.trim() || input.subject.trim().length < 3) {
    errors.subject = 'Indique o assunto do contacto.';
  }

  if (!input.message.trim() || input.message.trim().length < 10) {
    errors.message = 'Escreva uma mensagem com pelo menos 10 caracteres.';
  }

  return errors;
}
