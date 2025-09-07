'use client';

import { useState } from 'react';
import { MarbleDesign } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MARBLE_DESIGNS, getAllColors, getAllOrigins, getPriceCategory } from '@/lib/designs';

interface DesignGalleryProps {
  selectedDesignId?: string;
  onDesignSelect?: (design: MarbleDesign) => void;
  showSelection?: boolean;
  className?: string;
  maxItems?: number;
}

export function DesignGallery({ 
  selectedDesignId = '',
  onDesignSelect,
  showSelection = true,
  className = '',
  maxItems
}: DesignGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  // Filter designs based on search and filters
  const filteredDesigns = MARBLE_DESIGNS.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.color.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesColor = !colorFilter || design.color.toLowerCase().includes(colorFilter.toLowerCase());
    const matchesOrigin = !originFilter || design.origin === originFilter;
    
    let matchesPrice = true;
    if (priceFilter === 'budget') matchesPrice = design.priceMultiplier <= 1.0;
    else if (priceFilter === 'standard') matchesPrice = design.priceMultiplier > 1.0 && design.priceMultiplier <= 1.3;
    else if (priceFilter === 'premium') matchesPrice = design.priceMultiplier > 1.3 && design.priceMultiplier <= 1.6;
    else if (priceFilter === 'luxury') matchesPrice = design.priceMultiplier > 1.6;
    
    return matchesSearch && matchesColor && matchesOrigin && matchesPrice;
  }).slice(0, maxItems);

  const handleDesignClick = (design: MarbleDesign) => {
    if (onDesignSelect) {
      onDesignSelect(design);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setColorFilter('');
    setOriginFilter('');
    setPriceFilter('');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search designs by name, color, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={resetFilters} className="whitespace-nowrap">
            Clear Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Select value={colorFilter} onValueChange={setColorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by color..." />
              </SelectTrigger>
              <SelectContent>
                {getAllColors().map((color) => (
                  <SelectItem key={color} value={color.toLowerCase()}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={originFilter} onValueChange={setOriginFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by origin..." />
              </SelectTrigger>
              <SelectContent>
                {getAllOrigins().map((origin) => (
                  <SelectItem key={origin} value={origin}>
                    {origin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by price..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget-Friendly</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-600">
        Showing {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''}
        {maxItems && MARBLE_DESIGNS.length > maxItems && ` of ${MARBLE_DESIGNS.length} total`}
      </div>

      {/* Design Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDesigns.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            isSelected={selectedDesignId === design.id}
            onClick={showSelection ? () => handleDesignClick(design) : undefined}
            showSelection={showSelection}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredDesigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 text-lg mb-2">No designs found</div>
          <p className="text-slate-600">Try adjusting your search criteria or clearing filters.</p>
          <Button variant="outline" onClick={resetFilters} className="mt-4">
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

interface DesignCardProps {
  design: MarbleDesign;
  isSelected?: boolean;
  onClick?: () => void;
  showSelection?: boolean;
  className?: string;
}

export function DesignCard({ 
  design, 
  isSelected = false, 
  onClick, 
  showSelection = true,
  className = '' 
}: DesignCardProps) {
  const priceCategory = getPriceCategory(design.priceMultiplier);

  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
        showSelection ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${
        isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={design.image}
          alt={design.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-slate-900">
            {design.type}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge 
            variant={priceCategory === 'Budget-Friendly' ? 'default' : 
                    priceCategory === 'Standard' ? 'secondary' : 
                    priceCategory === 'Premium' ? 'outline' : 'destructive'}
            className="bg-white/90"
          >
            {priceCategory}
          </Badge>
        </div>
        {isSelected && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Selected
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight">{design.name}</h3>
            <div className="text-right ml-2">
              <Badge variant="outline" className="text-xs">
                {design.priceMultiplier > 1 
                  ? `+${((design.priceMultiplier - 1) * 100).toFixed(0)}%` 
                  : design.priceMultiplier < 1
                  ? `-${((1 - design.priceMultiplier) * 100).toFixed(0)}%`
                  : 'Standard'
                }
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-slate-500">Color:</span>
              <div className="font-medium">{design.color}</div>
            </div>
            <div>
              <span className="text-slate-500">Pattern:</span>
              <div className="font-medium text-xs">{design.pattern}</div>
            </div>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2">
            {design.description}
          </p>

          <div className="text-xs text-slate-500">
            <span className="font-medium">Origin:</span> {design.origin}
          </div>

          {showSelection && onClick && (
            <Button 
              variant={isSelected ? "default" : "outline"} 
              size="sm" 
              className="w-full mt-3"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              {isSelected ? 'Selected' : 'Select Design'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface DesignComparisonProps {
  designs: MarbleDesign[];
  className?: string;
}

export function DesignComparison({ designs, className = '' }: DesignComparisonProps) {
  if (designs.length === 0) return null;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse border border-slate-200 rounded-lg">
        <thead>
          <tr className="bg-slate-50">
            <th className="border border-slate-200 p-4 text-left font-semibold">Design</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Type</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Color</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Pattern</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Origin</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Price Impact</th>
          </tr>
        </thead>
        <tbody>
          {designs.map((design) => (
            <tr key={design.id} className="hover:bg-slate-50 transition-colors">
              <td className="border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={design.image} 
                    alt={design.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium">{design.name}</div>
                    <div className="text-sm text-slate-600">{getPriceCategory(design.priceMultiplier)}</div>
                  </div>
                </div>
              </td>
              <td className="border border-slate-200 p-4 text-center text-sm">
                {design.type}
              </td>
              <td className="border border-slate-200 p-4 text-center">
                {design.color}
              </td>
              <td className="border border-slate-200 p-4 text-center text-sm">
                {design.pattern}
              </td>
              <td className="border border-slate-200 p-4 text-center text-sm">
                {design.origin}
              </td>
              <td className="border border-slate-200 p-4 text-center">
                <Badge variant="outline">
                  {design.priceMultiplier > 1 
                    ? `+${((design.priceMultiplier - 1) * 100).toFixed(0)}%` 
                    : design.priceMultiplier < 1
                    ? `-${((1 - design.priceMultiplier) * 100).toFixed(0)}%`
                    : 'Standard'
                  }
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}