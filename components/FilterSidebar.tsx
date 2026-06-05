import React, { useState, useEffect } from 'react';
import { Category, AgeRating } from '../types';
import { fetchCategories } from '../services/mockData';

interface FilterSidebarProps {
    onFilterChange: (filters: any) => void;
    filters: {
        categories: string[];
        price: 'any' | 'free' | 'paid';
        ageRatings: AgeRating[];
    };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, filters }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories().then(data => {
            setCategories(data);
            setLoading(false);
        });
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const newCategories = checked 
            ? [...filters.categories, value]
            : filters.categories.filter(cat => cat !== value);
        onFilterChange({ categories: newCategories });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ price: e.target.value });
    };
    
    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const newAgeRatings = checked
            ? [...filters.ageRatings, value as AgeRating]
            : filters.ageRatings.filter(age => age !== value);
        onFilterChange({ ageRatings: newAgeRatings });
    };

    const FilterSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
        <div className="py-6 border-b border-gray-200">
            <h3 className="-my-3 flow-root">
                <div className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{title}</span>
                </div>
            </h3>
            <div className="pt-6">{children}</div>
        </div>
    );
    
    return (
        <aside className="lg:col-span-1">
            <h2 className="sr-only">Фильтры</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <FilterSection title="Категория">
                    <div className="space-y-4">
                        {loading ? <p className="text-sm text-gray-500">Загрузка...</p> : categories.map((category) => (
                            <div key={category.id} className="flex items-center">
                                <input id={`filter-category-${category.id}`} name="category[]" value={category.slug} type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" onChange={handleCategoryChange} checked={filters.categories.includes(category.slug)} />
                                <label htmlFor={`filter-category-${category.id}`} className="ml-3 text-sm text-gray-600">{category.title.ru}</label>
                            </div>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Цена">
                     <div className="space-y-4">
                        <div className="flex items-center">
                            <input id="filter-price-any" name="price" type="radio" value="any" checked={filters.price === 'any'} onChange={handlePriceChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-price-any" className="ml-3 text-sm text-gray-600">Любая</label>
                        </div>
                         <div className="flex items-center">
                            <input id="filter-price-free" name="price" type="radio" value="free" checked={filters.price === 'free'} onChange={handlePriceChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-price-free" className="ml-3 text-sm text-gray-600">Бесплатно</label>
                        </div>
                         <div className="flex items-center">
                            <input id="filter-price-paid" name="price" type="radio" value="paid" checked={filters.price === 'paid'} onChange={handlePriceChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="filter-price-paid" className="ml-3 text-sm text-gray-600">Платно</label>
                        </div>
                    </div>
                </FilterSection>

                 <FilterSection title="Возрастной рейтинг">
                     <div className="space-y-4">
                        {Object.values(AgeRating).map((rating) => (
                             <div key={rating} className="flex items-center">
                                <input id={`filter-age-${rating}`} name="age[]" value={rating} type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" onChange={handleAgeChange} checked={filters.ageRatings.includes(rating)} />
                                <label htmlFor={`filter-age-${rating}`} className="ml-3 text-sm text-gray-600">{rating}</label>
                            </div>
                        ))}
                    </div>
                </FilterSection>
            </div>
        </aside>
    );
};

export default FilterSidebar;
