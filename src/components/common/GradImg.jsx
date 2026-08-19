import { useState } from 'react';
import './common.css';

/**
 * GradImg — a placeholder-photo component with a warm duotone "grade"
 * so mismatched stock/placeholder imagery still reads as one brand.
 * Swap the `src` builder for real asset URLs once photography is ready.
 */
export default function GradImg({ seed, w = 1200, h = 900, alt = '', className = '', tint = 'warm' }) {
  const [failed, setFailed] = useState(false);
  const src = seed?.startsWith('http') ? seed : `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=${w}&q=88`;

  if (failed) {
    return (
      <div className={`grad-img grad-img--fallback tint-${tint} ${className}`} role="img" aria-label={alt}>
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <div className={`grad-img tint-${tint} ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
}
