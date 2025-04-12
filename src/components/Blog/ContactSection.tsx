import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { CONTACT } from '../../constants/contact';

const ContactSection = () => {
  return (
    <div className="bg-purple-50 rounded-lg p-8">
      <h3 className="text-xl font-semibold mb-4">Get in touch with HCBT</h3>
      <p className="text-gray-700 mb-6">
        Interested in learning more about our services? We'd love to hear from you!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href={`tel:${CONTACT.PHONE.HREF}`}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
        >
          <Phone className="h-5 w-5" />
          <span>{CONTACT.PHONE.NUMBER}</span>
        </a>
        <a
          href={`mailto:${CONTACT.EMAIL}`}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
        >
          <Mail className="h-5 w-5" />
          <span>{CONTACT.EMAIL}</span>
        </a>
      </div>
      <div className="mt-6">
        <Link
          to="/referrals"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
        >
          Make a Referral
        </Link>
      </div>
    </div>
  );
};

export default ContactSection;