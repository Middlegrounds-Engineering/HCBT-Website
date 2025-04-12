import React from 'react';

interface GuardianInfoProps {
  data: {
    guardianName: string;
    phone: string;
    email: string;
  };
  onChange: (data: Partial<GuardianInfoProps['data']>) => void;
}

const GuardianInfo: React.FC<GuardianInfoProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Guardian / Plan Nominee details</h3>
      
      <div>
        <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700">
          Guardian / Plan Nominee
        </label>
        <input
          type="text"
          id="guardianName"
          value={data.guardianName}
          onChange={(e) => onChange({ guardianName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="Name"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default GuardianInfo;