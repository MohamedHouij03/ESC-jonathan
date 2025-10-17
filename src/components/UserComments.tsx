'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface UserCommentsProps {
  userId: string;
  userName: string;
  userEmail: string;
  isAdmin?: boolean;
}

export default function UserComments({ userId, userName, userEmail, isAdmin = false }: UserCommentsProps) {
  const [comments, setComments] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch user comments
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/comments?userId=${userId}`);
      const data = await response.json();

      if (response.ok) {
        setComments(data.user.comments || '');
      } else {
        setError(data.error || 'Failed to fetch comments');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [userId]);

  // Update comments
  const handleUpdateComments = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/user/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          comments: comments
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Comments updated successfully');
        setIsEditing(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError(data.error || 'Failed to update comments');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/user/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          newComment: newComment.trim(),
          adminName: isAdmin ? 'Admin' : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setComments(data.user.comments);
        setNewComment('');
        setMessage('Comment added successfully');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError(data.error || 'Failed to add comment');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !comments) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#E43636] mx-auto"></div>
        <p className="mt-2 text-sm text-[#000000]">Loading comments...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#000000]">
          Comments for {userName}
        </h3>
        {isAdmin && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 text-sm bg-[#E43636] text-white rounded hover:bg-[#b82a2a] transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        )}
      </div>

      {/* Messages */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm"
        >
          {message}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Comments Display */}
      <div className="bg-white border border-[#E2DDB4] rounded-lg p-4">
        {comments ? (
          <div className="whitespace-pre-wrap text-sm text-[#000000]">
            {comments}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No comments yet</p>
        )}
      </div>

      {/* Edit Comments (Admin only) */}
      {isEditing && isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter comments about this user..."
            className="w-full p-3 border border-[#E2DDB4] rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent resize-none"
            rows={4}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdateComments}
              disabled={isLoading}
              className="px-4 py-2 bg-[#E43636] text-white rounded hover:bg-[#b82a2a] disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save Comments'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Add New Comment (Admin only) */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h4 className="text-md font-medium text-[#000000]">Add New Comment</h4>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a new comment..."
            className="w-full p-3 border border-[#E2DDB4] rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent resize-none"
            rows={2}
          />
          <button
            onClick={handleAddComment}
            disabled={isLoading || !newComment.trim()}
            className="px-4 py-2 bg-[#E43636] text-white rounded hover:bg-[#b82a2a] disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Adding...' : 'Add Comment'}
          </button>
        </motion.div>
      )}
    </div>
  );
}
