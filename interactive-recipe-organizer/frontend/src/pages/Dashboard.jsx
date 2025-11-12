import React, { useEffect, useState } from 'react';
import api from '../api';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [popularCuisines, setPopularCuisines] = useState([]);

  useEffect(() => {
    api.get('/dashboard/top-rated').then(res => setTopRecipes(res.data));
    api.get('/dashboard/active-users').then(res => setActiveUsers(res.data));
    api.get('/dashboard/popular-cuisines').then(res => setPopularCuisines(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Analytics Dashboard</h2>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Top-Rated Recipes</h3>
        <Bar
          data={{
            labels: topRecipes.map(r => r.title),
            datasets: [{
              label: 'Average Rating',
              data: topRecipes.map(r => r.averageRating),
              backgroundColor: 'rgba(99,102,241,0.7)'
            }]
          }}
        />
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Most Active Users</h3>
        <Bar
          data={{
            labels: activeUsers.map(u => u.username),
            datasets: [{
              label: 'Comments',
              data: activeUsers.map(u => u.count),
              backgroundColor: 'rgba(16,185,129,0.7)'
            }]
          }}
        />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Most Popular Cuisines</h3>
        <Pie
          data={{
            labels: popularCuisines.map(c => c._id),
            datasets: [{
              label: 'Recipes',
              data: popularCuisines.map(c => c.count),
              backgroundColor: [
                'rgba(244,63,94,0.7)',
                'rgba(59,130,246,0.7)',
                'rgba(132,204,22,0.7)',
                'rgba(251,191,36,0.7)',
                'rgba(139,92,246,0.7)'
              ]
            }]
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
