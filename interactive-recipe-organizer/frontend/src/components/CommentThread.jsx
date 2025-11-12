import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/AuthContext';
import ReplyForm from './ReplyForm';
import LikeButton from './LikeButton';

const CommentThread = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`/recipes/${recipeId}/comments`).then(res => setComments(res.data));
  }, [recipeId, refresh]);

  const handleComment = async (content, parentId) => {
    await api.post(`/recipes/${recipeId}/comments`, { content, parentId });
    setRefresh(r => !r);
  };

  return (
    <div>
      <h3>Comments</h3>
      {user && <ReplyForm onSubmit={content => handleComment(content)} />}
      <CommentList comments={comments} user={user} onReply={handleComment} />
    </div>
  );
};

const CommentList = ({ comments, user, onReply }) => (
  <ul>
    {comments.map(comment => (
      <li key={comment._id} style={{ marginBottom: 12 }}>
        <div>
          <b>{comment.username}</b> <span style={{ color: '#888' }}>{new Date(comment.timestamp).toLocaleString()}</span>
        </div>
        <div>{comment.content}</div>
        <LikeButton commentId={comment._id} initialLikes={comment.likes} />
        {user && <ReplyForm onSubmit={content => onReply(content, comment._id)} reply />}
        {comment.children && comment.children.length > 0 && (
          <CommentList comments={comment.children} user={user} onReply={onReply} />
        )}
      </li>
    ))}
  </ul>
);

export default CommentThread;
