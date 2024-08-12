// src/components/RequestManagement.js
import React, { useState } from 'react';

const RequestManagement = ({ request, onAction }) => {
  const [comments, setComments] = useState('');

  const handleAction = (actionType) => {
    if (!comments.trim()) {
      alert('Comments are required.');
      return;
    }
    onAction(actionType, comments);
    setComments(''); // Clear comments after action
  };

  return (
    <div>
      <h3>Request ID: {request.id}</h3>
      <p>Status: {request.status}</p>
      <textarea
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="Enter your comments"
        style={{ width: '100%', height: '80px', marginBottom: '10px' }}
      />
      <button onClick={() => handleAction('approve')} style={{ marginRight: '10px' }}>
        Approve
      </button>
      <button onClick={() => handleAction('disapprove')} style={{ marginRight: '10px' }}>
        Disapprove
      </button>
      <button onClick={() => handleAction('return-to-employee')}>
        Return to Employee
      </button>
    </div>
  );
};

export default RequestManagement;
