import React from 'react';

const Values = () => {
  return (
    <div className="bg-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Values</h2>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Empathy"
              className="mx-auto h-48 w-48 rounded-full object-cover"
            />
            <h3 className="mt-6 text-xl font-medium text-gray-900">Empathy</h3>
            <p className="mt-2 text-base text-gray-500">Understanding and sharing the feelings of our clients to provide better support.</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Professional Excellence"
              className="mx-auto h-48 w-48 rounded-full object-cover"
            />
            <h3 className="mt-6 text-xl font-medium text-gray-900">Professional Excellence</h3>
            <p className="mt-2 text-base text-gray-500">Delivering high-quality, evidence-based services with integrity and dedication.</p>
          </div>
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Person-Centered Care"
              className="mx-auto h-48 w-48 rounded-full object-cover"
            />
            <h3 className="mt-6 text-xl font-medium text-gray-900">Person-Centered Care</h3>
            <p className="mt-2 text-base text-gray-500">Tailoring our approach to meet individual needs and goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;