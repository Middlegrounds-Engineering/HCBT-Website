import React from 'react';

interface NDISPlanInfoProps {
  data: {
    funding: string;
    planManager: string;
    serviceAgreementEmail: string;
    planStartDate: string;
    planEndDate: string;
    hoursAvailable: string;
  };
  onChange: (data: Partial<NDISPlanInfoProps['data']>) => void;
}

const NDISPlanInfo: React.FC<NDISPlanInfoProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">NDIS Plan</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Funding *</label>
          <div className="mt-2 space-y-2">
            {[
              { id: 'self', label: 'Self managed' },
              { id: 'plan', label: 'Plan managed' },
              { id: 'ndia', label: 'NDIA managed' }
            ].map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={option.id}
                  name="funding"
                  value={option.id}
                  checked={data.funding === option.id}
                  onChange={(e) => onChange({ funding: e.target.value })}
                  className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                  required
                />
                <label htmlFor={option.id} className="ml-2 block text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="planManager" className="block text-sm font-medium text-gray-700">
            Plan Manager
          </label>
          <input
            type="text"
            id="planManager"
            value={data.planManager}
            onChange={(e) => onChange({ planManager: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label htmlFor="serviceAgreementEmail" className="block text-sm font-medium text-gray-700">
            Email for service agreement
          </label>
          <input
            type="email"
            id="serviceAgreementEmail"
            value={data.serviceAgreementEmail}
            onChange={(e) => onChange({ serviceAgreementEmail: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="planDates" className="block text-sm font-medium text-gray-700">
              NDIS plan dates
            </label>
            <div className="mt-1 flex space-x-2">
              <input
                type="date"
                value={data.planStartDate}
                onChange={(e) => onChange({ planStartDate: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:p-1"
              />
              <span className="text-gray-500">-</span>
              <input
                type="date"
                value={data.planEndDate}
                onChange={(e) => onChange({ planEndDate: e.target.value })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:p-1"
              />
            </div>
          </div>
          <div>
            <label htmlFor="hoursAvailable" className="block text-sm font-medium text-gray-700">
              Hours available
            </label>
            <input
              type="text"
              id="hoursAvailable"
              value={data.hoursAvailable}
              onChange={(e) => onChange({ hoursAvailable: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Example: 20"
            />
            <p className="mt-1 text-sm text-gray-500">(15 hrs required for NDIS report)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDISPlanInfo;