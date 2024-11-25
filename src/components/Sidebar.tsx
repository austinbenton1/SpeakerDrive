import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Search, Unlock, Settings, Brain, UserSearch, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Find Leads', path: '/find-leads' },
  { icon: Brain, label: 'Smart Tools', path: '/smart-tools' },
  { icon: UserSearch, label: 'Contact Finder', path: '/contact-finder' },
];

const bottomNavItems = [
  { icon: Unlock, label: 'Unlocked Leads', path: '/leads' },
];

const settingsItems = [
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const NavLink = ({ item }: { item: typeof mainNavItems[0] }) => (
    <Link
      to={item.path}
      className={`
        flex items-center px-4 py-3 rounded-lg mb-1 transition-colors text-sm
        ${location.pathname === item.path
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
    >
      <item.icon className="w-4 h-4 mr-3" />
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
      </div>
      
      {/* Main Navigation */}
      <nav className="px-4">
        {mainNavItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </nav>

      {/* Flex spacer */}
      <div className="flex-1" />
      
      {/* Unlocked Leads */}
      <div className="px-4">
        {bottomNavItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-2" />

      {/* Settings and Logout */}
      <div className="px-4 pb-6">
        {settingsItems.map((item) => (
          <NavLink key={item.path} item={item} />
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}