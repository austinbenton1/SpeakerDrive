import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Sidebar';

export default function Layout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDisplayName = () => {
    // Try to get the full name from user metadata
    const fullName = user?.user_metadata?.full_name;
    if (fullName) return fullName;

    // Try to get the display name from user metadata
    const displayName = user?.user_metadata?.display_name;
    if (displayName) return displayName;

    // If no name is available, format the email
    if (user?.email) {
      const [username] = user.email.split('@');
      // Capitalize first letter of each word
      return username
        .split(/[._-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return 'User';
  };

  const getUserRole = () => {
    return user?.user_metadata?.user_role || 'Member';
  };

  const getAvatarUrl = () => {
    return user?.user_metadata?.avatar_url;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div></div>
          <div 
            onClick={() => navigate('/settings')}
            className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
          >
            <div className="flex-shrink-0">
              {getAvatarUrl() ? (
                <img
                  src={getAvatarUrl()}
                  alt={getDisplayName()}
                  className="w-8 h-8 rounded-full border border-gray-200 shadow-sm object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://www.gravatar.com/avatar/default?d=mp&s=200';
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">
                {getDisplayName()}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {getUserRole()}
              </p>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}