import React from 'react';

interface ParticipantInfoProps {
  data: {
    participantName: string;
    dateOfBirth: string;
    ndisNumber: string;
    address: string;
  };
  onChange: (data: Partial<ParticipantInfoProps['data']>) => void;
}

const ParticipantInfo: React.FC<ParticipantInfoProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Participant Info</h3>
      
      <div>
        <label htmlFor="participantName" className="block text-sm font-medium text-gray-700">
          Participant name *
        </label>
        <input
          type="text"
          id="participantName"
          value={data.participantName}
          onChange={(e) => onChange({ participantName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="Provide initials if you prefer"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Date of birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={data.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 [&::-webkit-calendar-picker-indicator]:p-1"
          />
        </div>
        <div>
          <label htmlFor="ndisNumber" className="block text-sm font-medium text-gray-700">
            NDIS number
          </label>
          <input
            type="text"
            id="ndisNumber"
            value={data.ndisNumber}
            onChange={(e) => onChange({ ndisNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Participant address / location
        </label>
        <input
          type="text"
          id="address"
          value={data.address}
          onChange={(e) => onChange({ address: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          placeholder="Full address or suburb"
        />
      </div>
    </div>
  );
};

export default ParticipantInfo;