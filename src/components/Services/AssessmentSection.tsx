import React from 'react';
import { ClipboardList } from 'lucide-react';
import { ASSESSMENTS } from '../../constants/services';

const AssessmentSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Assessments</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our aim is to improve the quality of life and support a participant's goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ASSESSMENTS.map((assessment) => (
            <div key={assessment.title} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <ClipboardList className="h-5 w-5 text-purple-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">{assessment.title}</h3>
              </div>
              <p className="text-gray-600">{assessment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentSection;