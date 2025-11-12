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
    <form onSubmit={handleSubmit}>
      <h2>{recipeId ? 'Edit' : 'Add'} Recipe</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <div>
        <h4>Ingredients</h4>
        {ingredients.map((ing, i) => (
          <input
            key={i}
            value={ing}
            onChange={e => handleIngredientChange(i, e.target.value)}
            placeholder={`Add Ingredient${i === 0 ? '' : ''}`}
          />
        ))}
        <button type="button" onClick={addIngredient}>Add Ingredient</button>
      </div>
      <div>
        <h4>Steps</h4>
        {steps.map((step, i) => (
          <input
            key={i}
            value={step}
            onChange={e => handleStepChange(i, e.target.value)}
            placeholder={`Add Next Step${i === 0 ? '' : ''}`}
          />
        ))}
        <button type="button" onClick={addStep}>Add Step</button>
      </div>
      <input placeholder="Cuisine" value={cuisine} onChange={e => setCuisine(e.target.value)} />
      <input placeholder="Prep Time (min)" type="number" value={prepTime} onChange={e => setPrepTime(e.target.value)} />
      <input placeholder="Diet Tags (comma separated)" value={dietTags.join(',')} onChange={e => setDietTags(e.target.value.split(','))} />
      <button type="submit">Save</button>
    </form>
  );
};

export default RecipeForm;
