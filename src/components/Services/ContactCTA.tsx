import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../../constants/contact';

export default function ContactCTA() {
  return (
    <div className="bg-purple-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Ready to get started?</h2>
          <p className="mt-4 text-xl text-purple-100">
            Contact us today to discuss how we can support you
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/referrals"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50"
            >
              Make a referral
            </Link>
            <a
              href={`tel:${CONTACT.PHONE.HREF}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800"
            >
              Call us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}