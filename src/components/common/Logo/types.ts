import { LucideIcon } from 'lucide-react';

export interface LogoSize {
  size: 'sm' | 'md' | 'lg';
}

export interface LogoVariant {
  variant?: 'default' | 'light';
}

export interface LogoProps extends LogoSize, LogoVariant {}

export interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  delay?: number;
  strokeWidth?: number;
}