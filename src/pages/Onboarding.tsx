import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import ServiceSelector from '../components/onboarding/ServiceSelector';
import IndustrySelector from '../components/onboarding/IndustrySelector';
import { services } from '../components/onboarding/ServiceSelector';
import { industries } from '../components/onboarding/IndustrySelector';

const onboardingSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  industries: z.array(z.string()).min(1, 'Please select at least one industry').max(3, 'Please select no more than 3 industries'),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session) {
          await supabase.auth.signOut();
          navigate('/login');
          return;
        }
      } catch (error) {
        console.error('Error checking user:', error);
        await supabase.auth.signOut();
        navigate('/login');
      }
    };

    checkUser();
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fullName: user?.user_metadata?.display_name || '',
      services: [],
      industries: [],
    },
  });

  const selectedServices = watch('services', []);
  const selectedIndustries = watch('industries', []);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirect to login if no user
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleServiceChange = (serviceId: string) => {
    const newServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    setValue('services', newServices, { shouldValidate: true });
  };

  const handleIndustryChange = (industryId: string) => {
    const newIndustries = selectedIndustries.includes(industryId)
      ? selectedIndustries.filter(id => id !== industryId)
      : [...selectedIndustries, industryId];
    if (newIndustries.length <= 3) {
      setValue('industries', newIndustries, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setError(null);

      // Update user metadata with display name
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          display_name: data.fullName
        }
      });

      if (userError) {
        setError('Failed to update user information. Please try again.');
        return;
      }

      // Format services and industries with their labels
      const formattedServices = data.services.map(id => ({
        id,
        label: services.find(s => s.id === id)?.label || ''
      }));

      const formattedIndustries = data.industries.map(id => ({
        id,
        label: industries.find(i => i.id === id)?.label || ''
      }));

      // Update profile with services and industries
      const { error: dbError } = await supabase
        .from('profiles')
        .update({
          services: formattedServices,
          industries: formattedIndustries
        })
        .eq('id', user.id);

      if (dbError) {
        setError('Failed to save profile information. Please try again.');
        return;
      }

      // Navigate to email setup
      navigate('/email-setup');
    } catch (error) {
      console.error('Onboarding error:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Welcome to SpeakerDrive"
      subtitle="Let's personalize your experience"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">
                  Error Saving Information
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <Input
          label="Full Name"
          id="fullName"
          error={errors.fullName?.message}
          icon={User}
          placeholder="Enter your full name"
          {...register('fullName')}
        />

        <ServiceSelector
          selectedServices={selectedServices}
          onChange={handleServiceChange}
          error={errors.services?.message}
        />

        <IndustrySelector
          selectedIndustries={selectedIndustries}
          onChange={handleIndustryChange}
          error={errors.industries?.message}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </AuthLayout>
  );
}