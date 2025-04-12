import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT } from '../constants/contact';

export default function Contact() {
  return (
    <div className="bg-white py-12" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-500">
            Providing service to the Brisbane, Gold Coast, Tamworth and Northern Rivers Regions
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center justify-center">
            <Mail className="h-6 w-6 text-purple-600" />
            <a href={`mailto:${CONTACT.EMAIL}`} className="ml-3 text-base text-gray-500">
              {CONTACT.EMAIL}
            </a>
          </div>
          <div className="flex items-center justify-center">
            <Phone className="h-6 w-6 text-purple-600" />
            <a href={`tel:${CONTACT.PHONE.HREF}`} className="ml-3 text-base text-gray-500">
              {CONTACT.PHONE.NUMBER}
            </a>
          </div>
          <div className="flex items-center justify-center">
            <MapPin className="h-6 w-6 text-purple-600" />
            <Link to="/contact" className="ml-3 text-base text-gray-500 hover:text-purple-600">
              View Service Areas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}