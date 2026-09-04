export type Language = 'bn' | 'en';

export interface Companion {
  id: string;
  name: string;
  nameBn: string;
  age: number;
  gender: 'male' | 'female' | 'non-binary';
  city: string;
  cityBn: string;
  area: string;
  areaBn: string;
  languages: string[];
  occasions: string[];
  hourlyRate: number; // in BDT ৳
  rating: number;
  reviewCount: number;
  verified: boolean;
  backgroundChecked: boolean;
  bio: string;
  bioBn: string;
  image: string;
  tags: string[];
  tagsBn: string[];
  availableDays: string[];
  interests: string[];
  interestsBn: string[];
  badges: string[];
}

export interface Occasion {
  id: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  typicalRate: string;
  typicalRateBn: string;
  recommendedDuration: string;
  recommendedDurationBn: string;
  popularFor: string[];
  popularForBn: string[];
}

export interface BookingFormState {
  companionId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  time: string;
  durationHours: number;
  occasionId: string;
  venueName: string;
  venueAddress: string;
  specialNotes: string;
  agreedToPlatonicPolicy: boolean;
  agreedToPublicPlaceOnly: boolean;
  paymentMethod: 'bkash' | 'nagad' | 'card' | 'wallet';
}

export interface Review {
  id: string;
  companionId: string;
  author: string;
  authorBn: string;
  rating: number;
  date: string;
  comment: string;
  commentBn: string;
  occasion: string;
  occasionBn: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameBn: string;
  role: string;
  roleBn: string;
  quote: string;
  quoteBn: string;
  avatar: string;
  rating: number;
  occasion: string;
  occasionBn: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  category: 'general' | 'safety' | 'booking' | 'companion';
  question: string;
  questionBn: string;
  answer: string;
  answerBn: string;
}
