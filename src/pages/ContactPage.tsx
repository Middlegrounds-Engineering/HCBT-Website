import React, { useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT } from '../constants/contact';
import ServiceAreaMap from '../components/Map/ServiceAreaMap';

const locations = [
  { city: 'Gold Coast', lat: -28.0167, lng: 153.4000 },
  { city: 'Brisbane', lat: -27.4698, lng: 153.0251 },
  { city: 'Logan', lat: -27.6389, lng: 153.1073 },
  { city: 'Beaudesert', lat: -27.9833, lng: 152.9833 },
  { city: 'Canungra', lat: -28.0167, lng: 153.1667 },
  { city: 'Lismore', lat: -28.8167, lng: 153.2833 },
  { city: 'Narrabri', lat: -30.3167, lng: 149.7833 },
  { city: 'Ipswich', lat: -27.6167, lng: 152.7667 },
  { city: 'Tamworth', lat: -31.0833, lng: 150.9167 }
];

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact | Heart-Centered';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We provide services across multiple locations in Queensland and New South Wales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-purple-600 mr-3" />
                <a href={`tel:${CONTACT.PHONE.HREF}`} className="text-gray-700 hover:text-purple-600">
                  {CONTACT.PHONE.NUMBER}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-purple-600 mr-3" />
                <a href={`mailto:${CONTACT.EMAIL}`} className="text-gray-700 hover:text-purple-600">
                  {CONTACT.EMAIL}
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-600 mr-3 mt-1" />
                <div>
                  <p className="text-gray-700">Service Locations:</p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                    {locations.map(loc => (
                      <li key={loc.city} className="text-gray-600">{loc.city}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-6">Service Areas</h2>
            <ServiceAreaMap locations={locations} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;