import React from 'react';
import { Event, NavigationFn } from '../types';
import { ICONS } from '../constants';

interface EventCardProps {
  event: Event;
  navigate: NavigationFn;
}

const EventCard: React.FC<EventCardProps> = ({ event, navigate }) => {
  const eventDate = new Date(event.startAt);
  const formattedDate = eventDate.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });

  const handleCardClick = () => {
    navigate('event', event.id);
  };
  
  return (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer group flex flex-col"
        onClick={handleCardClick}
    >
      <div className="relative">
        <img className="h-48 w-full object-cover" src={event.heroMedia?.url} alt={event.title} />
        <div className="absolute top-0 right-0 bg-white/80 backdrop-blur-sm px-3 py-1 m-2 rounded-full text-sm font-semibold text-gray-800">
          {formattedDate}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
            {event.categories[0]?.title.ru || 'Событие'}
        </p>
        <h3 className="mt-1 text-lg leading-tight font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
            {event.title}
        </h3>
        <div className="mt-2 text-sm text-gray-500 flex-grow">
           <div className="flex items-center mb-1">
                <span className="mr-2 shrink-0">{ICONS.location}</span>
                <span>{event.venue?.name || (event.format === 'online' ? 'Онлайн' : 'Место проведения уточняется')}</span>
            </div>
             <div className="flex items-center">
                <span className="mr-2 shrink-0">{ICONS.calendar}</span>
                <span>{formattedTime}</span>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <p className="text-lg font-bold text-indigo-600">
            {event.isFree ? 'Бесплатно' : `от ${event.priceMin} ₽`}
          </p>
          <button className="text-sm font-semibold text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;