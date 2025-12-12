import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import RecipeForm from '../components/RecipeForm';
import CommentThread from '../components/CommentThread';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState('');
  const [favStatus, setFavStatus] = useState(null);
  const [rateMsg, setRateMsg] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/recipes/${id}`).then(res => setRecipe(res.data)).catch(() => setError('Recipe not found'));
    if (user) {
      api.get(`/auth/profile`).then(res => {
        setFavStatus(res.data.favorites?.includes(id));
      });
    }
  }, [id, user]);

  const handleRate = async () => {
    if (!rating) return setRateMsg('Select a rating');
    try {
      const res = await api.post(`/recipes/${id}/rate`, { value: Number(rating) });
      setRateMsg('Rated successfully!');
      setRecipe(r => ({ ...r, averageRating: res.data.averageRating }));
    } catch {
      setRateMsg('Rating failed');
    }
  };

  const handleFavourite = async () => {
    try {
      const res = await api.post(`/recipes/${id}/favorite`);
      setFavStatus(s => !s);
      setRateMsg(res.data.message);
    } catch {
      setRateMsg('Failed to update favourites');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await api.delete(`/recipes/${id}`);
      navigate('/');
    } catch {
      setError('Delete failed');
    }
  };

  if (error) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-red-500/20 border border-red-500 text-red-200 px-8 py-6 rounded-xl text-center">
        <div className="text-5xl mb-4">❌</div>
        <div className="text-xl">{error}</div>
      </div>
    </div>
  );
  
  if (!recipe) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🍳</div>
        <div className="text-xl text-gray-400">Loading recipe...</div>
      </div>
    </div>
  );
  
  if (editing) return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-3xl border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Edit Recipe</h1>
        <RecipeForm initial={recipe} recipeId={id} />
      </div>
    </section>
  );

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
            {recipe.title}
          </h1>
          <p className="text-lg text-gray-300 italic">{recipe.description}</p>
        </div>
        
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30 text-center">
            <div className="text-3xl mb-2">🌎</div>
            <div className="text-sm text-gray-400 mb-1">Cuisine</div>
            <div className="font-bold text-white">{recipe.cuisine}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-sm text-gray-400 mb-1">Prep Time</div>
            <div className="font-bold text-white">{recipe.prepTime} min</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-sm text-gray-400 mb-1">Rating</div>
            <div className="font-bold text-white">{recipe.averageRating ? recipe.averageRating.toFixed(1) : '0.0'}/5</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30 text-center">
            <div className="text-3xl mb-2">🥗</div>
            <div className="text-sm text-gray-400 mb-1">Diet Tags</div>
            <div className="font-bold text-white text-xs">{recipe.dietTags?.join(', ') || 'None'}</div>
          </div>
        </div>
        {/* Ingredients */}
        <div className="mb-8 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🧂</span> Ingredients
          </h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((i, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-200">
                <span className="text-orange-500 text-xl">•</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Steps */}
        <div className="mb-8 bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📍</span> Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.steps.map((s, idx) => (
              <li key={idx} className="flex gap-4 text-gray-200">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {idx + 1}
                </span>
                <span className="flex-1 pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        {/* Actions */}
        {user && (
          <div className="space-y-6 mb-8">
            {/* Rating Section */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/30">
              <h4 className="font-semibold text-white mb-4 text-lg">⭐ Rate this recipe</h4>
              <div className="flex flex-wrap gap-3 items-center">
                {[1,2,3,4,5].map(val => (
                  <button
                    key={val}
                    className={`w-12 h-12 rounded-full font-bold text-lg transition-all transform hover:scale-110 ${
                      Number(rating) === val 
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                    onClick={() => setRating(val)}
                  >{val}</button>
                ))}
                <button 
                  onClick={handleRate} 
                  className="ml-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-yellow-500/50 transition-all transform hover:scale-105"
                >
                  Submit Rating
                </button>
              </div>
              {rateMsg && <div className="mt-3 text-yellow-300 text-sm font-semibold">{rateMsg}</div>}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleFavourite} 
                className={`flex-1 min-w-[200px] px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                  favStatus 
                    ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg hover:shadow-pink-500/50' 
                    : 'bg-gray-800 text-white hover:bg-gray-700 border-2 border-gray-700'
                }`}
              >
                {favStatus ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
              </button>
              
              {user._id === recipe.authorId && (
                <>
                  <button 
                    onClick={() => setEditing(true)} 
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
                  >
                    ✏️ Edit Recipe
                  </button>
                  <button 
                    onClick={handleDelete} 
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold rounded-xl shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105"
                  >
                    🗑️ Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        <CommentThread recipeId={id} />
      </div>
    </section>
  );
};

export default RecipeDetails;
