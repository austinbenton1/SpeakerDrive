import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, Unlock, Settings, Brain, UserSearch, LogOut, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Find Leads', path: '/find-leads' },
  { icon: Brain, label: 'Smart Tools', path: '/smart-tools' },
  { icon: UserSearch, label: 'Contact Finder', path: '/contact-finder' },
];

const bottomNavItems = [
  { icon: Unlock, label: 'My Contacts', path: '/leads' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User';
  const userRole = user?.user_metadata?.user_role || 'Member';

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const NavLink = ({ item }: { item: typeof mainNavItems[0] }) => (
    <Link
      to={item.path}
      className={`
        flex items-center px-4 py-3 rounded-lg mb-1 transition-colors
        ${location.pathname === item.path
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
    >
      <item.icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{item.label}</span>
    </Link>
  );

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <img 
          src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/TT6h28gNIZXvItU0Dzmk/media/67180e69ea401b8de01a84c5.png" 
          alt="SpeakerDrive" 
          className="h-6 w-auto mb-6"
        />
        
        {/* User Profile Section */}
        <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
          <div className="flex-shrink-0">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt={displayName}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            )}
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-600 truncate">
              {userRole}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        {mainNavItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>

      <div className="px-4 mb-4">
        {bottomNavItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}