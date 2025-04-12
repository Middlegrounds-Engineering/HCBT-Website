import React, { useState } from 'react';
import ParticipantInfo from './ParticipantInfo';
import GuardianInfo from './GuardianInfo';
import ServiceInfo from './ServiceInfo';
import NDISPlanInfo from './NDISPlanInfo';
import ReferrerInfo from './ReferrerInfo';
import { useToast } from '../common/Toast/ToastContext';

interface FormData {
  // Participant Info
  participantName: string;
  dateOfBirth: string;
  ndisNumber: string;
  address: string;
  
  // Guardian Info
  guardianName: string;
  phone: string;
  email: string;
  
  // Service Info
  services: string[];
  contactName: string;
  contactEmail: string;
  
  // NDIS Plan Info
  funding: 'self' | 'plan' | 'ndia' | '';
  planManager: string;
  serviceAgreementEmail: string;
  planStartDate: string;
  planEndDate: string;
  hoursAvailable: string;
  
  // Referrer Info
  referrerName: string;
  referrerRelationship: string;
  referrerEmail: string;
  referrerPhone: string;
  ndisDocument?: File;
}

const ReferralForm = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    // Participant Info
    participantName: '',
    dateOfBirth: '',
    ndisNumber: '',
    address: '',
    
    // Guardian Info
    guardianName: '',
    phone: '',
    email: '',
    
    // Service Info
    services: [],
    contactName: '',
    contactEmail: '',
    
    // NDIS Plan Info
    funding: '',
    planManager: '',
    serviceAgreementEmail: '',
    planStartDate: '',
    planEndDate: '',
    hoursAvailable: '',
    
    // Referrer Info
    referrerName: '',
    referrerRelationship: '',
    referrerEmail: '',
    referrerPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'services') {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-referral`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || 'Failed to send referral');
      }

      showToast('Referral sent successfully! We will contact you soon.', 'success');
      // Reset form
      setFormData({
        participantName: '',
        dateOfBirth: '',
        ndisNumber: '',
        address: '',
        guardianName: '',
        phone: '',
        email: '',
        services: [],
        contactName: '',
        contactEmail: '',
        funding: '',
        planManager: '',
        serviceAgreementEmail: '',
        planStartDate: '',
        planEndDate: '',
        hoursAvailable: '',
        referrerName: '',
        referrerRelationship: '',
        referrerEmail: '',
        referrerPhone: '',
      });
    } catch (error) {
      console.error('Error sending referral:', error);
      showToast(error.message || 'Failed to send referral. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section: keyof FormData, data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-6 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Referral form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <ParticipantInfo 
              data={formData} 
              onChange={(data) => handleChange('participantName', data)} 
            />
            <GuardianInfo 
              data={formData} 
              onChange={(data) => handleChange('guardianName', data)} 
            />
            <ServiceInfo 
              data={formData} 
              onChange={(data) => handleChange('services', data)} 
            />
            <NDISPlanInfo
              data={formData}
              onChange={(data) => handleChange('funding', data)}
            />
            <ReferrerInfo
              data={formData}
              onChange={(data) => handleChange('referrerName', data)}
            />
            
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Submit Referral'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;