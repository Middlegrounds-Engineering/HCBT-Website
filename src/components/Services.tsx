import React from 'react';
import { Brain, Heart, Users } from 'lucide-react';

const services = [
  {
    title: 'Behaviour Support',
    description: 'Comprehensive assessment and intervention strategies to support positive behaviour change and improve quality of life.',
    icon: Brain
  },
  {
    title: 'Positive Behaviour Therapy',
    description: 'Evidence-based approaches to develop and implement positive behaviour support strategies tailored to individual needs.',
    icon: Heart
  },
  {
    title: 'Psychosocial Therapy',
    description: 'Supporting emotional wellbeing and social skills development through therapeutic interventions and counseling.',
    icon: Users
  }
];

const Services = () => {
  return (
    <div className="py-12 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Comprehensive support services tailored to your needs
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-md shadow-lg">
                        <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{service.title}</h3>
                    <p className="mt-5 text-base text-gray-500">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;