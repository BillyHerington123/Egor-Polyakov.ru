import React, { useState, useEffect } from 'react';
import { Event, NavigationFn } from '../types';
import { fetchFullEventDetails, fetchFullEvents } from '../services/mockData';
import { ICONS } from '../constants';
import EventCard from './EventCard';

interface EventDetailPageProps {
    eventId: string;
    navigate: NavigationFn;
    onBookClick: (event: Event) => void;
}

const LoadingScreen: React.FC = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="h-96 w-full bg-gray-200 rounded-lg"></div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12 mt-12">
            <div className="lg:col-span-2">
                <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-12 w-3/4 bg-gray-200 rounded mt-4"></div>
                <div className="space-y-4 mt-8">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-6 w-5/6 bg-gray-200 rounded"></div>
                    <div className="h-6 w-4/6 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-1">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
        </div>
    </div>
);

const EventDetailPage: React.FC<EventDetailPageProps> = ({ eventId, navigate, onBookClick }) => {
    const [event, setEvent] = useState<Event | null>(null);
    const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            // Ensure we scroll to top on new event ID
            window.scrollTo(0, 0);
            const eventDetails = await fetchFullEventDetails(eventId);
            if(eventDetails) {
                 setEvent(eventDetails);
                 const allEvents = await fetchFullEvents();
                 const relatedEvents = allEvents.filter(e => e.id !== eventId && e.categoryPrimary === eventDetails?.categoryPrimary).slice(0, 3);
                 setSimilarEvents(relatedEvents);
            }
            setLoading(false);
        };
        loadData();
    }, [eventId]);

    if (loading) {
        return <LoadingScreen />;
    }

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700">Событие не найдено</h1>
                    <button onClick={() => navigate('home')} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                        Вернуться на главную
                    </button>
                </div>
            </div>
        );
    }

    const eventDate = new Date(event.startAt);
    const formattedDate = eventDate.toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = eventDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <div className="bg-white">
            {/* Hero Image */}
            <div className="h-64 md:h-96 w-full">
                <img src={event.heroMedia?.url} alt={event.title} className="h-full w-full object-cover" />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
                    {/* Main Content */}
                    <main className="lg:col-span-2">
                        <p className="text-base font-semibold text-indigo-600 uppercase">
                           {event.categories[0]?.title.ru || 'Событие'}
                        </p>
                        <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">{event.title}</h1>
                        {event.subtitle && <p className="mt-4 text-xl text-gray-600">{event.subtitle}</p>}
                        
                        <div className="mt-8 prose prose-lg text-gray-700 max-w-none">
                           <p>{event.description}</p>
                        </div>
                        
                        {/* Organizer Info */}
                        <div className="mt-10 pt-8 border-t border-gray-200">
                             <h3 className="text-2xl font-bold text-gray-900 mb-4">Организатор</h3>
                             <div className="flex items-center">
                                 <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                     {event.organizer?.name.charAt(0)}
                                 </div>
                                 <div className="ml-4">
                                     <div className="text-lg font-medium text-gray-900">{event.organizer?.name}</div>
                                     <div className="text-sm text-gray-500">{event.organizer?.description}</div>
                                 </div>
                             </div>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="mt-12 lg:mt-0 lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            {/* Ticket block */}
                            <div className="bg-gray-50 rounded-xl shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {event.isFree ? 'Бесплатная регистрация' : `Билеты от ${event.priceMin} ₽`}
                                </h2>
                                <button 
                                    onClick={() => onBookClick(event)}
                                    className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow"
                                >
                                    {event.isFree ? 'Зарегистрироваться' : 'Купить билеты'}
                                </button>
                                <div className="mt-6 flex justify-center space-x-6">
                                    <button className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
                                        {ICONS.share}
                                        <span className="text-sm mt-1">Поделиться</span>
                                    </button>
                                    <button className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
                                        {ICONS.addCalendar}
                                        <span className="text-sm mt-1">В календарь</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Details block */}
                            <div className="bg-gray-50 rounded-xl shadow-md p-6">
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start">
                                        <div className="text-indigo-600 mt-1 mr-4 shrink-0">{ICONS.calendar}</div>
                                        <div>
                                            <p className="font-semibold">{formattedDate}</p>
                                            <p className="text-sm text-gray-500">{formattedTime} ({event.timezone})</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="text-indigo-600 mt-1 mr-4 shrink-0">{ICONS.location}</div>
                                        <div>
                                            <p className="font-semibold">{event.venue?.name || 'Онлайн-событие'}</p>
                                            <p className="text-sm text-gray-500">{event.venue?.address}</p>
                                        </div>
                                    </li>
                                </ul>
                                {event.venue?.lat && event.venue?.lng && (
                                  <div className="mt-4 h-48 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                                    Карта
                                  </div>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Similar Events */}
                {similarEvents.length > 0 && (
                     <div className="mt-20 pt-12 border-t border-gray-200">
                         <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Похожие события</h2>
                         <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                             {similarEvents.map(similarEvent => (
                                 <EventCard key={similarEvent.id} event={similarEvent} navigate={navigate} />
                             ))}
                         </div>
                     </div>
                )}
            </div>
        </div>
    );
};

export default EventDetailPage;
