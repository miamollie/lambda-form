export type EntryType = Applicant & Organisation & RelationshipToNineNine;

export interface Address {
  street: string;
  streetLineTwo: string;
  city: string;
  province: string;
  zip: string;
  country: string;
}

export interface Applicant {
  role: string;
  email: string;
  applicantName: string;
  phoneNumber: string;
}

export interface Organisation {
  organisationName: string;
  streetAddress: string;
  streetAddressTwo?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  website: string;
  foundationYear: string;
  registrationStatus: boolean;
  taxId: string;
  localisation: Localisation;
  hasParentAffiliation: boolean;
  sector: Sector;
  socialMediaHandle: string;
  socialMediaFollowers: string;
  description: string;
}

export interface RelationshipToNineNine {
  contestType: AvailableContestTypes;
  deadline: string;
  specificEvent: boolean;
  priorUse: boolean;
  howDidYouHear: ReferralType;
  featureAgreement: boolean;
  collectEmailAgreement: boolean;
  privacyAgreement: boolean;
}

type ReferralType =
  | "internet"
  | "word_of_mouth"
  | "media"
  | "blog"
  | "social_media"
  | "other";
type AvailableContestTypes =
  | "logo"
  | "web_page"
  | "tshirt"
  | "social_page"
  | "poster"
  | "other_print_design"
  | "unsure";
type Localisation = "local" | "national" | "international";
type Sector =
  | "animal_welfare"
  | "arts_culture"
  | "civic_services"
  | "environmental_advocacy"
  | "education"
  | "international_relations"
  | "health_services"
  | "religion"
  | "social_legal"
  | "other";
