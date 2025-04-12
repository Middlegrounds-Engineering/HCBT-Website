import React from 'react';

interface ReferrerInfoProps {
  data: {
    referrerName: string;
    referrerRelationship: string;
    referrerEmail: string;
    referrerPhone: string;
    ndisDocument?: File;
  };
  onChange: (data: Partial<ReferrerInfoProps['data']>) => void;
}

const ReferrerInfo: React.FC<ReferrerInfoProps> = ({ data, onChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange({ ndisDocument: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Referrer info</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="referrerName" className="block text-sm font-medium text-gray-700">
            Referrer name *
          </label>
          <input
            type="text"
            id="referrerName"
            value={data.referrerName}
            onChange={(e) => onChange({ referrerName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="referrerRelationship" className="block text-sm font-medium text-gray-700">
            Referrer relationship to participant *
          </label>
          <input
            type="text"
            id="referrerRelationship"
            value={data.referrerRelationship}
            onChange={(e) => onChange({ referrerRelationship: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="What is your relationship to the participant?"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="referrerEmail" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="referrerEmail"
              value={data.referrerEmail}
              onChange={(e) => onChange({ referrerEmail: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="referrerPhone" className="block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              type="tel"
              id="referrerPhone"
              value={data.referrerPhone}
              onChange={(e) => onChange({ referrerPhone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Please upload a copy of the NDIS plan
          </label>
          <div className="mt-1">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">(PDF, Word)</p>
        </div>
      </div>
    </div>
  );
};

export default ReferrerInfo;