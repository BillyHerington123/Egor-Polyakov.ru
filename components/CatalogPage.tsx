
import React, { useState, useEffect } from 'react';
import { Event, NavigationFn, Category, AgeRating } from '../types';
import EventCard from './EventCard';
import { fetchFullEvents, fetchCategories } from '../services/mockData';
import FilterSidebar from './FilterSidebar';

const LoadingSkeleton: React.FC<{ count: number }> = () => (
    <>
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-gray-200 animate-pulse h-96"></div>
        ))}
    </>
);

const CatalogPage: React.FC<{ navigate: NavigationFn, initialQuery?: string }> = ({ navigate, initialQuery }) => {
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [visibleCount, setVisibleCount] = useState(9);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialQuery || '');
    const [filters, setFilters] = useState<{
        categories: string[];
        price: 'any' | 'free' | 'paid';
        ageRatings: AgeRating[];
    }>({
        categories: [],
        price: 'any',
        ageRatings: [],
    });

    useEffect(() => {
        setLoading(true);
        fetchFullEvents().then(data => {
            setAllEvents(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (initialQuery !== undefined) {
            setSearchQuery(initialQuery);
        }
    }, [initialQuery]);

    useEffect(() => {
        let events = [...allEvents];

        // Search query filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            events = events.filter(e => 
                e.title.toLowerCase().includes(query) || 
                e.description.toLowerCase().includes(query) ||
                e.venue?.name.toLowerCase().includes(query)
            );
        }

        // Price filter
        if (filters.price === 'free') {
            events = events.filter(e => e.isFree);
        } else if (filters.price === 'paid') {
            events = events.filter(e => !e.isFree);
        }

        // Category filter
        if (filters.categories.length > 0) {
            events = events.filter(event => 
                event.categories.some(cat => filters.categories.includes(cat.slug))
            );
        }

        // Age rating filter
        if (filters.ageRatings.length > 0) {
            events = events.filter(event => filters.ageRatings.includes(event.age));
        }
        
        setFilteredEvents(events);
        setVisibleCount(9); // Reset pagination on filter change
    }, [filters, allEvents, searchQuery]);

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const loadMore = () => {
        setVisibleCount(prevCount => Math.min(prevCount + 9, filteredEvents.length));
    };

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Каталог событий</h1>
                    <p className="mt-2 text-lg text-gray-600">Найдите свое следующее впечатление</p>
                </header>
                
                <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
                    <FilterSidebar onFilterChange={handleFilterChange} filters={filters} />

                    <div className="mt-8 lg:mt-0 lg:col-span-3">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 pb-6 gap-4">
                           <div className="relative w-full sm:max-w-xs">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input 
                                    type="text" 
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                    placeholder="Поиск по названию..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                           </div>
                           <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end">
                                <p className="text-sm text-gray-500 mr-4">{loading ? 'Загрузка...' : `${filteredEvents.length} результатов`}</p>
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Сортировать по</span>
                                    <select className="ml-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
                                        <option>Дате</option>
                                        <option>Популярности</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results Grid */}
                        <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                            {loading ? <LoadingSkeleton count={6} /> : (
                                filteredEvents.length > 0 ? (
                                    filteredEvents.slice(0, visibleCount).map(event => (
                                        <EventCard key={event.id} event={event} navigate={navigate} />
                                    ))
                                ) : (
                                    <div className="sm:col-span-2 xl:col-span-3 text-center py-16">
                                        <h3 className="text-xl font-semibold text-gray-700">Ничего не найдено</h3>
                                        <p className="text-gray-500 mt-2">Попробуйте изменить запрос или фильтры.</p>
                                        {searchQuery && (
                                            <button onClick={() => setSearchQuery('')} className="mt-4 text-indigo-600 font-semibold hover:text-indigo-800">
                                                Очистить поиск
                                            </button>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                        
                        {/* Load More Button */}
                        {!loading && visibleCount < filteredEvents.length && (
                            <div className="mt-12 text-center">
                                <button 
                                    onClick={loadMore}
                                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg"
                                >
                                    Загрузить ещё
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
