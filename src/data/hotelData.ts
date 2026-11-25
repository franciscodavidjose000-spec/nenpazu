export type InquiryOptionId =
  | 'single'
  | 'duplo'
  | 'twin'
  | 'suite'
  | 'kimpa-vita'
  | 'nanga';

export interface PhotoAsset {
  id: string;
  src: string;
  title: string;
  description: string;
  alt: string;
  category: Exclude<GalleryCategory, 'Todas'>;
}

export interface RoomInfo {
  id: 'single' | 'duplo' | 'twin' | 'suite';
  name: string;
  priceAmount: number;
  priceLabel: string;
  unitLabel: string;
  description: string;
  photo: PhotoAsset | null;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'conforto' | 'gastronomia' | 'lazer' | 'negocios';
  iconName:
    | 'utensils'
    | 'wine'
    | 'coffee'
    | 'waves'
    | 'wifi'
    | 'car'
    | 'clock'
    | 'bell-ring'
    | 'wind'
    | 'arrow-up-down'
    | 'shirt'
    | 'briefcase'
    | 'presentation'
    | 'sparkles'
    | 'gamepad-2'
    | 'circle-dot'
    | 'trophy'
    | 'trees'
    | 'dumbbell'
    | 'scissors';
}

export interface DiningOption {
  id: string;
  title: string;
  subtitle: string;
  priceLabel?: string;
}

export interface ConferenceRoom {
  id: 'kimpa-vita' | 'nanga';
  name: string;
  priceAmount: number;
  priceLabel: string;
  unitLabel: string;
  description: string;
}

export interface AdditionalRateItem {
  id: string;
  service: string;
  category: 'Regime Alimentar' | 'Check-in Antecipado' | 'Check-out Tardio';
  priceLabel: string;
  unitLabel: string;
}

export type GalleryCategory =
  | 'Todas'
  | 'Fachada e Recepção'
  | 'Quartos'
  | 'Piscina e Lazer'
  | 'Restaurante'
  | 'Áreas Exteriores';

export const CLIENT_PHOTOS = {
  facadeFront: {
    id: 'photo-facade-front',
    src: '/assets/aistudio/hotel_nempanzu_012_7a4ff5ed.jpg',
    title: 'Fachada Principal do Hotel Nempanzu',
    description:
      'Vista frontal da entrada principal do Hotel Nempanzu no Soyo, com alpendre coberto para chegada de hóspedes e envolvente arborizada.',
    alt: 'Fachada principal e entrada exterior do Hotel Nempanzu no Soyo, Província do Zaire',
    category: 'Fachada e Recepção' as const,
  },
  lobbyEntrance: {
    id: 'photo-lobby',
    src: '/assets/aistudio/entry-lobby-to-hotel_d26ef444.jpg',
    title: 'Átrio de Entrada e Recepção',
    description:
      'Espaço amplo de acolhimento com pé-direito duplo, zona de recepção 24 horas e área de estar para hóspedes à chegada.',
    alt: 'Átrio principal e recepção do Hotel Nempanzu com escadaria e zona de espera',
    category: 'Fachada e Recepção' as const,
  },
  poolAerial: {
    id: 'photo-pool-aerial',
    src: '/assets/aistudio/hotel-nempanzu-piscina__1__0d919d04.jpg',
    title: 'Piscina Exterior e Zona de Esplanada',
    description:
      'Área de lazer ao ar livre com piscina exterior, espreguiçadeiras e cabanas cobertas para descanso e convívio.',
    alt: 'Vista elevada da piscina exterior, espreguiçadeiras e bar de apoio do Hotel Nempanzu',
    category: 'Piscina e Lazer' as const,
  },
  courtyardPoolFacade: {
    id: 'photo-courtyard-pool',
    src: '/assets/aistudio/images_299ef3be.jpg',
    title: 'Fachada Interior e Terraço da Piscina',
    description:
      'Perspetiva a partir da esplanada junto à piscina exterior com vista para o edifício principal de alojamento.',
    alt: 'Terraço com mobiliário exterior junto à piscina e vista para o edifício do Hotel Nempanzu',
    category: 'Áreas Exteriores' as const,
  },
  roomDuplo: {
    id: 'photo-room-duplo',
    src: '/assets/aistudio/images__2__5407f6c2.jpg',
    title: 'Quarto Duplo — Hotel Nempanzu',
    description:
      'Acomodação equipada com cama de casal, cabeceira em madeira escura, iluminação ambiente e cortinados opacos para descanso tranquilo.',
    alt: 'Interior do Quarto Duplo do Hotel Nempanzu com cama de casal e secretária',
    category: 'Quartos' as const,
  },
  roomTwin: {
    id: 'photo-room-twin',
    src: '/assets/aistudio/room_182_1761_129ce004.jpg',
    title: 'Quarto Twin — Hotel Nempanzu',
    description:
      'Quarto climatizado com duas camas individuais separadas, área de trabalho dedicada e iluminação acolhedora.',
    alt: 'Interior do Quarto Twin do Hotel Nempanzu com duas camas separadas, ar condicionado e secretária',
    category: 'Quartos' as const,
  },
  restaurantService: {
    id: 'photo-restaurant-service',
    src: '/assets/aistudio/hotel-restaurant_af691316.jpg',
    title: 'Restaurante — Serviço de Buffet e Mesas',
    description:
      'Salão gastronómico do hotel durante o serviço de refeições, com balcão central de buffet e mesas preparadas com toalhas brancas.',
    alt: 'Restaurante do Hotel Nempanzu com balcão de buffet iluminado e mesas postas',
    category: 'Restaurante' as const,
  },
  restaurantHall: {
    id: 'photo-restaurant-hall',
    src: '/assets/aistudio/images__1__a1eb54f5.jpg',
    title: 'Salão de Refeições do Restaurante',
    description:
      'Vista panorâmica da sala de refeições, preparada para acolher o pequeno-almoço, almoços e jantares em formato buffet.',
    alt: 'Vista ampla do salão do restaurante do Hotel Nempanzu com mesas, cadeiras e zona de buffet',
    category: 'Restaurante' as const,
  },
  gamesRoom: {
    id: 'photo-games-room',
    src: '/assets/aistudio/images__4__fd6ed121.jpg',
    title: 'Sala de Jogos, Bilhar e Ténis de Mesa',
    description:
      'Espaço amplo de entretenimento interior equipado com mesas de bilhar, ténis de mesa e sofás para momentos de descontração.',
    alt: 'Sala de jogos do Hotel Nempanzu equipada com duas mesas de bilhar, ténis de mesa e zona de estar',
    category: 'Piscina e Lazer' as const,
  },
  soyoWaterfrontPier: {
    id: 'photo-soyo-pier',
    src: '/assets/aistudio/images__3__99eae48c.jpg',
    title: 'Acesso Fluvial e Paisagem no Soyo',
    description:
      'Passadiço exterior sobre as águas serenas da região do Soyo, refletindo o enquadramento natural e fluvial da envolvente.',
    alt: 'Passadiço de madeira e estrutura metálica sobre o rio na envolvente exterior do Soyo',
    category: 'Áreas Exteriores' as const,
  },
} satisfies Record<string, PhotoAsset>;

export const HOTEL_CONTACT = {
  name: 'HOTEL NEMPANZU',
  tagline: 'Conforto, hospitalidade e uma experiência especial no Soyo.',
  address: 'Rua do Matadouro, Soyo, Província do Zaire, Angola',
  phoneDisplay: '928 514 386',
  phoneHref: 'tel:+244928514386',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Hotel%20Nempanzu%2C%20Rua%20do%20Matadouro%2C%20Soyo%2C%20Angola&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapExternalUrl:
    'https://www.google.com/maps/search/?api=1&query=Hotel+Nempanzu,+Rua+do+Matadouro,+Soyo,+Zaire,+Angola',
} as const;

export const HERO_CONTENT = {
  locationLabel: 'Soyo · Província do Zaire · Angola',
  title: 'Descubra o conforto e a hospitalidade do Hotel Nempanzu',
  subtitle:
    'A sua estadia perfeita no coração do Soyo. Conforto, tranquilidade e uma experiência de hospitalidade inesquecível.',
  primaryCta: 'Conheça os nossos quartos',
  secondaryCta: 'Solicitar reserva',
} as const;

export const ABOUT_PARAGRAPHS = [
  'Bem-vindo ao Hotel Nempanzu, uma joia escondida na encantadora cidade do Soyo. Situado a aproximadamente 5 minutos do aeroporto, o hotel oferece um ambiente acolhedor para viajantes de negócios e lazer.',
  'Com 102 quartos, incluindo opções Single, Duplo, Twin e Suítes, oferece diferentes alternativas de alojamento.',
  'A infraestrutura inclui restaurante, piscina exterior, sala de jogos e espaços para reuniões e conferências.',
  'O Hotel Nempanzu tem o orgulho de oferecer hospitalidade e uma experiência agradável na vibrante cidade do Soyo.',
] as const;

export const ROOMS_DATA: RoomInfo[] = [
  {
    id: 'single',
    name: 'QUARTO SINGLE',
    priceAmount: 97500,
    priceLabel: '97.500 Kz',
    unitLabel: 'por quarto',
    description:
      'Acomodação acolhedora e tranquila para estadias individuais de negócios ou lazer no Soyo.',
    photo: null,
  },
  {
    id: 'duplo',
    name: 'QUARTO DUPLO',
    priceAmount: 106500,
    priceLabel: '106.500 Kz',
    unitLabel: 'por quarto',
    description:
      'Espaço confortável preparado para duas pessoas, combinando descanso e hospitalidade num ambiente sereno.',
    photo: CLIENT_PHOTOS.roomDuplo,
  },
  {
    id: 'twin',
    name: 'QUARTO TWIN',
    priceAmount: 106500,
    priceLabel: '106.500 Kz',
    unitLabel: 'por quarto',
    description:
      'Alojamento funcional com duas camas individuais separadas, ideal para viagens corporativas ou acompanhantes.',
    photo: CLIENT_PHOTOS.roomTwin,
  },
  {
    id: 'suite',
    name: 'SUÍTE',
    priceAmount: 120000,
    priceLabel: '120.000 Kz',
    unitLabel: 'por quarto',
    description:
      'A opção mais distinta do hotel, concebida para hóspedes que privilegiam amplitude, tranquilidade e conforto superior.',
    photo: null,
  },
];

export const LEISURE_PHOTOS: PhotoAsset[] = [
  CLIENT_PHOTOS.poolAerial,
  CLIENT_PHOTOS.gamesRoom,
];

export const DINING_PHOTOS: PhotoAsset[] = [
  CLIENT_PHOTOS.restaurantService,
  CLIENT_PHOTOS.restaurantHall,
];

export const SERVICES_DATA: ServiceItem[] = [
  { id: 'restaurante', name: 'Restaurante', category: 'gastronomia', iconName: 'utensils' },
  { id: 'bar-snack', name: 'Bar e Snack-bar', category: 'gastronomia', iconName: 'wine' },
  { id: 'pequeno-almoco', name: 'Pequeno-almoço', category: 'gastronomia', iconName: 'coffee' },
  { id: 'piscina', name: 'Piscina exterior', category: 'lazer', iconName: 'waves' },
  { id: 'wifi', name: 'Wi-Fi gratuito', category: 'conforto', iconName: 'wifi' },
  { id: 'estacionamento', name: 'Estacionamento', category: 'conforto', iconName: 'car' },
  { id: 'recepcao', name: 'Recepção 24 horas', category: 'conforto', iconName: 'clock' },
  { id: 'servico-quartos', name: 'Serviço de quartos', category: 'conforto', iconName: 'bell-ring' },
  { id: 'ar-condicionado', name: 'Ar condicionado', category: 'conforto', iconName: 'wind' },
  { id: 'elevador', name: 'Elevador', category: 'conforto', iconName: 'arrow-up-down' },
  { id: 'lavandaria', name: 'Lavandaria', category: 'conforto', iconName: 'shirt' },
  { id: 'centro-negocios', name: 'Centro de negócios', category: 'negocios', iconName: 'briefcase' },
  { id: 'salas-conferencias', name: 'Salas de conferências', category: 'negocios', iconName: 'presentation' },
  { id: 'engomadoria', name: 'Serviço de engomadoria', category: 'conforto', iconName: 'sparkles' },
  { id: 'sala-jogos', name: 'Sala de jogos', category: 'lazer', iconName: 'gamepad-2' },
  { id: 'bilhar', name: 'Bilhar', category: 'lazer', iconName: 'circle-dot' },
  { id: 'tenis-mesa', name: 'Ténis de mesa', category: 'lazer', iconName: 'trophy' },
  { id: 'jardim', name: 'Jardim', category: 'lazer', iconName: 'trees' },
  { id: 'ginasio', name: 'Ginásio', category: 'lazer', iconName: 'dumbbell' },
  { id: 'salao-beleza', name: 'Salão de beleza', category: 'lazer', iconName: 'scissors' },
];

export const DINING_OPTIONS: DiningOption[] = [
  {
    id: 'buffet-pequeno-almoco',
    title: 'Buffet de pequeno-almoço',
    subtitle: 'Variedade matinal servida diariamente para começar o dia com tranquilidade.',
  },
  {
    id: 'buffet-almoco',
    title: 'Buffet de almoço',
    subtitle: 'Seleção completa de pratos principais, acompanhamentos e sobremesas.',
    priceLabel: '15.000 Kz',
  },
  {
    id: 'buffet-jantar',
    title: 'Buffet de jantar',
    subtitle: 'Ambiente acolhedor ao final do dia com propostas gastronómicas variadas.',
    priceLabel: '15.000 Kz',
  },
  {
    id: 'servico-refeicoes',
    title: 'Serviço de refeições',
    subtitle: 'Apoio gastronómico contínuo com opções de restaurante, bar, snack-bar e serviço de quartos.',
  },
];

export const CONFERENCE_ROOMS: ConferenceRoom[] = [
  {
    id: 'kimpa-vita',
    name: 'Sala Kimpa Vita',
    priceAmount: 220000,
    priceLabel: '220.000 Kz',
    unitLabel: 'por reserva',
    description:
      'Espaço principal preparado para conferências empresariais, fóruns institucionais e encontros de grande dimensão.',
  },
  {
    id: 'nanga',
    name: 'Sala Nanga',
    priceAmount: 125000,
    priceLabel: '125.000 Kz',
    unitLabel: 'por reserva',
    description:
      'Sala dedicada a reuniões executivas, sessões de trabalho, formações e encontros corporativos no Soyo.',
  },
];

export const ADDITIONAL_RATES: AdditionalRateItem[] = [
  {
    id: 'meia-pensao',
    service: 'Meia pensão',
    category: 'Regime Alimentar',
    priceLabel: '114.000 Kz',
    unitLabel: 'por pessoa/dia',
  },
  {
    id: 'pensao-completa',
    service: 'Pensão completa',
    category: 'Regime Alimentar',
    priceLabel: '135.000 Kz',
    unitLabel: 'por pessoa/dia',
  },
  {
    id: 'early-single',
    service: 'Early check-in Single',
    category: 'Check-in Antecipado',
    priceLabel: '48.750 Kz',
    unitLabel: 'por quarto',
  },
  {
    id: 'early-duplo-twin',
    service: 'Early check-in Duplo/Twin',
    category: 'Check-in Antecipado',
    priceLabel: '53.250 Kz',
    unitLabel: 'por quarto',
  },
  {
    id: 'early-suite',
    service: 'Early check-in Suíte',
    category: 'Check-in Antecipado',
    priceLabel: '60.000 Kz',
    unitLabel: 'por quarto',
  },
  {
    id: 'late-single',
    service: 'Late check-out Single',
    category: 'Check-out Tardio',
    priceLabel: '48.750 Kz',
    unitLabel: 'por quarto',
  },
  {
    id: 'late-duplo-twin',
    service: 'Late check-out Duplo/Twin',
    category: 'Check-out Tardio',
    priceLabel: '53.250 Kz',
    unitLabel: 'por quarto',
  },
  {
    id: 'late-suite',
    service: 'Late check-out Suíte',
    category: 'Check-out Tardio',
    priceLabel: '60.000 Kz',
    unitLabel: 'por quarto',
  },
];

// All 10 unique real client photographs organized honestly by content (no duplicates)
export const GALLERY_PHOTOS: PhotoAsset[] = [
  CLIENT_PHOTOS.facadeFront,
  CLIENT_PHOTOS.lobbyEntrance,
  CLIENT_PHOTOS.poolAerial,
  CLIENT_PHOTOS.courtyardPoolFacade,
  CLIENT_PHOTOS.roomDuplo,
  CLIENT_PHOTOS.roomTwin,
  CLIENT_PHOTOS.restaurantService,
  CLIENT_PHOTOS.restaurantHall,
  CLIENT_PHOTOS.gamesRoom,
  CLIENT_PHOTOS.soyoWaterfrontPier,
];

export const INQUIRY_ROOM_LABELS: Record<InquiryOptionId, string> = {
  single: 'Quarto Single (97.500 Kz / quarto)',
  duplo: 'Quarto Duplo (106.500 Kz / quarto)',
  twin: 'Quarto Twin (106.500 Kz / quarto)',
  suite: 'Suíte (120.000 Kz / quarto)',
  'kimpa-vita': 'Sala Kimpa Vita — Conferências (220.000 Kz / reserva)',
  nanga: 'Sala Nanga — Conferências (125.000 Kz / reserva)',
};
