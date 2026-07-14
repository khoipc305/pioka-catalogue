'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface FilterPanelProps {
  availableTypes?: string[];
  availableVendors?: string[];
  availableTags?: string[];
}

export default function FilterPanel({ availableTypes = [], availableVendors = [], availableTags = [] }: FilterPanelProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);

  const currentType = searchParams.get('type') || '';
  const currentVendor = searchParams.get('vendor') || '';
  const currentTag = searchParams.get('tag') || '';
  const currentAvailability = searchParams.get('availability') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/catalog/search?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-lg font-semibold text-charcoal">Filters</h3>
        <svg
          className={`w-5 h-5 text-charcoal transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="space-y-6">
          {/* Availability */}
          <div>
            <h4 className="font-medium text-charcoal mb-2">Availability</h4>
            <select
              value={currentAvailability}
              onChange={(e) => updateFilter('availability', e.target.value)}
              className="w-full px-3 py-2 border border-light-border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <option value="">All</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Product Type */}
          {availableTypes.length > 0 && (
            <div>
              <h4 className="font-medium text-charcoal mb-2">Product Type</h4>
              <select
                value={currentType}
                onChange={(e) => updateFilter('type', e.target.value)}
                className="w-full px-3 py-2 border border-light-border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">All Types</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Vendor */}
          {availableVendors.length > 0 && (
            <div>
              <h4 className="font-medium text-charcoal mb-2">Vendor</h4>
              <select
                value={currentVendor}
                onChange={(e) => updateFilter('vendor', e.target.value)}
                className="w-full px-3 py-2 border border-light-border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">All Vendors</option>
                {availableVendors.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tags */}
          {availableTags.length > 0 && (
            <div>
              <h4 className="font-medium text-charcoal mb-2">Tags</h4>
              <select
                value={currentTag}
                onChange={(e) => updateFilter('tag', e.target.value)}
                className="w-full px-3 py-2 border border-light-border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">All Tags</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Range */}
          <div>
            <h4 className="font-medium text-charcoal mb-2">Price Range</h4>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={currentMinPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
                className="w-1/2 px-3 py-2 border border-light-border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <input
                type="number"
                placeholder="Max"
                value={currentMaxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                className="w-1/2 px-3 py-2 border border-light-border rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => router.push('/catalog/search')}
            className="w-full py-2 text-teal hover:underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
