import React from 'react';
import { User, Mail } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import ServicesList from './ServicesList';
import IndustriesList from './IndustriesList';
import ProfileSection from './ProfileSection';

export default function ProfileDisplay() {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Failed to load profile data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.display_name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold text-gray-900">{profile.display_name}</h2>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="w-4 h-4 mr-1.5" />
            {profile.email}
          </div>
        </div>
      </div>

      <ProfileSection title="Services">
        <ServicesList selectedServices={profile.services} />
      </ProfileSection>

      <ProfileSection title="Industries">
        <IndustriesList selectedIndustries={profile.industries} />
      </ProfileSection>
    </div>
  );
}