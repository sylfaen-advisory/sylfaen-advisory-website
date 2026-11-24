// Verifiable credentials shown on credential cards. Kept here so the
// homepage and service pages link to the same verification URLs and
// use the same link text.

export interface Badge {
  href: string;
  name: string;
  issuer: string;
  /** Link text, shown before the ↗ arrow. */
  verify: string;
}

export const cmiDiploma: Badge = {
  href: 'https://partnerconnect.cmi.org.uk/public/validate?Surname=Biscoe&CertificationDate=2026-8-25&Ref=CMIMZ5Rhzvty1',
  name: 'CMI Level 7 Diploma in Professional Consulting (2026)',
  issuer: 'Chartered Management Institute',
  verify: 'Verify on the CMI website (press the button on CMI’s page to confirm)',
};

export const platformBadges: Badge[] = [
  {
    href: 'https://www.credly.com/earner/earned/badge/f9be8f3e-612c-4bff-9e49-f906cb79a92f',
    name: 'Bentley Accredited BCDE Information Provider',
    issuer: 'Bentley Systems',
    verify: 'Verify',
  },
  {
    href: 'https://www.credly.com/earner/earned/badge/29a44522-9a6b-47f7-b0e2-7b9d5d53bf82',
    name: 'Bentley Accredited BCDE Project Administrator',
    issuer: 'Bentley Systems',
    verify: 'Verify',
  },
  {
    href: 'https://www.credly.com/earner/earned/badge/0c527c60-4a76-410f-a95e-e82c2628ba15',
    name: 'Information Management Practitioner (ISO 19650)',
    issuer: 'Operam Academy',
    verify: 'Verify',
  },
  {
    href: 'https://www.bentley.com/en/ecosystem-catalog/catalog/61713',
    name: 'Listed in the Bentley Ecosystem Catalog',
    issuer: 'Bentley Systems',
    verify: 'View listing',
  },
];
