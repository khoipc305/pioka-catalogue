'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Printer } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/catalog" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-teal">PIOKA</span>
            <span className="text-2xl font-light text-charcoal">USA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/catalog"
              className={`text-sm font-medium transition-colors ${
                isActive('/catalog') ? 'text-teal' : 'text-charcoal hover:text-teal'
              }`}
            >
              Catalog
            </Link>
            <Link
              href="/catalog/search"
              className={`text-sm font-medium transition-colors ${
                isActive('/catalog/search') ? 'text-teal' : 'text-charcoal hover:text-teal'
              }`}
            >
              Search
            </Link>
            <Link
              href="/catalog/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/catalog/about') ? 'text-teal' : 'text-charcoal hover:text-teal'
              }`}
            >
              About
            </Link>
            <a
              href="https://piokausa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-charcoal hover:text-teal transition-colors"
            >
              Shop Online
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/catalog/search"
              className="p-2 text-charcoal hover:text-teal transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={handlePrint}
              className="p-2 text-charcoal hover:text-teal transition-colors"
              aria-label="Print catalog"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-charcoal hover:text-teal transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-light-border">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive('/catalog') ? 'text-teal' : 'text-charcoal hover:text-teal'
                }`}
              >
                Catalog
              </Link>
              <Link
                href="/catalog/search"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive('/catalog/search') ? 'text-teal' : 'text-charcoal hover:text-teal'
                }`}
              >
                Search
              </Link>
              <Link
                href="/catalog/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  isActive('/catalog/about') ? 'text-teal' : 'text-charcoal hover:text-teal'
                }`}
              >
                About
              </Link>
              <a
                href="https://piokausa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-charcoal hover:text-teal transition-colors"
              >
                Shop Online
              </a>
              <div className="flex items-center space-x-4 pt-2 border-t border-light-border">
                <Link
                  href="/catalog/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 text-sm text-charcoal hover:text-teal"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Link>
                <button
                  onClick={() => {
                    handlePrint();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-sm text-charcoal hover:text-teal"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
