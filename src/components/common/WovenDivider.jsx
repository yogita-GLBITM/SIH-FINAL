import './common.css';

/**
 * WovenDivider — the page's signature motif. A repeating diamond/zigzag
 * thread pattern drawn from Naga & Mizo textile borders, redrawn as a
 * glowing SVG line between sections instead of a plain <hr>.
 */
export default function WovenDivider({ color = 'var(--thread-gold)' }) {
  return (
    <div className="woven-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 34" preserveAspectRatio="none">
        <polyline
          className="woven-path"
          points="0,17 40,3 80,31 120,3 160,31 200,3 240,31 280,3 320,31 360,3 400,31 440,3 480,31 520,3 560,31 600,3 640,31 680,3 720,31 760,3 800,31 840,3 880,31 920,3 960,31 1000,3 1040,31 1080,3 1120,31 1160,3 1200,31 1240,3 1280,31 1320,3 1360,31 1400,3 1440,17"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
