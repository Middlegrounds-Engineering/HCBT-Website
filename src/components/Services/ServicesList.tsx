import React from 'react';
import { Brain, Heart, Users, ClipboardCheck, BookOpen, Shield } from 'lucide-react';
import { SERVICES } from '../../constants/services';

const ServicesList = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center mb-4">
                <span className="p-2 bg-purple-100 rounded-lg">
                  <service.icon className="h-6 w-6 text-purple-600" />
                </span>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">{service.title}</h3>
              </div>
              <p className="text-gray-600 flex-grow">{service.description}</p>
              {service.features && (
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="h-1.5 w-1.5 bg-purple-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList;