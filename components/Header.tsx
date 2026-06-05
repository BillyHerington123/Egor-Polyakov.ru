
import React, { useState } from 'react';
import { NavigationFn } from '../types';

interface HeaderProps {
    navigate: NavigationFn;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigate, onLoginClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Check if user has admin role via URL parameter
    const searchParams = new URLSearchParams(window.location.search);
    const isAdmin = searchParams.get('role') === 'admin';

    const navLinks = [
        { name: 'Главная', page: 'home' as const },
        { name: 'Каталог', page: 'catalog' as const },
        { name: 'Организаторам', page: 'dashboard' as const },
        ...(isAdmin ? [{ name: 'Админка', page: 'admin' as const }] : []),
        { name: 'О проекте', page: 'about' as const },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => navigate('home')} className="flex-shrink-0 flex items-center gap-2">
                             <svg className="h-8 w-8 text-indigo-600" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"/>
                                <rect x="4" y="5" width="16" height="16" rx="2" />
                                <line x1="16" y1="3" x2="16" y2="7" />
                                <line x1="8" y1="3" x2="8" y2="7" />
                                <line x1="4" y1="11" x2="20" y2="11" />
                                <rect x="8" y="15" width="2" height="2" />
                            </svg>
                            <span className="font-bold text-xl text-gray-800">EventsHub</span>
                        </button>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                             <button
                                key={link.name}
                                onClick={() => navigate(link.page)}
                                className="font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>
                     <div className="hidden md:block">
                        <button onClick={onLoginClick} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-transform hover:scale-105">
                            Войти
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Открыть главное меню</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                             <button
                                key={link.name}
                                onClick={() => { navigate(link.page); setIsMenuOpen(false); }}
                                className="w-full text-left font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base"
                            >
                                {link.name}
                            </button>
                        ))}
                         <div className="px-3 pt-4 pb-2">
                             <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700">
                                Войти
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
