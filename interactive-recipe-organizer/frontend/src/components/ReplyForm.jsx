import React, { useState } from 'react';

const ReplyForm = ({ onSubmit, reply }) => {
  const [content, setContent] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };
  return (
    <form onSubmit={handleSubmit} className={reply ? 'mt-2' : 'mt-4'}>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={reply ? 'Write a reply...' : 'Write a comment...'}
          value={content}
          onChange={e => setContent(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
        >
          {reply ? '💬 Reply' : '💬 Comment'}
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
