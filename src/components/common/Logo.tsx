import React from 'react';
import { Heart, Sun } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'default' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const colors = {
    default: {
      heart: 'text-purple-600',
      sun: 'text-amber-500',
      text: 'text-gray-900',
      highlight: 'text-purple-600'
    },
    light: {
      heart: 'text-white',
      sun: 'text-amber-300',
      text: 'text-white',
      highlight: 'text-purple-100'
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center">
        <Heart 
          className={`${sizes[size]} ${colors[variant].heart} transform -rotate-12`}
          strokeWidth={2.5}
        />
        <Heart 
          className={`${sizes[size]} ${colors[variant].heart} absolute top-0 left-0 opacity-30 animate-pulse`}
          strokeWidth={2.5}
        />
        <Sun 
          className={`${sizes[size]} ${colors[variant].sun} -ml-1 transform scale-75`}
          strokeWidth={2.5}
        />
      </div>
      <div className={`font-semibold ${textSizes[size]} ${colors[variant].text} flex items-center`}>
        <span>Heart-Centered</span>
        <span className={`mx-1 ${colors[variant].highlight}`}>·</span>
        <span>Behaviour Therapy</span>
      </div>
    </div>
  );
};

export default Logo;