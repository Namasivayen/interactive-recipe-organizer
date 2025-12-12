import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LogoutButton from '../components/LogoutButton';
import api from '../api';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (user && user.favorites?.length) {
      console.log('Fetching favorites:', user.favorites);
      api.get('/recipes', { params: { ids: user.favorites.join(',') } })
        .then(res => {
          console.log('Favorites response:', res.data);
          setFavourites(res.data);
        })
        .catch(err => {
          console.error('Error fetching favorites:', err);
          setFavourites([]);
        });
    } else {
      console.log('No favorites to fetch:', user?.favorites);
      setFavourites([]);
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">My Profile</h2>
        </div>
        
        {user && (
          <>
            {/* User Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-6 border border-blue-500/30 text-center">
                <div className="text-3xl mb-2">📧</div>
                <div className="text-sm text-gray-400 mb-1">Email</div>
                <div className="font-bold text-white break-all">{user.email}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30 text-center">
                <div className="text-3xl mb-2">👤</div>
                <div className="text-sm text-gray-400 mb-1">Username</div>
                <div className="font-bold text-white">{user.username}</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl p-6 border border-pink-500/30 text-center">
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-sm text-gray-400 mb-1">Favorites</div>
                <div className="font-bold text-white text-2xl">{user.favorites?.length || 0}</div>
              </div>
            </div>
            
            {/* Favourite Recipes Section */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span>❤️</span> Favourite Recipes
              </h3>
              {favourites.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🔍</div>
                  <div className="text-gray-400 text-lg">No favourite recipes yet.</div>
                  <Link to="/recipes" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                    Browse Recipes
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favourites.map(r => (
                    <Link
                      key={r._id}
                      to={`/recipes/${r._id}`}
                      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all transform hover:scale-105"
                    >
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {r.title}
                      </h4>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <span>🌎</span> {r.cuisine}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>⭐</span> {r.averageRating ? r.averageRating.toFixed(1) : '0.0'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Logout Button */}
            <div className="mt-8 text-center">
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
