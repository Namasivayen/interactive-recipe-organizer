import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({ cuisine: '', minRating: '', maxPrepTime: '' });

  useEffect(() => {
    const params = {};
    if (filters.cuisine) params.cuisine = filters.cuisine;
    if (filters.minRating) params.minRating = filters.minRating;
    if (filters.maxPrepTime) params.maxPrepTime = filters.maxPrepTime;
    api.get('/recipes', { params }).then(res => setRecipes(res.data));
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text mb-4">
          🍽️ Discover Recipes
        </h2>
        <p className="text-gray-400 text-lg">Find your next culinary adventure</p>
      </div>
      
      {/* Filters Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 mb-10 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">🔍 Filter Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">🌎 Cuisine</label>
            <input 
              placeholder="e.g. Italian, Indian, Chinese" 
              value={filters.cuisine} 
              onChange={e => setFilters(f => ({ ...f, cuisine: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">⭐ Min Rating</label>
            <input 
              placeholder="1-5" 
              type="number" 
              min="1" 
              max="5" 
              value={filters.minRating} 
              onChange={e => setFilters(f => ({ ...f, minRating: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-semibold">⏱️ Max Prep Time (mins)</label>
            <input 
              placeholder="e.g. 30, 60" 
              type="number" 
              min="0" 
              value={filters.maxPrepTime} 
              onChange={e => setFilters(f => ({ ...f, maxPrepTime: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>
        </div>
      </div>
      
      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">No recipes found. Try adjusting your filters!</p>
          </div>
        ) : (
          recipes.map(r => (
            <Link 
              key={r._id} 
              to={`/recipes/${r._id}`}
              className="group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 border border-gray-700 hover:border-orange-500/50 overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {r.title}
                </h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌎</span>
                    <span className="text-sm">{r.cuisine}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    <span className="text-sm">{r.averageRating ? r.averageRating.toFixed(1) : '0.0'}/5</span>
                  </div>
                  {r.prepTime && (
                    <div className="flex items-center gap-2">
                      <span className="text-xl">⏱️</span>
                      <span className="text-sm">{r.prepTime} mins</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span className="text-orange-500 font-semibold group-hover:text-orange-400 transition-colors">
                    View Recipe →
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;
