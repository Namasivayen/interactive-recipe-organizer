import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const RecipeForm = ({ initial = {}, recipeId }) => {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [ingredients, setIngredients] = useState(initial.ingredients || ['']);
  const [steps, setSteps] = useState(initial.steps || ['']);
  const [cuisine, setCuisine] = useState(initial.cuisine || '');
  const [prepTime, setPrepTime] = useState(initial.prepTime || '');
  const [dietTags, setDietTags] = useState(initial.dietTags || []);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleIngredientChange = (i, val) => {
    const arr = [...ingredients];
    arr[i] = val;
    setIngredients(arr);
  };
  const handleStepChange = (i, val) => {
    const arr = [...steps];
    arr[i] = val;
    setSteps(arr);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const addStep = () => setSteps([...steps, '']);

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !description || ingredients.some(i => !i) || steps.some(s => !s)) {
      setError('All fields required');
      return;
    }
    try {
      const payload = { title, description, ingredients, steps, cuisine, prepTime, dietTags };
      if (recipeId) {
        await api.put(`/recipes/${recipeId}`, payload);
        navigate(`/recipes/${recipeId}`);
      } else {
        const res = await api.post('/recipes', payload);
        navigate(`/recipes/${res.data._id}`);
      }
    } catch (err) {
      setError('Error saving recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-gray-300 mb-2 text-sm font-semibold">🍳 Recipe Title</label>
        <input 
          placeholder="e.g. Margherita Pizza" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
        />
      </div>
      
      <div>
        <label className="block text-gray-300 mb-2 text-sm font-semibold">📝 Description</label>
        <textarea 
          placeholder="Describe your recipe..." 
          value={description} 
          onChange={e => setDescription(e.target.value)}
          rows="4"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
        />
      </div>
      
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h4 className="text-xl font-bold text-white mb-4">🧂 Ingredients</h4>
        <div className="space-y-3">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-3">
              <input
                value={ing}
                onChange={e => handleIngredientChange(i, e.target.value)}
                placeholder={`Ingredient ${i + 1}`}
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  title="Remove ingredient"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button 
          type="button" 
          onClick={addIngredient}
          className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
        >
          + Add Ingredient
        </button>
      </div>
      
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h4 className="text-xl font-bold text-white mb-4">📍 Steps</h4>
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {i + 1}
              </span>
              <input
                value={step}
                onChange={e => handleStepChange(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                  title="Remove step"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <button 
          type="button" 
          onClick={addStep}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          + Add Step
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 mb-2 text-sm font-semibold">🌎 Cuisine</label>
          <input 
            placeholder="e.g. Italian, Indian" 
            value={cuisine} 
            onChange={e => setCuisine(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2 text-sm font-semibold">⏱️ Prep Time (minutes)</label>
          <input 
            placeholder="e.g. 30" 
            type="number" 
            value={prepTime} 
            onChange={e => setPrepTime(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-300 mb-2 text-sm font-semibold">🥗 Diet Tags</label>
        <input 
          placeholder="e.g. Vegetarian, Vegan, Gluten-Free" 
          value={dietTags.join(',')} 
          onChange={e => setDietTags(e.target.value.split(',').map(t => t.trim()).filter(t => t))}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all"
        />
        <p className="text-gray-500 text-xs mt-1">Separate multiple tags with commas</p>
      </div>
      
      <button 
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-orange-500/50 transform hover:scale-[1.02] transition-all duration-300"
      >
        {recipeId ? '✅ Update Recipe' : '✨ Create Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;
