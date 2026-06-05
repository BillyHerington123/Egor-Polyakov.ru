
import React, { useState, useEffect } from 'react';
import { Collection, Event, NavigationFn } from '../types';
import EventCard from './EventCard';
import { fetchCollections, fetchFullEvents } from '../services/mockData';

interface HomePageProps {
    navigate: NavigationFn;
}

const SearchBar: React.FC<{ navigate: NavigationFn }> = ({ navigate }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        navigate('catalog', undefined, query);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-white rounded-full shadow-lg p-2 flex items-center w-full max-w-2xl mx-auto">
            <input 
                type="text" 
                placeholder="Поиск событий..." 
                className="flex-grow bg-transparent px-4 text-gray-700 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button 
                onClick={handleSearch}
                className="bg-indigo-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Найти</span>
            </button>
        </div>
    );
};

const QuickFilters: React.FC<{ navigate: NavigationFn }> = ({ navigate }) => {
    const filters = ['Сегодня', 'Завтра', 'Выходные', 'Бесплатно', 'С детьми', 'Рядом'];
    return (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
            {filters.map(filter => (
                <button 
                    key={filter} 
                    onClick={() => navigate('catalog')}
                    className="bg-white/50 backdrop-blur-sm text-gray-800 font-semibold py-2 px-4 rounded-full shadow-sm hover:bg-white transition-colors"
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

const CollectionCard: React.FC<{ collection: Collection, navigate: NavigationFn }> = ({ collection, navigate }) => (
    <div 
        onClick={() => navigate('catalog')}
        className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group h-64"
    >
        <img src={collection.coverImageUrl} alt={collection.title.ru} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-2xl font-bold">{collection.title.ru}</h3>
            <p className="text-sm mt-1">{collection.description}</p>
        </div>
    </div>
);

const LoadingSkeleton: React.FC<{ count: number, type: 'collection' | 'event' }> = ({ count, type }) => {
    const Card = () => (
        <div className={`rounded-xl bg-gray-200 animate-pulse ${type === 'collection' ? 'h-64' : 'h-96'}`}></div>
    );
    return (
        <>
            {Array.from({ length: count }).map((_, i) => <Card key={i} />)}
        </>
    );
};


const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [eventsData, collectionsData] = await Promise.all([
                fetchFullEvents(),
                fetchCollections()
            ]);
            setEvents(eventsData);
            setCollections(collectionsData);
            setLoading(false);
        };
        loadData();
    }, []);

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative pt-16 pb-20 text-center bg-gradient-to-b from-indigo-100 to-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                        Откройте для себя культурные события
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
                        Ваш портал в мир музыки, театра, выставок и многого другого в вашем городе.
                    </p>
                    <div className="mt-8">
                        <SearchBar navigate={navigate} />
                        <QuickFilters navigate={navigate} />
                    </div>
                </div>
            </div>

            {/* Editor's Collections */}
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Подборки редакции</h2>
                    <div className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {loading ? <LoadingSkeleton count={3} type="collection" /> : (
                            collections.filter(c => c.pinned).map(collection => (
                               <CollectionCard key={collection.id} collection={collection} navigate={navigate} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Популярные события</h2>
                     <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {loading ? <LoadingSkeleton count={8} type="event" /> : (
                            events.slice(0, 8).map(event => (
                                <EventCard key={event.id} event={event} navigate={navigate} />
                            ))
                        )}
                    </div>
                    <div className="mt-12 text-center">
                        <button 
                            onClick={() => navigate('catalog')}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg"
                        >
                            Смотреть все события
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
