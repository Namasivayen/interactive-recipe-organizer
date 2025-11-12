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
    <div>
      <h2>Recipes</h2>
      <div>
        <input placeholder="Cuisine" value={filters.cuisine} onChange={e => setFilters(f => ({ ...f, cuisine: e.target.value }))} />
        <input placeholder="Min Rating" type="number" min="1" max="5" value={filters.minRating} onChange={e => setFilters(f => ({ ...f, minRating: e.target.value }))} />
        <input placeholder="Max Prep Time" type="number" min="0" value={filters.maxPrepTime} onChange={e => setFilters(f => ({ ...f, maxPrepTime: e.target.value }))} />
      </div>
      <ul>
        {recipes.map(r => (
          <li key={r._id}>
            <Link to={`/recipes/${r._id}`}>{r.title}</Link> ({r.cuisine}) - {r.averageRating || 0}/5
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
