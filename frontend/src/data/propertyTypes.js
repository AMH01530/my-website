// These values must match the 'type' categories the model was trained on
// (see data/egypt_real_estate_listings.csv). Changing the value strings
// changes what the model receives — keep them exact.
export const PROPERTY_TYPES = [
  { value: 'Apartment', icon: '🏢', description: 'A single unit within a residential building.' },
  { value: 'Villa', icon: '🏡', description: 'A detached standalone home with private land.' },
  { value: 'Townhouse', icon: '🏘️', description: 'An attached multi-floor home sharing walls.' },
  { value: 'Duplex', icon: '🏠', description: 'A two-level unit within a larger building.' },
  { value: 'Chalet', icon: '🏖️', description: 'A holiday or coastal-resort residence.' },
  { value: 'Penthouse', icon: '🏙️', description: 'A top-floor unit, often with a terrace.' },
  { value: 'Twin House', icon: '🏚️', description: 'A semi-detached home sharing one wall.' },
];

// A curated sample of real locations from the training data, offered as
// suggestions. The field stays free text so any location can be typed —
// the model handles unseen values without breaking.
export const SAMPLE_LOCATIONS = [
  'New Cairo City, Cairo',
  'Madinaty, Cairo',
  '6 October City, Giza',
  'Sheikh Zayed City, Giza',
  'North Coast',
  'Hurghada, Red Sea',
  'El Shorouk City, Cairo',
  'Mostakbal City - Future City, Cairo',
  'New Alamein City, Al Alamein, North Coast',
  'New Heliopolis, Cairo',
];
