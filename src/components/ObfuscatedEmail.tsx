import React, { useState, useEffect } from 'react';

interface ObfuscatedEmailProps {
  user?: string;
  domain?: string;
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
}

/**
 * ObfuscatedEmail Component
 * Protects email addresses from spam harvesting crawlers and bots while
 * keeping links accessible and clickable for genuine human users.
 */
export default function ObfuscatedEmail({
  user = 'hello',
  domain = 'abuqitmirlabs.tech',
  className = '',
  children
}: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Dynamically assemble email address only on client-side
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  const handleClick = (e: React.MouseEvent) => {
    const fullEmail = `${user}@${domain}`;
    window.location.href = `mailto:${fullEmail}`;
  };

  if (!email) {
    // Crawlers see encoded HTML entity representation without raw plain-text mailto
    return (
      <span className={className} aria-label="Contact Email">
        {user}&#64;{domain}
      </span>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      className={className}
      rel="nofollow"
    >
      {children || email}
    </a>
  );
}
