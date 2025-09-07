'use client';

import { Service } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/pricing';
import { getServiceComplexity, getProjectTimeline } from '@/lib/services';

interface ServiceCardProps {
  service: Service;
  className?: string;
  showBookButton?: boolean;
  onSelect?: (service: Service) => void;
}

export function ServiceCard({ 
  service, 
  className = '', 
  showBookButton = true,
  onSelect 
}: ServiceCardProps) {
  const complexity = getServiceComplexity(service.id);
  const timeline = getProjectTimeline(service.id, service.minArea);

  const handleSelect = () => {
    if (onSelect) {
      onSelect(service);
    }
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${className}`}>
      <div className="aspect-video overflow-hidden relative">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-slate-900">
            {formatPrice(service.basePrice)}/sq ft
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl leading-tight">{service.name}</CardTitle>
          <Badge 
            variant={complexity === 'Simple' ? 'default' : complexity === 'Moderate' ? 'secondary' : 'outline'}
            className="ml-2 flex-shrink-0"
          >
            {complexity}
          </Badge>
        </div>
        <CardDescription className="text-sm line-clamp-3">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Service Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-600">Duration:</span>
              <div className="text-slate-900">{service.duration}h base</div>
            </div>
            <div>
              <span className="font-medium text-slate-600">Min Area:</span>
              <div className="text-slate-900">{service.minArea} sq ft</div>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-slate-600">Timeline:</span>
              <div className="text-slate-900">{timeline}</div>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <div className="font-medium text-sm text-slate-600 mb-2">Includes:</div>
            <ul className="text-xs text-slate-600 space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
              {service.features.length > 3 && (
                <li className="text-slate-500 italic">+{service.features.length - 3} more features</li>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {showBookButton && (
              <Button className="flex-1" onClick={handleSelect} asChild={!onSelect}>
                {onSelect ? (
                  <span>Select Service</span>
                ) : (
                  <a href={`/book?service=${service.id}`}>Book Now</a>
                )}
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <a href={`/calculator?service=${service.id}`}>Get Quote</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ServiceGridProps {
  services: Service[];
  className?: string;
  showBookButton?: boolean;
  onServiceSelect?: (service: Service) => void;
}

export function ServiceGrid({ 
  services, 
  className = '', 
  showBookButton = true,
  onServiceSelect 
}: ServiceGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          showBookButton={showBookButton}
          onSelect={onServiceSelect}
        />
      ))}
    </div>
  );
}

interface ServiceComparisonProps {
  services: Service[];
  className?: string;
}

export function ServiceComparison({ services, className = '' }: ServiceComparisonProps) {
  if (services.length === 0) return null;

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse border border-slate-200 rounded-lg">
        <thead>
          <tr className="bg-slate-50">
            <th className="border border-slate-200 p-4 text-left font-semibold">Service</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Price/sq ft</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Duration</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Complexity</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Min Area</th>
            <th className="border border-slate-200 p-4 text-center font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-slate-50 transition-colors">
              <td className="border border-slate-200 p-4">
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-slate-600 mt-1">{service.category}</div>
              </td>
              <td className="border border-slate-200 p-4 text-center font-semibold">
                {formatPrice(service.basePrice)}
              </td>
              <td className="border border-slate-200 p-4 text-center">
                {service.duration}h
              </td>
              <td className="border border-slate-200 p-4 text-center">
                <Badge 
                  variant={getServiceComplexity(service.id) === 'Simple' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {getServiceComplexity(service.id)}
                </Badge>
              </td>
              <td className="border border-slate-200 p-4 text-center">
                {service.minArea} sq ft
              </td>
              <td className="border border-slate-200 p-4 text-center">
                <Button size="sm" asChild>
                  <a href={`/book?service=${service.id}`}>Book</a>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}