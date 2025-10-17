'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Comment {
  id: string;
  content: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
  parentId?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  replies?: Comment[];
}

interface LessonCommentsProps {
  lessonId: string;
  courseId: string;
}

interface CommentItemProps {
  comment: Comment;
  user: any;
  onReply: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onEditContent: (content: string) => void;
  formatDate: (date: string) => string;
  handleDeleteComment: (id: string) => void;
  handleEditComment: (id: string) => void;
  handleSubmitReply: (e: React.FormEvent, parentId: string) => void;
  replyingTo: string | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  editingComment: string | null;
  editContent: string;
  setEditingComment: (id: string | null) => void;
  setEditContent: (content: string) => void;
  isReply?: boolean;
}

// Reusable CommentItem component for nested replies
function CommentItem({
  comment,
  user,
  onReply,
  onDelete,
  onEdit,
  onEditContent,
  formatDate,
  handleDeleteComment,
  handleEditComment,
  handleSubmitReply,
  replyingTo,
  replyContent,
  setReplyContent,
  editingComment,
  editContent,
  setEditingComment,
  setEditContent,
  isReply = false
}: CommentItemProps) {
  const bgColor = isReply ? "bg-gray-50" : "bg-white";
  const textSize = isReply ? "text-sm" : "text-base";
  const nameSize = isReply ? "text-sm" : "text-base";
  const padding = isReply ? "p-3" : "p-4";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${bgColor} ${padding} rounded-lg mb-2 border border-[#E43636]`}
    >
      {/* Header with user info and timestamp */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <p className={`font-semibold text-[#E43636] ${nameSize}`}>{comment.user.name}</p>
          {comment.isEdited && (
            <span className="text-xs text-gray-500">(edited)</span>
          )}
        </div>
        <p className={`text-xs text-[#E43636] opacity-75`}>
          {formatDate(comment.createdAt)}
          {comment.isEdited && comment.updatedAt !== comment.createdAt && (
            <span className="text-xs text-gray-500 ml-1">
              (edited {formatDate(comment.updatedAt)})
            </span>
          )}
        </p>
      </div>
      
      {editingComment === comment.id ? (
        <div className="mt-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 resize-none"
            rows={2}
          />
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => handleEditComment(comment.id)}
              className="px-3 py-1 text-sm font-medium text-[#F6EFD2] bg-[#E43636] border border-[#E43636] rounded-md hover:bg-[#F6EFD2] hover:text-[#E43636] transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingComment(null);
                setEditContent('');
              }}
              className="px-3 py-1 text-sm font-medium text-[#F6EFD2] bg-[#E43636] border border-[#E43636] rounded-md hover:bg-[#F6EFD2] hover:text-[#E43636] transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className={`${textSize} text-gray-700 whitespace-pre-wrap`}>{comment.content}</p>
      )}

      {/* Action Buttons */}
      {user && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex space-x-2">
            {/* Reply button - available to all logged-in users */}
            <button
              onClick={() => {
                onReply(comment.id);
                setReplyContent('');
              }}
              className="px-3 py-1 text-xs font-medium text-[#F6EFD2] bg-[#E43636] border border-[#E43636] rounded-md hover:bg-[#F6EFD2] hover:text-[#E43636] transition-colors duration-200"
            >
              Reply
            </button>
            
            {/* Edit and Delete buttons - only for comment owner */}
            {user?._id === comment.user.id && (
              <>
                <button
                  onClick={() => {
                    onEdit(comment.id);
                    onEditContent(comment.content);
                  }}
                  className="px-3 py-1 text-xs font-medium text-[#F6EFD2] bg-[#E43636] border border-[#E43636] rounded-md hover:bg-[#F6EFD2] hover:text-[#E43636] transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="px-3 py-1 text-xs font-medium text-[#F6EFD2] bg-[#E43636] border border-[#E43636] rounded-md hover:bg-[#F6EFD2] hover:text-[#E43636] transition-colors duration-200"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Reply Form */}
      {replyingTo === comment.id && (
        <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-3">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-2 border border-gray-300 rounded text-black resize-none focus:outline-none focus:border-[#E43636]"
            rows={3}
          />
          <div className="mt-2 flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1 text-xs font-medium text-[#F6EFD2] bg-[#E43636] border border-[#E43636] rounded-md hover:bg-[#F6EFD2] hover:text-[#E43636] transition-colors duration-200"
            >
              Post Reply
            </button>
            <button
              type="button"
              onClick={() => {
                onReply('');
                setReplyContent('');
              }}
              className="px-3 py-1 text-xs font-medium text-[#F6EFD2] bg-[#E43636] border border-[#E43636] rounded-md hover:bg-[#F6EFD2] hover:text-[#E43636] transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-300">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              user={user}
              onReply={onReply}
              onDelete={onDelete}
              onEdit={onEdit}
              onEditContent={onEditContent}
              formatDate={formatDate}
              handleDeleteComment={handleDeleteComment}
              handleEditComment={handleEditComment}
              handleSubmitReply={handleSubmitReply}
              replyingTo={replyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              editingComment={editingComment}
              editContent={editContent}
              setEditingComment={setEditingComment}
              setEditContent={setEditContent}
              isReply={true}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function LessonComments({ lessonId, courseId }: LessonCommentsProps) {
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [deletingComment, setDeletingComment] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Fetch comments
  const fetchComments = async () => {
    try {
      console.log('Fetching comments for:', { lessonId, courseId });
      const response = await fetch(`/api/comments?lessonId=${lessonId}&courseId=${courseId}`);
      console.log('Comments API response:', response.status, response.statusText);
      if (response.ok) {
        const data = await response.json();
        console.log('Comments data received:', data);
        setComments(data);
      } else {
        const errorData = await response.json();
        console.error('Comments API error:', errorData);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log('User data from localStorage:', userData);
    if (userData) {
      const parsedUser = JSON.parse(userData);
      console.log('Parsed user data:', parsedUser);
      setUser(parsedUser);
    } else {
      console.log('No user data found in localStorage');
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [lessonId, courseId]);

  // Submit new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = user?._id;
    if (!newComment.trim() || !userId) {
      console.log('Comment submission blocked:', { 
        hasContent: !!newComment.trim(), 
        hasUser: !!userId,
        user: user 
      });
      return;
    }

    console.log('Submitting comment:', { lessonId, courseId, content: newComment, userId });
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          courseId,
          content: newComment,
          userId,
        }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
        setNewComment('');
      } else {
        const error = await response.json();
        console.error('Comment submission failed:', { status: response.status, error });
        alert(error.error || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit comment
  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim() || !user?._id) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editContent,
          userId: user?._id || user?.id,
        }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        // Recursively update the comment in nested structure
        const updateCommentById = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === commentId) {
              return updatedComment;
            }
            if (comment.replies && comment.replies.length > 0) {
              return { ...comment, replies: updateCommentById(comment.replies) };
            }
            return comment;
          });
        };
        
        setComments(updateCommentById(comments));
        setEditingComment(null);
        setEditContent('');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update comment');
      }
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!user?._id) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?._id || user?.id,
        }),
      });

      if (response.ok) {
        // Recursively remove the comment from nested structure
        const removeCommentById = (comments: Comment[]): Comment[] => {
          return comments
            .filter(comment => comment.id !== commentId)
            .map(comment => ({
              ...comment,
              replies: comment.replies ? removeCommentById(comment.replies) : []
            }));
        };
        
        setComments(removeCommentById(comments));
        setDeletingComment(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  // Submit reply
  const handleSubmitReply = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyContent.trim() || !user?._id) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId,
          courseId,
          content: replyContent,
          userId: user?._id || user?.id,
          parentId,
        }),
      });

      if (response.ok) {
        const newReply = await response.json();
        // Recursively update comments to include the new reply
        const updateCommentsWithReply = (comments: Comment[]): Comment[] => {
          return comments.map(comment => {
            if (comment.id === parentId) {
              return { ...comment, replies: [...(comment.replies || []), newReply] };
            }
            if (comment.replies && comment.replies.length > 0) {
              return { ...comment, replies: updateCommentsWithReply(comment.replies) };
            }
            return comment;
          });
        };
        
        setComments(updateCommentsWithReply(comments));
        setReplyContent('');
        setReplyingTo(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to post reply');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Failed to post reply');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E43636]"></div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#E43636] mb-4">Q&A Discussion</h3>

      {/* Add Comment Form */}
      {user ? (
        <div className="bg-white p-6 rounded-xl border border-[#E43636] mb-6">
          <form onSubmit={handleSubmitComment}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ask a question or share your experience..."
              className="w-full p-4 rounded-lg border border-[#E43636] bg-white text-black resize-none"
              rows={3}
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="mt-3 px-6 py-2 bg-[#E43636] text-[#F6EFD2] rounded-lg font-semibold hover:bg-[#b82a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl border border-[#E43636] mb-6 text-center">
          <p className="text-gray-600 mb-4">Please sign in to post comments</p>
          <a
            href="/login"
            className="px-6 py-2 bg-[#E43636] text-[#F6EFD2] rounded-lg font-semibold hover:bg-[#b82a2a] transition-colors"
          >
            Sign In
          </a>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-[#E43636] text-center text-gray-600">
            <p>No comments yet. Be the first to ask a question or share your experience!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              user={user}
              onReply={setReplyingTo}
              onDelete={setDeletingComment}
              onEdit={setEditingComment}
              onEditContent={setEditContent}
              formatDate={formatDate}
              handleDeleteComment={handleDeleteComment}
              handleEditComment={handleEditComment}
              handleSubmitReply={handleSubmitReply}
              replyingTo={replyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              editingComment={editingComment}
              editContent={editContent}
              setEditingComment={setEditingComment}
              setEditContent={setEditContent}
              isReply={false}
            />
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-[#E43636] mb-4">
              Delete Comment
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this comment? This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setDeletingComment(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteComment(deletingComment)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
