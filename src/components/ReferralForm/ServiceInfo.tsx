import React from 'react';

const services = [
  'Positive Behaviour Support',
  'NDIS Report (15 hours)',
  'Diagnostic Assessment (DSM-5)',
  'Behaviour Assessment Report',
  'Therapeutic Services'
];

interface ServiceInfoProps {
  data: {
    services: string[];
    contactName: string;
    contactEmail: string;
  };
  onChange: (data: Partial<ServiceInfoProps['data']>) => void;
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ data, onChange }) => {
  const handleServiceChange = (service: string, checked: boolean) => {
    const updatedServices = checked
      ? [...data.services, service]
      : data.services.filter(s => s !== service);
    onChange({ services: updatedServices });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Service required *</h3>
      
      <div className="space-y-2">
        {services.map((service) => (
          <div key={service} className="flex items-center">
            <input
              type="checkbox"
              id={service}
              checked={data.services.includes(service)}
              onChange={(e) => handleServiceChange(service, e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor={service} className="ml-2 block text-sm text-gray-700">
              {service}
            </label>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Best contact for arranging appointments *</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="contactName"
              value={data.contactName}
              onChange={(e) => onChange({ contactName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="contactEmail"
              value={data.contactEmail}
              onChange={(e) => onChange({ contactEmail: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;