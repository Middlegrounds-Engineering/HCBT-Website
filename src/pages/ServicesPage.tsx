import React, { useEffect } from 'react';
import ServiceHero from '../components/Services/ServiceHero';
import ServicesList from '../components/Services/ServicesList';
import AssessmentSection from '../components/Services/AssessmentSection';
import ContactCTA from '../components/Services/ContactCTA';

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'Services | Heart-Centered';
  }, []);

  return (
    <div className="min-h-screen">
      <ServiceHero />
      <ServicesList />
      <AssessmentSection />
      <ContactCTA />
    </div>
  );
};

export default ServicesPage;