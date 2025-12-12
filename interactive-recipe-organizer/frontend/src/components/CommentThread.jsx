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
    <div className="mt-8 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span>💬</span> Comments
      </h3>
      {user && (
        <div className="mb-6">
          <ReplyForm onSubmit={content => handleComment(content)} />
        </div>
      )}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-5xl mb-3">💭</div>
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <CommentList comments={comments} user={user} onReply={handleComment} />
      )}
    </div>
  );
};

const CommentList = ({ comments, user, onReply }) => (
  <div className="space-y-4">
    {comments.map(comment => (
      <div key={comment._id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-blue-400">{comment.username}</span>
          <span className="text-gray-500 text-sm">{new Date(comment.timestamp).toLocaleString()}</span>
        </div>
        <div className="text-gray-200 mb-3">{comment.content}</div>
        <div className="flex items-center gap-4">
          <LikeButton commentId={comment._id} initialLikes={comment.likes} />
          {user && <ReplyForm onSubmit={content => onReply(content, comment._id)} reply />}
        </div>
        {comment.children && comment.children.length > 0 && (
          <div className="ml-6 mt-4 pl-4 border-l-2 border-gray-700">
            <CommentList comments={comment.children} user={user} onReply={onReply} />
          </div>
        )}
      </div>
    ))}
  </div>
);

export default CommentThread;
