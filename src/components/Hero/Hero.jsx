import { useEffect, useState } from 'react';
import GradImg from '../common/GradImg';
import { STATES } from '../../data/states';
import './hero.css';

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STATES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = STATES[active];

  return (
    <section id="hero" className="hero">
      <div className="hero-slides">
        {STATES.map((st, i) => (
          <div key={st.id} className={`hero-slide ${i === active ? 'is-active' : ''}`}>
            <GradImg seed={st.heroImg} w={1920} h={1200} alt={st.name} tint="warm" />
          </div>
        ))}
        <div className="hero-scrim" />
      </div>

      <div className="hero-content container">
        <span className="eyebrow">Northeast States of India · North East</span>
        <h1 className="hero-title">
          Northeast states.<br />
          One <em>impossible</em> geography.
        </h1>
        <p className="hero-sub">
          AVYSURE plans the trip your feed never shows you — living root bridges, floating
          islands, rock-cut temples and villages that still keep their own myths. Currently
          showing <strong>{s.name}</strong> — {s.tagline.toLowerCase()}.
        </p>

        <div className="hero-cta-row">
          <a href="#itinerary" className="btn btn-primary">Build my itinerary <span>→</span></a>
          <a href="#hidden-gems" className="btn btn-ghost">Explore hidden gems</a>
        </div>

        <div className="hero-state-rail">
          {STATES.map((st, i) => (
            <button
              key={st.id}
              className={`hero-state-pill ${i === active ? 'is-active' : ''}`}
              style={{ '--pill-accent': st.accent }}
              onClick={() => setActive(i)}
            >
              <span className="hero-state-index">0{i + 1}</span>
              {st.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
