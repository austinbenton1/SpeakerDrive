import React, { useState } from 'react';
import { User, Mail } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import EditableField from './EditableField';
import EditableServicesList from './EditableServicesList';
import EditableIndustriesList from './EditableIndustriesList';
import ProfileSection from './ProfileSection';
import { validateName } from '../../utils/validation';

export default function ProfileEdit() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [isSaving, setIsSaving] = useState(false);

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

  const handleNameUpdate = async (name: string) => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile({ display_name: name });
      if (error) throw new Error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleServicesUpdate = async (services: string[]) => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile({ services });
      if (error) throw new Error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleIndustriesUpdate = async (industries: string[]) => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile({ industries });
      if (error) throw new Error(error);
    } finally {
      setIsSaving(false);
    }
  };

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
        <div className="flex-1">
          <EditableField
            label="Display Name"
            value={profile.display_name}
            onChange={(value) => handleNameUpdate(value)}
            onSave={async () => {}}
            onCancel={() => {}}
            validate={validateName}
          />
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Mail className="w-4 h-4 mr-1.5" />
            {profile.email}
          </div>
        </div>
      </div>

      <ProfileSection title="Services" isEditing>
        <EditableServicesList
          selectedServices={profile.services}
          onSave={handleServicesUpdate}
          onCancel={() => {}}
        />
      </ProfileSection>

      <ProfileSection title="Industries" isEditing>
        <EditableIndustriesList
          selectedIndustries={profile.industries}
          onSave={handleIndustriesUpdate}
          onCancel={() => {}}
        />
      </ProfileSection>
    </div>
  );
}