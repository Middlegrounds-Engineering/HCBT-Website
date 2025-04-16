import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Values from '../components/Values';
import Contact from '../components/Contact';

export default function HomePage() {
  useEffect(() => {
    document.title = 'NDIS Behaviour Therapy | Heart-Centered';
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Values />
      <Contact />
    </>
  );
}