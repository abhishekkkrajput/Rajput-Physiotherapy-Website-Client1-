
// Add React import to resolve React namespace error
import React from 'react';

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapLink: string;
  image: string;
  specialization: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}
