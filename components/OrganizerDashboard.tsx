import React, { useState, useEffect } from 'react';
import { Event, NavigationFn, EventStatus } from '../types';
import { fetchOrganizerEvents } from '../services/mockData';

const StatCard: React.FC<{ title: string; value: string; change?: string }> = ({ title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500 truncate">{title}</h3>
    <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    {change && <p className="text-sm text-green-500">{change} за последний месяц</p>}
  </div>
);

const StatusBadge: React.FC<{ status: EventStatus }> = ({ status }) => {
    const statusClasses: Record<EventStatus, string> = {
        [EventStatus.PUBLISHED]: 'bg-green-100 text-green-800',
        [EventStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
        [EventStatus.DRAFT]: 'bg-gray-100 text-gray-800',
        [EventStatus.CANCELLED]: 'bg-red-100 text-red-800',
        [EventStatus.ARCHIVED]: 'bg-blue-100 text-blue-800',
    };
    const statusText: Record<EventStatus, string> = {
        [EventStatus.PUBLISHED]: 'Опубликовано',
        [EventStatus.PENDING]: 'На модерации',
        [EventStatus.DRAFT]: 'Черновик',
        [EventStatus.CANCELLED]: 'Отменено',
        [EventStatus.ARCHIVED]: 'В архиве',
    };
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
            {statusText[status]}
        </span>
    );
}

interface OrganizerDashboardProps {
    navigate: NavigationFn;
    onAddEventClick: () => void;
}

const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({ navigate, onAddEventClick }) => {
  const [organizerEvents, setOrganizerEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Mocking data for a specific organizer (o2)
    fetchOrganizerEvents('o2').then(data => {
      setOrganizerEvents(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Личный кабинет организатора</h1>
                <p className="text-gray-600 mt-1">С возвращением, Готэм Live!</p>
            </div>
            <div className="mt-4 md:mt-0">
                <button 
                    onClick={onAddEventClick}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Добавить событие
                </button>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Всего просмотров" value="24,567" change="+12.5%" />
          <StatCard title="Клики по билетам" value="1,890" change="+8.2%" />
          <StatCard title="CTR" value="7.69%" />
          <StatCard title="Активные события" value={loading ? '...' : organizerEvents.filter(e => e.status === 'published').length.toString()} />
        </div>

        {/* My Events Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
                 <h2 className="text-xl font-semibold text-gray-900">Мои события</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Событие</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Просмотры</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Редактировать</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                          <tr><td colSpan={5} className="text-center p-8 text-gray-500">Загрузка событий...</td></tr>
                        ) : (
                          organizerEvents.map(event => (
                              <tr key={event.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                      <div className="text-sm text-gray-500">{event.categories[0]?.title?.ru || 'Без категории'}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                      <StatusBadge status={event.status} />
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {new Date(event.startAt).toLocaleDateString('ru-RU')}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {Math.floor(Math.random() * 5000)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <button onClick={() => navigate('event', event.id)} className="text-indigo-600 hover:text-indigo-900">Редакт.</button>
                                  </td>
                              </tr>
                          ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900">Руководство по публикации</h2>
            <p className="mt-2 text-gray-600">Пожалуйста, ознакомьтесь с нашими правилами, чтобы ваше событие быстро прошло модерацию.</p>
            <ul className="mt-4 list-disc list-inside text-gray-600 space-y-1">
                <li>Требуются изображения высокого разрешения (мин. 1200x800px).</li>
                <li>Предоставьте подробное и точное описание.</li>
                <li>Убедитесь, что все ссылки (на билеты, регистрацию) работают корректно.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;