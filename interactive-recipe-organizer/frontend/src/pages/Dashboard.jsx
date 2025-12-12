import React, { useEffect, useState } from 'react';
import api from '../api';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [popularCuisines, setPopularCuisines] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard/top-rated')
      .then(res => setTopRecipes(res.data))
      .catch(err => setError(err.response?.data?.message || 'Access denied'));
    api.get('/dashboard/active-users')
      .then(res => setActiveUsers(res.data))
      .catch(err => setError(err.response?.data?.message || 'Access denied'));
    api.get('/dashboard/popular-cuisines')
      .then(res => setPopularCuisines(res.data))
      .catch(err => setError(err.response?.data?.message || 'Access denied'));
  }, []);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-8 py-6 rounded-xl text-center">
          <div className="text-5xl mb-4">🔒</div>
          <div className="text-xl">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          📊 Admin Analytics Dashboard
        </h1>
        <p className="text-gray-400 text-lg">Insights and statistics for your recipe platform</p>
      </div>
      
      {/* Charts Grid */}
      <div className="space-y-8">
        {/* Top-Rated Recipes */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">⭐</span>
            <h3 className="text-2xl font-bold text-white">Top-Rated Recipes</h3>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <Bar
              data={{
                labels: topRecipes.map(r => r.title),
                datasets: [{
                  label: 'Average Rating',
                  data: topRecipes.map(r => r.averageRating),
                  backgroundColor: 'rgba(251,191,36,0.8)',
                  borderColor: 'rgba(251,191,36,1)',
                  borderWidth: 2,
                  borderRadius: 8
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: { color: '#fff', font: { size: 14 } }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                  },
                  x: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Most Active Users */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">👥</span>
            <h3 className="text-2xl font-bold text-white">Most Active Users</h3>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6">
            <Bar
              data={{
                labels: activeUsers.map(u => u.username),
                datasets: [{
                  label: 'Comments',
                  data: activeUsers.map(u => u.count),
                  backgroundColor: 'rgba(16,185,129,0.8)',
                  borderColor: 'rgba(16,185,129,1)',
                  borderWidth: 2,
                  borderRadius: 8
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: { color: '#fff', font: { size: 14 } }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                  },
                  x: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Most Popular Cuisines */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🌎</span>
            <h3 className="text-2xl font-bold text-white">Most Popular Cuisines</h3>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 flex justify-center">
            <div className="w-full max-w-md">
              <Pie
                data={{
                  labels: popularCuisines.map(c => c._id),
                  datasets: [{
                    label: 'Recipes',
                    data: popularCuisines.map(c => c.count),
                    backgroundColor: [
                      'rgba(244,63,94,0.8)',
                      'rgba(59,130,246,0.8)',
                      'rgba(132,204,22,0.8)',
                      'rgba(251,191,36,0.8)',
                      'rgba(139,92,246,0.8)'
                    ],
                    borderColor: [
                      'rgba(244,63,94,1)',
                      'rgba(59,130,246,1)',
                      'rgba(132,204,22,1)',
                      'rgba(251,191,36,1)',
                      'rgba(139,92,246,1)'
                    ],
                    borderWidth: 2
                  }]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: { color: '#fff', font: { size: 14 } },
                      position: 'bottom'
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
