
import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/mockData';
import { NavigationFn, Category } from '../types';

interface FooterProps {
    navigate: NavigationFn;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                         <button onClick={() => navigate('home')} className="flex items-center gap-2">
                             <svg className="h-8 w-8 text-indigo-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <rect x="4" y="5" width="16" height="16" rx="2" />
                                <line x1="16" y1="3" x2="16" y2="7" />
                                <line x1="8" y1="3" x2="8" y2="7" />
                                <line x1="4" y1="11" x2="20" y2="11" />
                                <rect x="8" y="15" width="2" height="2" />
                            </svg>
                            <span className="font-bold text-xl text-white">EventsHub</span>
                        </button>
                        <p className="mt-4 text-gray-400 text-sm">Ваш гид по культурной жизни города.</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Категории</h3>
                        <ul className="mt-4 space-y-2">
                            {categories.length > 0 ? categories.map(cat => (
                                <li key={cat.id}>
                                    <button onClick={() => navigate('catalog')} className="text-base text-gray-400 hover:text-white transition-colors">{cat.title.ru}</button>
                                </li>
                            )) : <li className="text-base text-gray-500">Загрузка...</li>}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">О проекте</h3>
                        <ul className="mt-4 space-y-2">
                           <li><button onClick={() => navigate('about')} className="text-base text-gray-400 hover:text-white transition-colors">Наша миссия</button></li>
                           <li><button onClick={() => navigate('about')} className="text-base text-gray-400 hover:text-white transition-colors">Партнёры</button></li>
                           <li><button onClick={() => navigate('about')} className="text-base text-gray-400 hover:text-white transition-colors">Контакты</button></li>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Организаторам</h3>
                        <ul className="mt-4 space-y-2">
                           <li><button onClick={() => navigate('dashboard')} className="text-base text-gray-400 hover:text-white transition-colors">Личный кабинет</button></li>
                           <li><button onClick={() => navigate('dashboard')} className="text-base text-gray-400 hover:text-white transition-colors">Опубликовать событие</button></li>
                           <li><button onClick={() => navigate('author')} className="text-base text-gray-400 hover:text-white transition-colors">Об авторе</button></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} EventsHub. Все права защищены.</p>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        {/* Social Icons */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
