// types/user.ts

type Gender = 'male' | 'female' | 'other';

type SecurityLevel = 'low' | 'medium' | 'high';

type TransportationPreference = 'public' | 'private' | 'both';

type EmergencyContact = {
  name: string;
  relationship: string;
  phoneNumber: string;
};

type TravelPreferences = {
  preferredDestinations: string[];
  transportationPreference: TransportationPreference;
  accommodationType: string[];
};

type UserInfo = {
  gender: Gender;
  country?: string;
  securityLevel: SecurityLevel;
  name: string;
  age?: number;
  email: string;
  phoneNumber?: string;
  preferredLanguage?: string[];
  travelPreferences?: TravelPreferences;
  lastLoginDate: Date;
  accountCreationDate: Date;
  isEmailVerified: boolean;
  emergencyContact?: EmergencyContact;
};


export {
  UserInfo,
  TravelPreferences,
  EmergencyContact, TransportationPreference, SecurityLevel, Gender

}
