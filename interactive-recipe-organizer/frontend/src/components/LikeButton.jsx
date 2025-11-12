import React, { useState } from 'react';
import api from '../api';

const LikeButton = ({ commentId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    await api.post(`/comments/${commentId}/like`, { action: liked ? 'unlike' : 'like' });
    setLikes(l => liked ? l - 1 : l + 1);
    setLiked(l => !l);
  };

  return (
    <button onClick={handleLike} style={{ marginRight: 8 }}>
      {liked ? 'Unlike' : 'Like'} ({likes})
    </button>
  );
};

export default LikeButton;
