import { ReactNode } from 'react';

interface BrandSectionProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  id?: string;
}

export function BrandSection({ children, className = '', accent = false, id }: BrandSectionProps) {
  return (
    <section 
      id={id}
      className={`relative ${accent ? 'bg-[#f8fafc]' : 'bg-white'} ${className}`}
    >
      {accent && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa]" />
      )}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {children}
      </div>
    </section>
  );
}
