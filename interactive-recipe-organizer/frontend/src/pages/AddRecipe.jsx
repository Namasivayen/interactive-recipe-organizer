
import React from 'react';
import RecipeForm from '../components/RecipeForm';

const AddRecipe = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Add a New Recipe</h1>
        <RecipeForm />
      </div>
    </section>
  );
};

export default AddRecipe;
