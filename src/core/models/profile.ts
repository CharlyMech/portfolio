export interface ProfileStatus {
  available: boolean;
  availableForFreelance: boolean;
  updatedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon: string;
}

export interface ContactMethod {
  type: 'email' | 'calendly' | 'form';
  label: string;
  value: string;
  url?: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  bio: string;
  github: {
    username: string;
  };
  location: {
    city: string;
    country: string;
    coords: string;
    /** [longitude, latitude] tuple for map centering */
    coordinates: { lon: number; lat: number };
  };
  status: ProfileStatus;
  social: SocialLink[];
  contact: ContactMethod[];
}
