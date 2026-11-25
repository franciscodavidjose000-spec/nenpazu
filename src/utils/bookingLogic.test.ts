import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimatedInquiryTotal,
  calculateNights,
  formatKwanza,
  validateContactMessage,
  validateReservationInquiry,
} from './bookingLogic';

test('formatKwanza formats Angolan Kwanzas with dot thousand separators', () => {
  assert.equal(formatKwanza(97500), '97.500 Kz');
  assert.equal(formatKwanza(106500), '106.500 Kz');
  assert.equal(formatKwanza(120000), '120.000 Kz');
  assert.equal(formatKwanza(220000), '220.000 Kz');
  assert.equal(formatKwanza(15000), '15.000 Kz');
});

test('calculateNights computes exact night spans and rejects invalid ranges', () => {
  assert.equal(calculateNights('2026-12-01', '2026-12-04'), 3);
  assert.equal(calculateNights('2026-12-05', '2026-12-05'), 0);
  assert.equal(calculateNights('2026-12-08', '2026-12-05'), 0);
  assert.equal(calculateNights('', '2026-12-05'), 0);
});

test('calculateEstimatedInquiryTotal multiplies nightly rate for rooms and uses fixed rate for conference rooms', () => {
  const suiteStay = calculateEstimatedInquiryTotal('suite', '2026-12-10', '2026-12-13');
  assert.deepEqual(suiteStay, {
    nights: 3,
    totalAmount: 360000,
    isConference: false,
  });

  const confBooking = calculateEstimatedInquiryTotal('kimpa-vita', '2026-12-10', '2026-12-10');
  assert.deepEqual(confBooking, {
    nights: 1,
    totalAmount: 220000,
    isConference: true,
  });

  assert.equal(calculateEstimatedInquiryTotal('single', '2026-12-10', '2026-12-10'), null);
});

test('validateReservationInquiry catches missing or invalid fields and accepts valid input', () => {
  const invalidErrors = validateReservationInquiry({
    name: '',
    phone: '123',
    roomType: '',
    checkIn: '2026-12-10',
    checkOut: '2026-12-09',
    guests: '0',
  });
  assert.ok(invalidErrors.name);
  assert.ok(invalidErrors.phone);
  assert.ok(invalidErrors.roomType);
  assert.ok(invalidErrors.checkOut);
  assert.ok(invalidErrors.guests);

  const validErrors = validateReservationInquiry({
    name: 'Carlos Mendes',
    phone: '928 514 386',
    roomType: 'duplo',
    checkIn: '2026-12-10',
    checkOut: '2026-12-12',
    guests: '2',
  });
  assert.deepEqual(validErrors, {});
});

test('validateContactMessage accepts phone or email and enforces message length', () => {
  const invalid = validateContactMessage({
    name: 'A',
    contact: 'invalid',
    subject: 'Oi',
    message: 'Curta',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.contact);
  assert.ok(invalid.subject);
  assert.ok(invalid.message);

  const validWithPhone = validateContactMessage({
    name: 'Ana Paula',
    contact: '928 514 386',
    subject: 'Evento Corporativo',
    message: 'Gostaria de obter informações sobre disponibilidade para reunião.',
  });
  assert.deepEqual(validWithPhone, {});

  const validWithEmail = validateContactMessage({
    name: 'João Baptista',
    contact: 'joao@empresa.ao',
    subject: 'Alojamento',
    message: 'Pretendo informações sobre estadia prolongada para equipa.',
  });
  assert.deepEqual(validWithEmail, {});
});
