
import { City, Venue, Organizer, Category, Event, Tag, Collection, EventStatus, EventFormat, AgeRating, PriceType, UserRole, AppUser, MediaAsset } from '../types';

const SIMULATED_DELAY = 500; // ms

export const cities: City[] = [
    { id: '1', name: 'Метрополис', country: 'USA', slug: 'metropolis' },
    { id: '2', name: 'Готэм', country: 'USA', slug: 'gotham' },
];

export const venues: Venue[] = [
    { id: 'v1', cityId: '1', name: 'Большой Театр Метрополиса', address: 'ул. Оперная, 123, Метрополис', lat: 34.0522, lng: -118.2437, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'v2', cityId: '1', name: 'Павильон в Центральном Парке', address: 'Парковый проспект, 456, Метрополис', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'v3', cityId: '2', name: 'Музыкальный Холл Готэма', address: 'Бэт-вэй, 789, Готэм', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const organizers: Organizer[] = [
    { id: 'o1', name: 'Совет по искусству Метрополиса', description: 'Продвижение искусства и культуры в Метрополисе.', verified: true, ownerUserId: 'u1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'o2', name: 'Готэм Live!', description: 'Лучшие живые события в Готэме.', verified: true, ownerUserId: 'u2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const allCategories: Category[] = [
    { id: 'c1', slug: 'music', title: { en: 'Music', ru: 'Музыка' } },
    { id: 'c2', slug: 'theatre', title: { en: 'Theatre', ru: 'Театр' } },
    { id: 'c3', slug: 'exhibition', title: { en: 'Exhibition', ru: 'Выставка' } },
    { id: 'c4', slug: 'kids', title: { en: 'For Kids', ru: 'Детям' } },
    { id: 'c5', slug: 'lecture', title: { en: 'Lecture', ru: 'Лекция' } },
];

export const tags: Tag[] = [
    { id: 't1', slug: 'free', title: { en: 'Free', ru: 'Бесплатно' } },
    { id: 't2', slug: 'outdoors', title: { en: 'Outdoors', ru: 'На открытом воздухе' } },
    { id: 't3', slug: 'english', title: { en: 'English', ru: 'Английский' } },
];

export const users: AppUser[] = [
  { id: 'u1', role: UserRole.ORGANIZER, email: 'organizer@email.com', displayName: 'Иван Организатор', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
  { id: 'u2', role: UserRole.ADMIN, email: 'admin@email.com', displayName: 'Анна Администратор', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
  { id: 'u3', role: UserRole.USER, email: 'user@email.com', displayName: 'Петр Посетитель', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
]

export const mediaAssets: MediaAsset[] = [
    { id: 'm1', url: 'https://egor-polyakov.ru/content/img/1.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
    { id: 'm2', url: 'https://egor-polyakov.ru/content/img/2.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
    { id: 'm3', url: 'https://egor-polyakov.ru/content/img/3.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
    { id: 'm4', url: 'https://egor-polyakov.ru/content/img/4.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
    { id: 'm5', url: 'https://egor-polyakov.ru/content/img/5.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
    { id: 'm6', url: 'https://egor-polyakov.ru/content/img/6.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
    { id: 'm7', url: 'https://egor-polyakov.ru/content/img/7.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
    { id: 'm8', url: 'https://egor-polyakov.ru/content/img/8.jpg', mimeType: 'image/jpeg', createdAt: new Date().toISOString() },
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date();
nextWeek.setDate(nextWeek.getDate() + 7);

const allEvents: Event[] = [
    { 
        id: 'e1', 
        cityId: '1', 
        venueId: 'v1', 
        organizerId: 'o1', 
        status: EventStatus.PUBLISHED, 
        format: EventFormat.OFFLINE, 
        slug: 'symphony-of-light', 
        title: 'Симфония света', 
        subtitle: 'Вечер с филармонией Метрополиса',
        description: 'Присоединяйтесь к нам на захватывающем вечере, где Филармонический оркестр Метрополиса исполнит потрясающую подборку классических и современных шедевров. Под руководством знаменитого маэстро Эвелин Рид этот концерт обещает незабываемое путешествие по силе и красоте оркестровой музыки. В программе произведения Бетховена, Моцарта и специальная премьера от местного композитора. Идеальное событие как для ценителей классической музыки, так и для новичков.',
        categoryPrimary: 'c1', 
        age: AgeRating.SIX_PLUS, 
        startAt: new Date().toISOString(), 
        endAt: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
        timezone: 'America/New_York', 
        languageMain: 'ru',
        priceMode: PriceType.PAID,
        priceMin: 1500,
        priceMax: 7000,
        currency: 'RUB',
        isFree: false,
        ticketUrl: '#',
        heroMediaId: 'm1',
        createdBy: 'u1', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
        categories: [allCategories[0]],
        tags: [tags[1]],
    },
    { 
        id: 'e2', 
        cityId: '2', 
        venueId: 'v3', 
        organizerId: 'o2', 
        status: EventStatus.PUBLISHED, 
        format: EventFormat.OFFLINE, 
        slug: 'gotham-jazz-nights', 
        title: 'Джазовые ночи Готэма', 
        subtitle: 'С участием The Midnight Blue Quartet',
        description: 'Погрузитесь в мягкие, душевные звуки джаза в культовом Музыкальном Холле Готэма. На сцену выйдет The Midnight Blue Quartet, чтобы подарить вам выступление, наполненное классическими мелодиями, современными интерпретациями и завораживающими импровизациями. Это событие обязательно к посещению для любителей джаза, оно пройдет в уютной и атмосферной обстановке. Возьмите напиток, расслабьтесь и позвольте музыке унести вас.',
        categoryPrimary: 'c1', 
        age: AgeRating.EIGHTEEN_PLUS, 
        startAt: tomorrow.toISOString(), 
        timezone: 'America/New_York', 
        languageMain: 'en',
        priceMode: PriceType.PAID,
        priceMin: 2500,
        currency: 'RUB',
        isFree: false,
        ticketUrl: '#',
        heroMediaId: 'm2',
        createdBy: 'u2', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
        categories: [allCategories[0]],
        tags: [],
    },
    { 
        id: 'e3', 
        cityId: '1', 
        venueId: 'v2', 
        organizerId: 'o1', 
        status: EventStatus.PUBLISHED, 
        format: EventFormat.OFFLINE, 
        slug: 'shakespeare-in-the-park', 
        title: 'Шекспир в парке: Сон в летнюю ночь', 
        subtitle: 'Волшебное представление под открытым небом',
        description: 'Испытайте магию Шекспира под звездами! Совет по искусству Метрополиса с гордостью представляет "Сон в летнюю ночь" в Павильоне Центрального парка. Эта любимая комедия о любви, магии и проделках оживает благодаря талантливому составу в прекрасной обстановке под открытым небом. Принесите плед и корзину для пикника для поистине очаровательного вечера. Это событие бесплатное и открыто для публики, что делает его идеальным семейным выходом.',
        categoryPrimary: 'c2', 
        age: AgeRating.ZERO_PLUS, 
        startAt: nextWeek.toISOString(), 
        timezone: 'America/New_York', 
        languageMain: 'ru',
        priceMode: PriceType.FREE,
        isFree: true,
        registrationUrl: '#',
        heroMediaId: 'm3',
        createdBy: 'u1', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
        categories: [allCategories[1], allCategories[3]],
        tags: [tags[0], tags[1]],
    },
     { 
        id: 'e4', 
        cityId: '1', 
        organizerId: 'o1', 
        status: EventStatus.PUBLISHED, 
        format: EventFormat.ONLINE, 
        slug: 'intro-to-digital-art', 
        title: 'Онлайн-мастер-класс: Введение в цифровое искусство', 
        description: 'Раскройте свой творческий потенциал, не выходя из дома. Этот онлайн-мастер-класс предназначен для начинающих и охватывает основы цифровой живописи и иллюстрации. Узнайте о программном обеспечении, инструментах и техниках, чтобы начать создавать свои собственные цифровые шедевры. Все, что вам нужно, — это компьютер и страсть к искусству!',
        categoryPrimary: 'c5', 
        age: AgeRating.TWELVE_PLUS, 
        startAt: new Date().toISOString(), 
        timezone: 'America/New_York', 
        languageMain: 'ru',
        priceMode: PriceType.FREE,
        isFree: true,
        registrationUrl: '#',
        heroMediaId: 'm4',
        createdBy: 'u1', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
        categories: [allCategories[4]],
        tags: [tags[0]],
    },
    { 
        id: 'e5', 
        cityId: '2', 
        organizerId: 'o2', 
        status: EventStatus.DRAFT, 
        format: EventFormat.OFFLINE, 
        slug: 'gotham-food-fair-draft', 
        title: 'Гастрономический фестиваль Готэма (Черновик)',
        description: 'Кулинарный праздник разнообразной гастрономической сцены Готэма. (Это черновик события, невидимый для публики).',
        categoryPrimary: 'c5',
        age: AgeRating.ZERO_PLUS, 
        startAt: new Date().toISOString(), 
        timezone: 'America/New_York', 
        languageMain: 'ru',
        priceMode: PriceType.PAID,
        isFree: false,
        heroMediaId: 'm5',
        createdBy: 'u2', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
        categories: [],
        tags: [],
    },
     { 
        id: 'e6', 
        cityId: '1', 
        venueId: 'v1', 
        organizerId: 'o1', 
        status: EventStatus.PUBLISHED, 
        format: EventFormat.OFFLINE, 
        slug: 'modern-sculpture-exhibit', 
        title: 'Выставка современной скульптуры', 
        subtitle: 'Исследуя форму и пространство',
        description: 'Откройте для себя передовые достижения современной скульптуры в галерее Большого Театра Метрополиса. На этой кураторской выставке представлены работы десятка международных художников, которые расширяют границы этого вида искусства. Заставляющий задуматься опыт для любителей искусства.',
        categoryPrimary: 'c3', 
        age: AgeRating.ZERO_PLUS, 
        startAt: new Date().toISOString(), 
        timezone: 'America/New_York', 
        languageMain: 'ru',
        priceMode: PriceType.PAID,
        priceMin: 1000,
        currency: 'RUB',
        isFree: false,
        ticketUrl: '#',
        heroMediaId: 'm6',
        createdBy: 'u1', 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
        categories: [allCategories[2]],
        tags: [],
    },
    {
        id: 'e7',
        cityId: '1',
        venueId: 'v2',
        organizerId: 'o1',
        status: EventStatus.PUBLISHED,
        format: EventFormat.OFFLINE,
        slug: 'kids-story-time',
        title: 'Чтение сказок для детей на выходных',
        subtitle: 'Приключения в мире воображения',
        description: 'Приводите своих малышей (возраст 3-7 лет) на веселое утро с историями, песнями и поделками в Павильоне Центрального парка. Каждую неделю новая тема и новая книга, чтобы разбудить их воображение. Замечательное и бесплатное занятие на выходные для всей семьи.',
        categoryPrimary: 'c4',
        age: AgeRating.ZERO_PLUS,
        startAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        timezone: 'America/New_York',
        languageMain: 'ru',
        priceMode: PriceType.FREE,
        isFree: true,
        registrationUrl: '#',
        heroMediaId: 'm7',
        createdBy: 'u1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        categories: [allCategories[3]],
        tags: [tags[0]]
    },
    {
        id: 'e8',
        cityId: '2',
        organizerId: 'o2',
        status: EventStatus.PUBLISHED,
        format: EventFormat.ONLINE,
        slug: 'public-talk-ai-ethics',
        title: 'Публичная лекция: Этика ИИ',
        subtitle: 'Онлайн-дискуссия с доктором Арисом Торном',
        description: 'Присоединяйтесь к иностранным студентам и местному сообществу на увлекательной онлайн-лекции об этике искусственного интеллекта. Ведущий — доктор Арис Торн из Университета Готэма. На сессии будут рассмотрены моральные вызовы и социальные последствия ИИ. Мероприятие пройдет на английском языке и включает сессию вопросов и ответов. Идеально подходит для студентов и всех, кто интересуется технологиями и философией.',
        categoryPrimary: 'c5',
        age: AgeRating.SIXTEEN_PLUS,
        startAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        timezone: 'America/New_York',
        languageMain: 'en',
        priceMode: PriceType.FREE,
        isFree: true,
        registrationUrl: '#',
        heroMediaId: 'm8',
        createdBy: 'u2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        categories: [allCategories[4]],
        tags: [tags[0], tags[2]]
    },
    {
        id: 'e9',
        cityId: '1',
        venueId: 'v1',
        organizerId: 'o1',
        status: EventStatus.PENDING,
        format: EventFormat.OFFLINE,
        slug: 'underground-techno',
        title: 'Ночной Рейв "Подземка"',
        description: 'Секретная вечеринка в заброшенном метро. Только для своих.',
        categoryPrimary: 'c1',
        age: AgeRating.EIGHTEEN_PLUS,
        startAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        timezone: 'America/New_York',
        languageMain: 'ru',
        priceMode: PriceType.PAID,
        priceMin: 1000,
        currency: 'RUB',
        isFree: false,
        heroMediaId: 'm5',
        createdBy: 'u1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        categories: [allCategories[0]],
        tags: []
    }
];

const allCollections: Collection[] = [
    { id: 'col1', slug: 'weekend-picks', title: { en: 'Best of the Weekend', ru: 'Лучшее на выходных' }, description: 'Главные события этих выходных по мнению нашей редакции.', pinned: true, createdBy: 'u2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), coverImageUrl: 'https://picsum.photos/seed/col1/800/600' },
    { id: 'col2', slug: 'free-events', title: { en: 'Free Events', ru: 'Бесплатные события' }, description: 'Наслаждайтесь городом, не потратив ни копейки.', pinned: true, createdBy: 'u2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), coverImageUrl: 'https://picsum.photos/seed/col2/800/600' },
    { id: 'col3', slug: 'family-fun', title: { en: 'For the Whole Family', ru: 'Для всей семьи' }, description: 'Веселые и увлекательные мероприятия для детей и родителей.', pinned: false, createdBy: 'u2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), coverImageUrl: 'https://picsum.photos/seed/col3/800/600' },
];

const joinEventData = (event: Event): Event => ({
    ...event,
    city: cities.find(c => c.id === event.cityId),
    venue: venues.find(v => v.id === event.venueId),
    organizer: organizers.find(o => o.id === event.organizerId),
    heroMedia: mediaAssets.find(m => m.id === event.heroMediaId),
});

// --- API Simulation Functions ---

export const fetchFullEventDetails = (eventId: string): Promise<Event | undefined> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const event = allEvents.find(e => e.id === eventId);
            if (!event) {
                resolve(undefined);
            } else {
                resolve(joinEventData(event));
            }
        }, SIMULATED_DELAY);
    });
};

export const fetchFullEvents = (): Promise<Event[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const publishedEvents = allEvents
                .filter(e => e.status === EventStatus.PUBLISHED)
                .map(joinEventData);
            resolve(publishedEvents);
        }, SIMULATED_DELAY);
    });
};

export const fetchCollections = (): Promise<Collection[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(allCollections);
        }, SIMULATED_DELAY);
    });
};

export const fetchCategories = (): Promise<Category[]> => {
     return new Promise(resolve => {
        setTimeout(() => {
            resolve(allCategories);
        }, SIMULATED_DELAY);
    });
};

export const fetchOrganizerEvents = (organizerId: string): Promise<Event[]> => {
     return new Promise(resolve => {
        setTimeout(() => {
            resolve(allEvents.filter(e => e.organizerId === organizerId));
        }, SIMULATED_DELAY);
    });
}

export const fetchUsers = (): Promise<AppUser[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([...users]);
        }, SIMULATED_DELAY);
    })
}

export const fetchPendingEvents = (): Promise<Event[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(allEvents.filter(e => e.status === EventStatus.PENDING).map(joinEventData));
        }, SIMULATED_DELAY);
    })
}
