import React from 'react';
import LogoIcon from './LogoIcon';
import LogoText from './LogoText';
import type { LogoProps } from './types';

const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'default' }) => {
  return (
    <div className="flex items-center space-x-3">
      <LogoIcon size={size} variant={variant} />
      <LogoText size={size} variant={variant} />
    </div>
  );
};

export default Logo;