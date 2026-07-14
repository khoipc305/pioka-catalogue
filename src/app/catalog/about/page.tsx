import Link from 'next/link';
import { COMPANY_CONFIG } from '@/config/company';
import QRCode from 'react-qr-code';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-soft-white">
      {/* About Header */}
      <section className="bg-gradient-to-br from-teal to-dark-teal text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/catalog"
            className="inline-block text-white/80 hover:text-white mb-4 text-sm"
          >
            ← Back to Catalog
          </Link>
          <h1 className="text-4xl font-bold mb-4">About PIOKA USA</h1>
          <p className="text-lg opacity-90">
            Your trusted partner for beverage ingredients, food-service packaging, and custom printing solutions.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Company Overview */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-charcoal mb-4">About Us</h2>
          <p className="text-charcoal/80 leading-relaxed mb-4">
            PIOKA USA is a leading wholesale supplier of premium beverage ingredients and food-service packaging. 
            We specialize in providing high-quality products to bubble tea shops, coffee shops, restaurants, 
            and food service businesses across the United States.
          </p>
          <p className="text-charcoal/80 leading-relaxed">
            From ceremonial Japanese matcha and premium tea leaves to boba pearls, syrups, and eco-friendly 
            packaging solutions, we offer everything you need to create exceptional beverages and serve your 
            customers with style.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-charcoal mb-2">Company</h3>
                <p className="text-charcoal/70">{COMPANY_CONFIG.name}</p>
                <a
                  href={COMPANY_CONFIG.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline"
                >
                  {COMPANY_CONFIG.website}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-2">Contact</h3>
                <p className="text-charcoal/70">
                  <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-teal">
                    {COMPANY_CONFIG.email}
                  </a>
                </p>
                <p className="text-charcoal/70">{COMPANY_CONFIG.phone}</p>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-2">Warehouse</h3>
                <p className="text-charcoal/70">{COMPANY_CONFIG.warehouseAddress}</p>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-2">Business Hours</h3>
                <p className="text-charcoal/70">{COMPANY_CONFIG.businessHours}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="bg-warm-cream p-6 rounded-lg">
                <QRCode value={COMPANY_CONFIG.website} size={150} />
              </div>
              <p className="mt-4 text-charcoal font-semibold">Scan to Visit Our Website</p>
            </div>
          </div>
        </section>

        {/* Shipping Information */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Shipping & Delivery</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                <span className="text-teal">🚚</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Local Delivery</h3>
                <p className="text-charcoal/70">{COMPANY_CONFIG.localDeliveryText}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                <span className="text-teal">📦</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Nationwide Shipping</h3>
                <p className="text-charcoal/70">{COMPANY_CONFIG.nationwideShippingText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href={COMPANY_CONFIG.distributorProgramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-teal to-dark-teal text-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🤝</span>
              <h3 className="text-xl font-bold">Distributor Program</h3>
            </div>
            <p className="opacity-90 mb-4">
              Join our distributor program and become a partner in bringing premium products to businesses nationwide.
            </p>
            <span className="inline-flex items-center text-sm font-semibold">
              Learn More →
            </span>
          </Link>

          <Link
            href={COMPANY_CONFIG.customPrintingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-orange to-orange/80 text-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">🎨</span>
              <h3 className="text-xl font-bold">Custom Printing</h3>
            </div>
            <p className="opacity-90 mb-4">
              Create branded cups, sleeves, and packaging with our custom printing services.
            </p>
            <span className="inline-flex items-center text-sm font-semibold">
              Get Started →
            </span>
          </Link>
        </section>

        {/* Social Media */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Connect With Us</h2>
          
          <div className="flex flex-wrap gap-4">
            {COMPANY_CONFIG.socialMedia.facebook && (
              <a
                href={COMPANY_CONFIG.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-warm-cream text-charcoal rounded-lg hover:bg-teal hover:text-white transition-colors"
              >
                <span>📘</span>
                <span>Facebook</span>
              </a>
            )}
            {COMPANY_CONFIG.socialMedia.instagram && (
              <a
                href={COMPANY_CONFIG.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-warm-cream text-charcoal rounded-lg hover:bg-teal hover:text-white transition-colors"
              >
                <span>📷</span>
                <span>Instagram</span>
              </a>
            )}
            {COMPANY_CONFIG.socialMedia.tiktok && (
              <a
                href={COMPANY_CONFIG.socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-warm-cream text-charcoal rounded-lg hover:bg-teal hover:text-white transition-colors"
              >
                <span>🎵</span>
                <span>TikTok</span>
              </a>
            )}
            {COMPANY_CONFIG.socialMedia.linkedin && (
              <a
                href={COMPANY_CONFIG.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-warm-cream text-charcoal rounded-lg hover:bg-teal hover:text-white transition-colors"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
