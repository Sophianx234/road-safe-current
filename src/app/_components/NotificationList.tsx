'use client';

import { useState } from 'react';
import Notification from './Notification';
import { FaBell, FaTimes, FaTrash } from 'react-icons/fa';
import { useDashStore } from '@/store/dash-store';

type NotificationItem = {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'Data Synced',
    message: 'Road accident statistics have been updated.',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Missing Region',
    message: 'Some records are missing regional information.',
  },
  {
    id: '3',
    type: 'error',
    title: 'Failed to Fetch',
    message: 'Could not load hotspot data. Please retry.',
  },
];

export default function NotificationList() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isVisible, setIsVisible] = useState(true);
  const {showNotifications,toggleNotifications} = useDashStore();
  const handleClose = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  if (!showNotifications) return null;

  return (
    <div className="fixed top-20 right-3 w-72 max-w-md bg-white border border-gray-200 rounded-lg shadow-md px-4 py-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
          <FaBell className="text-orange-500" />
          Notifications
        </div>
        <button
          onClick={toggleNotifications}
          className="text-gray-400 hover:text-gray-600 text-xs"
          title="Close Panel"
        >
          <FaTimes />
        </button>
      </div>

      {/* Notification Items */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Notification
              key={notification.id}
              type={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => handleClose(notification.id)}
            />
          ))
        ) : (
          <p className="text-center text-xs text-gray-400 py-6">No notifications.</p>
        )}
      </div>

      {/* Footer Actions */}
      {notifications.length > 0 && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 text-xs text-red-500 hover:underline"
            title="Clear all notifications"
          >
            <FaTrash className="w-3 h-3" />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
