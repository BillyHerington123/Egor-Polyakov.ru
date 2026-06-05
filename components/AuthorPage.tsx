
import React from 'react';
import { NavigationFn } from '../types';

interface AuthorPageProps {
    navigate: NavigationFn;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ navigate }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8 border-b pb-4">Об авторе</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-sm uppercase tracking-wide font-semibold text-indigo-600 mb-2">Разработчик</h2>
                        <p className="text-2xl font-bold text-gray-900">Поляков Егор Дмитриевич</p>
                        <p className="text-gray-600 mt-2 font-medium">Группа ДЦПУП23-1</p>
                        <p className="text-gray-600">Финансовый университет при правительстве РФ</p>
                    </div>

                    <div>
                        <h2 className="text-sm uppercase tracking-wide font-semibold text-indigo-600 mb-2">Контакты</h2>
                         <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center gap-3 group">
                                <div className="bg-indigo-50 p-2 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <a href="mailto:d.polyakow2017@yandex.ru" className="hover:text-indigo-600 transition-colors font-medium">d.polyakow2017@yandex.ru</a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="bg-indigo-50 p-2 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </div>
                                <span className="font-medium">89164623895</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="bg-indigo-50 p-2 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                                </div>
                                <span className="font-medium">@Jisatsu47</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-sm uppercase tracking-wide font-semibold text-indigo-600 mb-3">Опыт работы с технологиями</h2>
                     <p className="text-gray-700 mb-6 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                        В ходе разработки данного проекта был получен практический опыт создания современного веб-приложения. 
                        Клиентская часть реализована на <strong>React</strong> с использованием <strong>TypeScript</strong> для обеспечения надежности кода и <strong>Tailwind CSS</strong> для быстрой и гибкой стилизации. 
                        Проект собран с помощью <strong>Vite</strong>. Структура приложения следует принципам компонентного подхода.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'SPA', 'HTML5/CSS3', 'PostgreSQL', 'Express'].map(tech => (
                            <span key={tech} className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-100">
                    <h2 className="text-sm uppercase tracking-wide font-semibold text-indigo-600 mb-4">Даты работы над проектом</h2>
                    <div className="flex items-center justify-start gap-8 text-gray-700">
                        <div className="text-center">
                            <span className="block text-xs text-gray-400 uppercase mb-1">Начало</span>
                            <span className="font-mono font-bold text-lg">03.10.2025</span>
                        </div>
                        <div className="h-px w-12 bg-gray-300"></div>
                        <div className="text-center">
                            <span className="block text-xs text-gray-400 uppercase mb-1">Завершение</span>
                            <span className="font-mono font-bold text-lg">14.12.2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorPage;
