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
      api.get('/recipes', { params: { ids: user.favorites.join(',') } })
        .then(res => setFavourites(res.data))
        .catch(() => setFavourites([]));
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-lg p-8 mt-8 text-white">
      <h2 className="text-3xl font-bold mb-4 text-white text-center">Profile</h2>
      {user && (
        <>
          <div className="mb-2">Username: <span className="font-semibold text-gray-300">{user.username}</span></div>
          <div className="mb-2">Email: <span className="font-semibold text-gray-300">{user.email}</span></div>
          <div className="mb-4">Favorites: <span className="font-semibold text-gray-300">{user.favorites?.length || 0}</span></div>
          <div className="mb-4">
            <h3 className="font-bold text-lg text-white mb-2">Favourite Recipes</h3>
            {favourites.length === 0 ? (
              <div className="text-gray-400">No favourite recipes yet.</div>
            ) : (
              <ul className="list-disc list-inside text-gray-200">
                {favourites.map(r => (
                  <li key={r._id}>
                    <Link to={`/recipes/${r._id}`} className="text-yellow-400 hover:underline">{r.title}</Link> ({r.cuisine})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      <LogoutButton />
    </div>
  );
};

export default Profile;
