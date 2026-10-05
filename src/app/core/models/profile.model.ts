export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
  primary?: boolean;
}

export interface ProfileStat {
  label: string;
  value: string;
  detail: string;
}

export interface Profile {
  name: string;
  tagline: string;
  field: string;
  role: string;
  status: string;
  clearanceLevel: string;
  systemOrigin: string;
  email: string;
  location: string;
  availability: string;
  bioSummary: string;
  corePhilosophy: string;
  interests: string[];
  stats: ProfileStat[];
  socialLinks: SocialLink[];
}
