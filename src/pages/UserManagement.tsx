import React, { useState, useEffect } from 'react';
import { User, MessageSquare, Mail, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import ServiceSelector from '../components/onboarding/ServiceSelector';
import IndustrySelector from '../components/onboarding/IndustrySelector';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'subscription', label: 'Subscription', icon: Mail },
  { id: 'support', label: 'Get Support', icon: MessageSquare },
  { id: 'feedback', label: 'Give Us Feedback', icon: MessageSquare },
];

interface UserProfile {
  name: string;
  services: string[];
  industries: string[];
  transformation: string;
  emailSignature: string;
  avatarUrl: string;
}

export default function UserManagement() {
  const navigate = useNavigate();
  const { user, refreshSession } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    services: [],
    industries: [],
    transformation: '',
    emailSignature: '',
    avatarUrl: ''
  });

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = () => {
    if (user) {
      setProfile({
        name: user.user_metadata?.display_name || user.user_metadata?.full_name || '',
        services: user.user_metadata?.services || [],
        industries: user.user_metadata?.industries || [],
        transformation: user.user_metadata?.transformation || '',
        emailSignature: user.user_metadata?.email_signature || '',
        avatarUrl: user.user_metadata?.avatar_url || ''
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: profile.name,
          full_name: profile.name,
          services: profile.services,
          industries: profile.industries,
          transformation: profile.transformation,
          email_signature: profile.emailSignature
        }
      });

      if (error) throw error;
      
      await refreshSession();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        const { error } = await supabase.auth.updateUser({
          data: { avatar_url: base64 }
        });

        if (error) throw error;
        
        await refreshSession();
        setProfile(prev => ({ ...prev, avatarUrl: base64 }));
      };
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

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
                  onClick={() => setActiveTab(tab.id)}
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
                {/* Profile Photo */}
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={profile.avatarUrl || 'https://www.gravatar.com/avatar/default?d=mp&s=200'}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    {isEditing && (
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm cursor-pointer border border-gray-200"
                      >
                        <Camera className="w-4 h-4 text-gray-500" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                  <div className="ml-6">
                    <p className="text-sm text-gray-500">
                      {isEditing ? 'Upload a new profile photo' : 'Profile photo'}
                    </p>
                    {isEditing && (
                      <p className="mt-1 text-xs text-gray-400">
                        JPG or PNG up to 2MB
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="space-y-6">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    icon={User}
                  />

                  <div className={isEditing ? '' : 'opacity-75'}>
                    <ServiceSelector
                      selectedServices={profile.services}
                      onChange={(serviceId) => {
                        if (!isEditing) return;
                        const newServices = profile.services.includes(serviceId)
                          ? profile.services.filter(id => id !== serviceId)
                          : [...profile.services, serviceId];
                        setProfile({ ...profile, services: newServices });
                      }}
                      disabled={!isEditing}
                      hideLabel={false}
                    />
                  </div>

                  <div className={isEditing ? '' : 'opacity-75'}>
                    <IndustrySelector
                      selectedIndustries={profile.industries}
                      onChange={(industryId) => {
                        if (!isEditing) return;
                        const newIndustries = profile.industries.includes(industryId)
                          ? profile.industries.filter(id => id !== industryId)
                          : [...profile.industries, industryId];
                        if (newIndustries.length <= 3) {
                          setProfile({ ...profile, industries: newIndustries });
                        }
                      }}
                      disabled={!isEditing}
                      hideLabel={false}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Briefly describe the transformation you create for your audience
                    </label>
                    <textarea
                      value={profile.transformation}
                      onChange={(e) => setProfile({ ...profile, transformation: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Signature
                    </label>
                    <textarea
                      value={profile.emailSignature}
                      onChange={(e) => setProfile({ ...profile, emailSignature: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            loadProfile();
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'subscription' && (
              <div className="text-center py-12">
                <Mail className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Subscription details coming soon</h3>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Support section coming soon</h3>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Feedback section coming soon</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}