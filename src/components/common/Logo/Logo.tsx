import React from 'react';
import { Heart } from 'lucide-react';
import { sizes, colors } from './styles';
import type { LogoProps } from './types';

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'default' }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative inline-block group">
        <div className="relative transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
          <Heart 
            className={`${sizes[size]} ${colors[variant].heart}`}
            strokeWidth={2.5}
          />
        </div>
      </div>
      <div className={`font-semibold ${sizes[size]} ${colors[variant].text} flex items-center`}>
        <span className="transition-colors duration-300 hover:text-purple-600">Heart-Centered</span>
        <span className={`mx-1 ${colors[variant].highlight}`}>·</span>
        <span className="transition-colors duration-300 hover:text-purple-600">Behaviour Therapy</span>
      </div>
    </div>
  );
}

export default Logo;