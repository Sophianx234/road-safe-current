'use client';

import { ReactNode } from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
} from 'react-icons/fa';

type NotificationProps = {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
};

const typeStyles = {
  success: {
    icon: <FaCheckCircle className="text-green-600 w-4 h-4" />,
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
  },
  error: {
    icon: <FaTimesCircle className="text-red-600 w-4 h-4" />,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
  },
  warning: {
    icon: <FaExclamationTriangle className="text-yellow-600 w-4 h-4" />,
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
  },
  info: {
    icon: <FaInfoCircle className="text-blue-600 w-4 h-4" />,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
  },
};

export default function Notification({
  type,
  title,
  message,
  onClose,
}: NotificationProps) {
  const styles = typeStyles[type];

  return (
    <div
      className={`w-full max-w-sm mx-auto flex items-center gap-3 px-3 py-2 rounded-lg border shadow-sm transition ${styles.bg} ${styles.border}`}
    >
      {/* Icon */}
      <div className="pt-0.5">{styles.icon}</div>

      {/* Content */}
      <div className="flex-1">
        <h4 className={`text-xs font-semibold ${styles.text}`}>{title}</h4>
        <p className={`text-xs mt-0.5 ${styles.text}`}>{message}</p>
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-gray-600 transition leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
}
