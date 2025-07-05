'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { removeNotification } from '@/store/slices/uiSlice';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const notificationIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

export function NotificationContainer() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, dispatch]);

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => {
        const Icon = notificationIcons[notification.type];
        
        return (
          <div
            key={notification.id}
            className={cn(
              'flex items-center p-4 rounded-lg shadow-lg max-w-sm animate-slide-down',
              {
                'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800': notification.type === 'success',
                'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800': notification.type === 'error',
                'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800': notification.type === 'warning',
                'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800': notification.type === 'info',
              }
            )}
          >
            <Icon
              className={cn('h-5 w-5 mr-3', {
                'text-green-500': notification.type === 'success',
                'text-red-500': notification.type === 'error',
                'text-yellow-500': notification.type === 'warning',
                'text-blue-500': notification.type === 'info',
              })}
            />
            
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {notification.message}
              </p>
            </div>
            
            <button
              onClick={() => handleRemove(notification.id)}
              className="ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
} 