'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NewsletterSubscription {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  source?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface NewsletterStats {
  active: number;
  inactive: number;
  total: number;
}

export default function NewsletterManager() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [stats, setStats] = useState<NewsletterStats>({ active: 0, inactive: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchSubscriptions = async (page = 1, status = 'all') => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(status !== 'all' && { status })
      });

      const response = await fetch(`/api/newsletter/admin?${params}`);
      const data = await response.json();

      if (response.ok) {
        setSubscriptions(data.subscriptions);
        setStats(data.stats);
        setTotalPages(data.pagination.pages);
        setCurrentPage(data.pagination.page);
      } else {
        setError(data.error || 'Failed to fetch subscriptions');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions(1, statusFilter);
  }, [statusFilter]);

  const handleDeleteSubscription = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to delete the subscription for ${email}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/newsletter/admin?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh the list
        fetchSubscriptions(currentPage, statusFilter);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete subscription');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#000000]">Newsletter Management</h2>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-3 py-2 border border-[#E2DDB4] rounded-lg focus:ring-2 focus:ring-[#E43636] focus:border-transparent"
          >
            <option value="all">All Subscriptions</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-[#E2DDB4] shadow-sm"
        >
          <h3 className="text-lg font-semibold text-[#E43636]">Active Subscribers</h3>
          <p className="text-3xl font-bold text-[#000000]">{stats.active}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg border border-[#E2DDB4] shadow-sm"
        >
          <h3 className="text-lg font-semibold text-[#E43636]">Inactive Subscribers</h3>
          <p className="text-3xl font-bold text-[#000000]">{stats.inactive}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg border border-[#E2DDB4] shadow-sm"
        >
          <h3 className="text-lg font-semibold text-[#E43636]">Total Subscribers</h3>
          <p className="text-3xl font-bold text-[#000000]">{stats.total}</p>
        </motion.div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg border border-[#E2DDB4] shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E43636] mx-auto"></div>
            <p className="mt-2 text-[#000000]">Loading subscriptions...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#E2DDB4]">
                <thead className="bg-[#F6EFD2]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                      Subscribed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-[#E2DDB4]">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]">
                        {subscription.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]">
                        {subscription.user ? (
                          <div>
                            <div className="font-medium">{subscription.user.name}</div>
                            <div className="text-gray-500">{subscription.user.email}</div>
                          </div>
                        ) : (
                          <span className="text-gray-500">Guest</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          subscription.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscription.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]">
                        {subscription.source || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]">
                        {formatDate(subscription.subscribedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteSubscription(subscription.id, subscription.email)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-[#F6EFD2] px-6 py-3 flex items-center justify-between">
                <div className="text-sm text-[#000000]">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchSubscriptions(currentPage - 1, statusFilter)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm bg-white border border-[#E2DDB4] rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => fetchSubscriptions(currentPage + 1, statusFilter)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm bg-white border border-[#E2DDB4] rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
