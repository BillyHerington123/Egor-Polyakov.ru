
import React, { useState, useEffect } from 'react';
import { AppUser, Event, NavigationFn, UserRole, EventStatus } from '../types';
import { fetchUsers, fetchPendingEvents } from '../services/mockData';

interface AdminDashboardProps {
    navigate: NavigationFn;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate }) => {
    const [activeTab, setActiveTab] = useState<'users' | 'moderation'>('users');
    const [users, setUsers] = useState<AppUser[]>([]);
    const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [usersData, eventsData] = await Promise.all([
                fetchUsers(),
                fetchPendingEvents()
            ]);
            setUsers(usersData);
            setPendingEvents(eventsData);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleRoleChange = (userId: string, newRole: UserRole) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
        // In a real app, this would perform an API call
        alert(`Роль пользователя обновлена на ${newRole}`);
    };

    const handleApproveEvent = (eventId: string) => {
        setPendingEvents(prev => prev.filter(e => e.id !== eventId));
        // In a real app, this would perform an API call
        alert('Событие одобрено и опубликовано');
    };

    const handleRejectEvent = (eventId: string) => {
        setPendingEvents(prev => prev.filter(e => e.id !== eventId));
        // In a real app, this would perform an API call
        alert('Событие отклонено');
    };

    const renderUsersTab = () => (
        <div className="bg-white rounded-lg shadow overflow-hidden">
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Пользователь</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата регистрации</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                                            {user.displayName.charAt(0)}
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.displayName}</div>
                                            <div className="text-xs text-gray-500">ID: {user.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <select 
                                        value={user.role} 
                                        onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value={UserRole.USER}>Пользователь</option>
                                        <option value={UserRole.ORGANIZER}>Организатор</option>
                                        <option value={UserRole.ADMIN}>Администратор</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
    );

    const renderModerationTab = () => (
        <div className="space-y-6">
            {pendingEvents.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                    Нет событий, ожидающих модерации.
                </div>
            ) : (
                pendingEvents.map(event => (
                    <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/4 h-48 md:h-auto">
                             <img src={event.heroMedia?.url || 'https://via.placeholder.com/300'} alt={event.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6 flex flex-col justify-between flex-grow">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Ожидает проверки
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{event.categories[0]?.title.ru} • {new Date(event.startAt).toLocaleDateString('ru-RU')}</p>
                                <p className="mt-4 text-gray-700 line-clamp-2">{event.description}</p>
                                <div className="mt-2 text-sm text-gray-500">
                                    <span className="font-semibold">Организатор:</span> {event.organizer?.name}
                                </div>
                            </div>
                            <div className="mt-6 flex space-x-4">
                                <button 
                                    onClick={() => handleApproveEvent(event.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                >
                                    Одобрить
                                </button>
                                <button 
                                    onClick={() => handleRejectEvent(event.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                                >
                                    Отклонить
                                </button>
                                <button 
                                    onClick={() => navigate('event', event.id)}
                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                                >
                                    Просмотр
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    if (loading) {
        return <div className="container mx-auto p-8 text-center text-gray-500">Загрузка панели администратора...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
                    <p className="text-gray-600 mt-1">Управление пользователями и контентом</p>
                </div>

                <div className="flex space-x-4 mb-6 border-b border-gray-300 pb-1">
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`py-2 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Пользователи
                    </button>
                    <button 
                        onClick={() => setActiveTab('moderation')}
                         className={`py-2 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'moderation' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Модерация ({pendingEvents.length})
                    </button>
                </div>

                {activeTab === 'users' ? renderUsersTab() : renderModerationTab()}
            </div>
        </div>
    );
};

export default AdminDashboard;
