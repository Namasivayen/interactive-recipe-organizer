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

  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Loading...</div>;
  if (editing) return <RecipeForm initial={recipe} recipeId={id} />;

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-white text-center">{recipe.title}</h2>
        <div className="mb-4 text-gray-300 text-center">{recipe.description}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><span className="font-semibold text-gray-400">Cuisine:</span> {recipe.cuisine}</div>
          <div><span className="font-semibold text-gray-400">Prep Time:</span> {recipe.prepTime} min</div>
          <div><span className="font-semibold text-gray-400">Diet Tags:</span> {recipe.dietTags?.join(', ')}</div>
          <div><span className="font-semibold text-gray-400">Average Rating:</span> {recipe.averageRating || 0}/5</div>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg text-white mb-2">Ingredients</h3>
          <ul className="list-disc list-inside text-gray-200">
            {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-lg text-white mb-2">Steps</h3>
          <ol className="list-decimal list-inside text-gray-200">
            {recipe.steps.map((s, idx) => <li key={idx}>{s}</li>)}
          </ol>
        </div>
        {user && (
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-4 items-center">
              <span className="font-semibold text-gray-400">Rate this recipe:</span>
              {[1,2,3,4,5].map(val => (
                <button
                  key={val}
                  className={`px-2 py-1 rounded ${Number(rating) === val ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-white'} hover:bg-yellow-600`}
                  onClick={() => setRating(val)}
                >{val}</button>
              ))}
              <button onClick={handleRate} className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded ml-2">Submit</button>
            </div>
            <div className="flex gap-4 items-center">
              <button onClick={handleFavourite} className={`px-4 py-2 rounded ${favStatus ? 'bg-green-600' : 'bg-gray-800'} text-white`}>
                {favStatus ? 'Remove from Favourites' : 'Add to Favourites'}
              </button>
            </div>
            {user._id === recipe.authorId && (
              <div className="flex gap-4">
                <button onClick={() => setEditing(true)} className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
              </div>
            )}
            {rateMsg && <div className="text-yellow-400 text-sm mt-2">{rateMsg}</div>}
          </div>
        )}
        <CommentThread recipeId={id} />
      </div>
    </section>
  );
};

export default RecipeDetails;
