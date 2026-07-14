export interface CompanyConfig {
  name: string;
  website: string;
  email: string;
  phone: string;
  warehouseAddress: string;
  businessHours: string;
  localDeliveryText: string;
  nationwideShippingText: string;
  distributorProgramLink: string;
  customPrintingLink: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    linkedin?: string;
  };
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: 'PIOKA USA',
  website: 'https://piokausa.com',
  email: 'info@piokausa.com',
  phone: '(555) 123-4567',
  warehouseAddress: '123 Warehouse Way, San Diego, CA 92101',
  businessHours: 'Monday - Friday: 8:00 AM - 5:00 PM PST',
  localDeliveryText: 'Local delivery available in the San Diego area. Contact us for scheduling and pricing.',
  nationwideShippingText: 'We ship nationwide across the United States. Free shipping on pallet orders.',
  distributorProgramLink: 'https://piokausa.com/pages/distributor',
  customPrintingLink: 'https://piokausa.com/pages/custom-printing',
  socialMedia: {
    facebook: 'https://facebook.com/piokausa',
    instagram: 'https://instagram.com/piokausa',
    tiktok: 'https://tiktok.com/@piokausa',
    linkedin: 'https://linkedin.com/company/piokausa',
  },
};
