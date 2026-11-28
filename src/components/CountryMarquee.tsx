import React from 'react';
import { Link } from 'react-router-dom';

const marketCountries = [
  { name: "United States", flag: "🇺🇸", path: "/us-market" },
  { name: "United Kingdom", flag: "🇬🇧", path: "/uk-market" },
  { name: "Saudi Arabia", flag: "🇸🇦", path: "/saudi-arabia-market" },
  { name: "United Arab Emirates", flag: "🇦🇪", path: "/uae-market" },
  { name: "Canada", flag: "🇨🇦", path: "/canada-market" },
  { name: "Australia", flag: "🇦🇺", path: "/australia-market" },
  { name: "Poland", flag: "🇵🇱", path: "/poland-market" },
  { name: "Pakistan", flag: "🇵🇰", path: "/pakistan-market" },
  { name: "Kuwait", flag: "🇰🇼", path: "/kuwait-market" },
  { name: "Qatar", flag: "🇶🇦", path: "/qatar-market" },
];

const CountryMarquee: React.FC = () => {
  return (
    <section className="border-y overflow-hidden bg-[#09090b] border-white/10 py-6 relative" id="global-presence" aria-label="Global Markets Marquee">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none"></div>

      <div className="flex whitespace-nowrap w-max animate-marquee">
        <div className="flex items-center gap-10 px-6 text-gray-300 text-sm md:text-base font-medium">
          {marketCountries.map((country, idx) => (
            <Link
              key={idx}
              to={country.path}
              className="flex gap-3 items-center group transition-all duration-300 hover:text-[#ccff00] px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <span className="text-xl">{country.flag}</span>
              <span className="tracking-tight text-white/90 group-hover:text-[#ccff00] font-semibold">{country.name}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/30 group-hover:bg-[#ccff00] transition-colors ml-2" />
            </Link>
          ))}
        </div>
        <div aria-hidden="true" className="flex items-center gap-10 px-6 text-gray-300 text-sm md:text-base font-medium">
          {marketCountries.map((country, idx) => (
            <Link
              key={`dup-${idx}`}
              to={country.path}
              className="flex gap-3 items-center group transition-all duration-300 hover:text-[#ccff00] px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              <span className="text-xl">{country.flag}</span>
              <span className="tracking-tight text-white/90 group-hover:text-[#ccff00] font-semibold">{country.name}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00]/30 group-hover:bg-[#ccff00] transition-colors ml-2" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryMarquee;
