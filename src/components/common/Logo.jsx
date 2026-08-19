// AVYSURE logomark — the studio artwork (hornbill + hills + river) rendered
// as a small circular badge with a slow-spinning gradient ring and a soft
// glow. Imports its own CSS so the badge is always correctly sized/circular
// no matter which page mounts it first.
import './common.css';
import logoMark from '../../assets/avysure-mark.png';

export default function Logo({ size = 34, ring = true, animated = true }) {
  const classes = [
    'avysure-logo-badge',
    ring ? 'has-ring' : '',
    animated ? 'is-animated' : '',
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        display: 'inline-flex',
      }}
    >
      <span className="avysure-logo-badge-glow" aria-hidden="true" />
      {ring && <span className="avysure-logo-badge-ring" aria-hidden="true" />}
      <img
        src={logoMark}
        alt="AVYSURE"
        className="avysure-logo-badge-img"
        draggable="false"
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </span>
  );
}
