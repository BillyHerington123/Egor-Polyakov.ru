
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CatalogPage from './components/CatalogPage';
import EventDetailPage from './components/EventDetailPage';
import OrganizerDashboard from './components/OrganizerDashboard';
import AuthorPage from './components/AuthorPage';
import AdminDashboard from './components/AdminDashboard';
import Modal from './components/Modal';
import { Page, NavigationFn, Event } from './types';

const AboutPage: React.FC<{navigate: NavigationFn}> = ({navigate}) => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">О проекте</h1>
        <div className="mt-8 prose prose-lg text-gray-700 max-w-none">
            <h2>Наша миссия</h2>
            <p>Наша миссия — соединять людей с яркой культурной жизнью их города. Мы верим, что искусство, музыка и общественные мероприятия необходимы для процветающего общества, и стремимся сделать этот опыт доступным для всех.</p>
            
            <h2>Партнёры</h2>
            <p>Мы гордимся партнерством с ведущими культурными учреждениями, местными художниками и организаторами мероприятий, чтобы предоставлять вам самые полные и актуальные афиши.</p>

            <h2>Контакты</h2>
            <p>Есть вопросы или хотите стать партнером? Напишите нам по адресу <a href="mailto:contact@eventshub.com">contact@eventshub.com</a>.</p>
        </div>
    </div>
);

// --- Form Components for Modals ---

const LoginForm: React.FC<{onClose: () => void}> = ({onClose}) => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setSubmitted(false);
        }, 2000);
    };

    if (submitted) {
        return <div className="text-center p-8"><h3 className="text-xl font-semibold text-green-600">Вы успешно вошли!</h3><p className="text-gray-600 mt-2">Перенаправляем вас...</p></div>
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
             <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                <input type="password" name="password" id="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors">Войти</button>
            <p className="text-center text-sm text-gray-500 pt-2">Нет аккаунта? <button type="button" className="text-indigo-600 hover:text-indigo-800 font-medium">Зарегистрироваться</button></p>
        </form>
    );
};

const RegistrationForm: React.FC<{event: Event, onClose: () => void}> = ({ event, onClose }) => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setSubmitted(false);
        }, 2000);
    };

    if (submitted) {
        return <div className="text-center p-8"><h3 className="text-xl font-semibold text-green-600">Спасибо за регистрацию!</h3><p className="text-gray-600 mt-2">Детали отправлены вам на почту.</p></div>
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600 pb-2 border-b border-gray-200">Вы регистрируетесь на событие <br/><strong className="font-semibold text-gray-800">"{event.title}"</strong></p>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ваше имя</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
                <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="reg-email" id="reg-email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
             <div>
                <label className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" required />
                    <span className="ml-2 text-sm text-gray-600">Я согласен с правилами обработки персональных данных</span>
                </label>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors">Зарегистрироваться</button>
        </form>
    );
};

const PurchaseForm: React.FC<{event: Event, onClose: () => void}> = ({ event, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const price = event.priceMin || 0;
    const totalPrice = price * quantity;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setSubmitted(false);
        }, 2000);
    };

    if (submitted) {
        return <div className="text-center p-8"><h3 className="text-xl font-semibold text-green-600">Оплата прошла успешно!</h3><p className="text-gray-600 mt-2">Билеты отправлены вам на почту.</p></div>
    }
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-600">Вы покупаете билет на <strong className="font-semibold text-gray-800">"{event.title}"</strong></p>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Количество</label>
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600">-</button>
                    <input type="number" name="quantity" id="quantity" min="1" max="10" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-12 px-1 py-1 bg-transparent text-center font-semibold border-none focus:ring-0"/>
                    <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600">+</button>
                </div>
            </div>
             <div className="text-right font-bold text-xl text-gray-800">Итого: {totalPrice} ₽</div>
             <hr className="border-gray-200"/>
            <div>
                <label htmlFor="buy-name" className="block text-sm font-medium text-gray-700">Ваше имя</label>
                <input type="text" name="buy-name" id="buy-name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div>
                <label htmlFor="buy-email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="buy-email" id="buy-email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            </div>
            <div className="pt-2">
                 <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Банковская карта</p>
                <div className="p-4 bg-gray-50 border border-gray-300 rounded-md relative overflow-hidden">
                    <div className="flex justify-between mb-4">
                        <div className="h-8 w-12 bg-blue-900/20 rounded"></div>
                        <div className="h-8 w-8 bg-yellow-500/20 rounded-full"></div>
                    </div>
                    <div className="mb-4 font-mono text-lg tracking-widest text-gray-600">
                        •••• •••• •••• 4242
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="text-xs text-gray-500">CARD HOLDER NAME</div>
                        <div className="text-xs text-gray-500">MM/YY</div>
                    </div>
                </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors text-lg shadow-md">Оплатить {totalPrice} ₽</button>
        </form>
    );
}

const AddEventForm: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Событие отправлено!</h3>
                <p className="mt-2 text-gray-500">Ваше событие успешно отправлено на модерацию. <br/>Оно появится в каталоге после проверки.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto px-1">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Название события</label>
                <input type="text" id="title" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Например: Джазовый вечер" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Начало</label>
                    <input type="datetime-local" id="date" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Категория</label>
                    <select id="category" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Музыка</option>
                        <option>Театр</option>
                        <option>Выставка</option>
                        <option>Детям</option>
                        <option>Лекция</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Место проведения</label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <input type="text" id="location" required className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Готэм, Музыкальный холл" />
                </div>
            </div>

             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Цена (₽)</label>
                    <input type="number" id="price" min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0" />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">URL Обложки</label>
                    <input type="url" id="image" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="https://..." />
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
                <textarea id="description" rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Расскажите подробнее о мероприятии..."></textarea>
            </div>

            <div className="pt-2">
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
                    {loading ? (
                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : null}
                    {loading ? 'Публикация...' : 'Опубликовать событие'}
                </button>
            </div>
        </form>
    );
};


const App: React.FC = () => {
    const [page, setPage] = useState<Page>({ name: 'home' });
    const [activeModal, setActiveModal] = useState<{type: 'login' | 'register' | 'purchase' | 'addEvent', event?: Event} | null>(null);

    const navigate: NavigationFn = (pageName, id, query) => {
        setPage({ name: pageName, id, query });
        window.scrollTo(0, 0);
    };

    const handleBookClick = (event: Event) => {
        const type = event.isFree ? 'register' : 'purchase';
        setActiveModal({ type, event });
    }

    const renderModalContent = () => {
        if (!activeModal) return null;

        switch (activeModal.type) {
            case 'login':
                return <LoginForm onClose={() => setActiveModal(null)} />;
            case 'register':
                if (!activeModal.event) return null;
                return <RegistrationForm event={activeModal.event} onClose={() => setActiveModal(null)} />;
            case 'purchase':
                if (!activeModal.event) return null;
                return <PurchaseForm event={activeModal.event} onClose={() => setActiveModal(null)} />;
            case 'addEvent':
                return <AddEventForm onClose={() => setActiveModal(null)} />;
            default:
                return null;
        }
    };

    const getModalTitle = () => {
        if (!activeModal) return '';
        switch (activeModal.type) {
            case 'login': return 'Вход в личный кабинет';
            case 'register': return 'Регистрация на событие';
            case 'purchase': return 'Покупка билета';
            case 'addEvent': return 'Новое событие';
            default: return '';
        }
    };

    const renderPage = () => {
        switch (page.name) {
            case 'home':
                return <HomePage navigate={navigate} />;
            case 'catalog':
                return <CatalogPage navigate={navigate} initialQuery={page.query} />;
            case 'event':
                return page.id ? <EventDetailPage eventId={page.id} navigate={navigate} onBookClick={handleBookClick} /> : <HomePage navigate={navigate} />;
            case 'dashboard':
                return <OrganizerDashboard navigate={navigate} onAddEventClick={() => setActiveModal({type: 'addEvent'})} />;
            case 'about':
                return <AboutPage navigate={navigate}/>;
            case 'author':
                return <AuthorPage navigate={navigate} />;
            case 'admin':
                return <AdminDashboard navigate={navigate} />;
            default:
                return <HomePage navigate={navigate} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)} title={getModalTitle()}>
              {renderModalContent()}
            </Modal>
            <Header navigate={navigate} onLoginClick={() => setActiveModal({type: 'login'})} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer navigate={navigate} />
        </div>
    );
};

export default App;
