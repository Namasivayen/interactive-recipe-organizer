import React, { useState } from 'react';
import api from '../api';

const LikeButton = ({ commentId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await api.post(`/comments/comments/${commentId}/like`, { action: liked ? 'unlike' : 'like' });
      setLikes(response.data.likes);
      setLiked(l => !l);
    } catch (err) {
      console.error('Error liking comment:', err);
      // Try to get updated likes from response anyway
      if (err.response?.data?.likes !== undefined) {
        setLikes(err.response.data.likes);
      }
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`px-4 py-1.5 rounded-lg font-semibold transition-all transform hover:scale-105 ${
        liked 
          ? 'bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg' 
          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
      }`}
    >
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  );
};

export default LikeButton;
