import { Brain, Heart, ClipboardCheck, BookOpen, Shield } from 'lucide-react';

export const SERVICES = [
  {
    title: 'Positive Behaviour Therapy',
    description: 'Evidence-based approaches to develop and implement positive behaviour support strategies tailored to individual needs.',
    icon: Heart,
    features: [
      'Behaviour assessment and planning',
      'Skill development strategies',
      'Environmental modifications',
      'Staff training and support'
    ]
  },
  {
    title: 'Behaviour Support',
    description: 'Evidence-based strategies to support positive behaviour change and improve overall quality of life.',
    icon: Brain,
    features: [
      'Functional behaviour assessment',
      'Positive behaviour support plans',
      'Crisis prevention and management',
      'Progress monitoring'
    ]
  },
  {
    title: 'NDIS Reports',
    description: 'Comprehensive reports that meet NDIS requirements and support funding requests.',
    icon: ClipboardCheck,
    features: [
      'Behaviour support reports',
      'Progress reports',
      'Assessment reports',
      'Funding review reports'
    ]
  },
  {
    title: 'Staff Training',
    description: 'Professional development for support workers and care teams.',
    icon: BookOpen,
    features: [
      'Positive behaviour support',
      'Crisis prevention',
      'Person-centered approaches',
      'Documentation and reporting'
    ]
  },
  {
    title: 'Restrictive Practice Authorization',
    description: 'Support with restrictive practice assessment and authorization processes.',
    icon: Shield,
    features: [
      'Assessment of restrictive practices',
      'Development of reduction strategies',
      'Authorization documentation',
      'Staff training on alternatives'
    ]
  }
] as const;

export const ASSESSMENTS = [
  {
    title: 'Behaviour Assessment',
    description: 'Detailed analysis of behaviour patterns, triggers, and functions.'
  },
  {
    title: 'Environmental Assessment',
    description: 'Evaluation of physical and social environments that impact behaviour.'
  },
  {
    title: 'Restrictive Practices Assessment',
    description: 'Assessment of current practices and alternatives to restriction.'
  },
  {
    title: 'Functional Behaviour Assessment',
    description: 'In-depth analysis of behaviour functions and maintaining factors.'
  }
] as const;