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
    <form onSubmit={handleSubmit} style={{ marginTop: reply ? 8 : 16 }}>
      <input
        type="text"
        placeholder={reply ? 'Reply...' : 'Add a comment...'}
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ width: '80%' }}
      />
      <button type="submit">{reply ? 'Reply' : 'Comment'}</button>
    </form>
  );
};

export default ReplyForm;
