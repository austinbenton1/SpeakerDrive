export interface SpeakerLead {
  id: string;
  image: string;
  name: string;
  focus: string;
  unlockType: 'Contact Email' | 'Event Email' | 'Event URL';
  industryCategory: string;
  extensionType: 'com' | 'org' | 'edu' | 'gov' | 'net';
  addedToSpeakerDrive: 'Within the Last Week' | 'Within the Last Month' | 'Older';
  linkedIn?: string;
  isUnlocked: boolean;
  eventPurpose: string;
  hostOrganization?: string;
  targetAudience?: string;
  companySize?: string;
  location?: string;
  eventDetails?: {
    location: string;
    type: string;
    format: string;
  };
}

export interface FilterOptions {
  timeframe: string;
  industry: string;
  extension: string;
  unlockType: string;
  searchQuery?: string;
  eventInfo?: string;
  orgName?: string;
  speakers?: string;
  leadType?: string[];
  location?: string[];
  companySize?: string[];
}