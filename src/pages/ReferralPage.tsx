import React, { useEffect } from 'react';
import ReferralForm from '../components/ReferralForm/ReferralForm';

const ReferralPage = () => {
  useEffect(() => {
    document.title = 'Referrals | Heart-Centered';
  }, []);

  return <ReferralForm />;
};

export default ReferralPage;