import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Link2, Mail } from 'lucide-react';
import Input from '../components/Input';

interface UserProfile {
  name: string;
  email: string;
  linkedinUrl: string;
  notifications: {
    email: boolean;
    desktop: boolean;
    marketing: boolean;
  };
}

const initialProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  linkedinUrl: 'https://linkedin.com/in/johndoe',
  notifications: {
    email: true,
    desktop: true,
    marketing: false,
  },
};

export default function UserManagement() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-full bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`
                    group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10
                    ${activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 border-b-2 border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center justify-center">
                    <tab.icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="ml-6">
                    <button type="button" className="btn-secondary">Change Photo</button>
                    <p className="mt-1 text-sm text-gray-500">JPG or PNG up to 10MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    icon={User}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    icon={Mail}
                  />
                  <Input
                    label="LinkedIn URL"
                    type="url"
                    value={profile.linkedinUrl}
                    onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    icon={Link2}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                {/* Email Integration Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Email Integration</h3>
                  <div className="space-y-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Mail className="w-5 h-5 mr-2 text-gray-400" />
                      Connect Gmail Account
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Mail className="w-5 h-5 mr-2 text-gray-400" />
                      Connect Outlook Account
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <Lock className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Your account is protected with two-factor authentication.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      <Input
                        label="Current Password"
                        type="password"
                        autoComplete="current-password"
                      />
                      <Input
                        label="New Password"
                        type="password"
                        autoComplete="new-password"
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                    <div className="mt-4">
                      <button type="button" className="btn-secondary">
                        Configure 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  <div className="mt-4 space-y-4">
                    {Object.entries(profile.notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              notifications: {
                                ...profile.notifications,
                                [key]: e.target.checked,
                              },
                            })
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1)} notifications
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}