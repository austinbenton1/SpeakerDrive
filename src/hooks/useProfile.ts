import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface UserProfile {
  display_name: string;
  services: string[];
  industries: string[];
  email: string;
  avatar_url?: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('auth_id', user.id)
          .single();

        if (error) throw error;

        setProfile({
          display_name: data.display_name || user.user_metadata?.display_name || '',
          services: data.services || [],
          industries: data.industries || [],
          email: user.email || '',
          avatar_url: data.avatar_url || user.user_metadata?.avatar_url
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('auth_id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);

      // Also update auth metadata for certain fields
      if (updates.display_name || updates.avatar_url) {
        const { error: authError } = await supabase.auth.updateUser({
          data: {
            display_name: updates.display_name,
            avatar_url: updates.avatar_url
          }
        });

        if (authError) throw authError;
      }

      return { error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { error: 'Failed to update profile' };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile
  };
}