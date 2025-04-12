export const sizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10'
} as const;

export const textSizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl'
} as const;

export const colors = {
  default: {
    heart: 'text-purple-600',
    text: 'text-gray-900',
    highlight: 'text-purple-600'
  },
  light: {
    heart: 'text-white',
    text: 'text-white',
    highlight: 'text-purple-100'
  }
} as const;