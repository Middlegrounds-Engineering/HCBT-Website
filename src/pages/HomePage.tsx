import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Values from '../components/Values';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Values />
      <Contact />
    </>
  );
}