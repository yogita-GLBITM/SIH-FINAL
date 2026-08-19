import { useState } from 'react';
import { STATES, TRIP_INTERESTS } from '../../data/states';
import WovenDivider from '../common/WovenDivider';
import './itinerary.css';

const DAY_TEMPLATES = {
  adventure: ['Sunrise trek briefing & gear check', 'River-crossing / gorge trail', 'Camp under the ridge, bonfire stories'],
  family: ['Easy valley walk & local breakfast', 'Craft village visit, hands-on weaving', 'Sunset viewpoint, slow dinner'],
  culture: ['Monastery / sacred grove visit', 'Meet a local artisan or storyteller', 'Traditional dinner & folk performance'],
  nature: ['Birding at first light', 'Waterfall or cave-system hike', 'Botanical trail, wildlife spotting'],
  spiritual: ['Dawn prayer / temple visit', 'Silent valley walk', 'Evening reflection by the river'],
  offbeat: ['Off-map village trail with a local guide', 'Hidden gem detour (unmarked)', 'Home-stay dinner with the host family'],
};

export default function ItineraryGenerator() {
  const [destination, setDestination] = useState(STATES[0].id);
  const [people, setPeople] = useState(2);
  const [days, setDays] = useState(4);
  const [interest, setInterest] = useState('adventure');
  const [plan, setPlan] = useState(null);

  const state = STATES.find((s) => s.id === destination);

  const generate = () => {
    const template = DAY_TEMPLATES[interest];
    const gemPool = state.gems;
    const itineraryDays = Array.from({ length: days }).map((_, i) => ({
      day: i + 1,
      focus: template[i % template.length],
      gem: gemPool[i % gemPool.length],
    }));
    setPlan({ itineraryDays, state, people, interest, days });
  };

  return (
    <section id="itinerary" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Digital itinerary generator</span>
          <h2>Tell it your <span className="section-tag-word">taste</span>, it drafts the trip.</h2>
          <p>Pick a state, your headcount and the kind of trip you're after — AVYSURE drafts a
            day-by-day plan pulled from real, lesser-known spots instead of the usual checklist.</p>
        </div>

        <div className="itin-grid">
          <div className="itin-form glass-panel reveal">
            <label className="itin-field">
              <span>Destination state</span>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                {STATES.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </label>

            <div className="itin-field-row">
              <label className="itin-field">
                <span>No. of people</span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={people}
                  onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
                />
              </label>
              <label className="itin-field">
                <span>Trip length (days)</span>
                <input
                  type="number"
                  min={2}
                  max={10}
                  value={days}
                  onChange={(e) => setDays(Math.min(10, Math.max(2, Number(e.target.value) || 2)))}
                />
              </label>
            </div>

            <span className="itin-field-label">Trip taste</span>
            <div className="itin-interest-grid">
              {TRIP_INTERESTS.map((t) => (
                <button
                  key={t.id}
                  className={`itin-interest-chip ${interest === t.id ? 'is-active' : ''}`}
                  onClick={() => setInterest(t.id)}
                  type="button"
                >
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>

            <button className="btn btn-primary itin-generate" onClick={generate}>
              Generate itinerary <span>✨</span>
            </button>
          </div>

          <div className="itin-result">
            {!plan ? (
              <div className="itin-placeholder glass-panel reveal">
                <span className="itin-placeholder-icon">🧭</span>
                <p>Your {days}-day {state.name} plan for {people} traveller{people > 1 ? 's' : ''} will
                  appear here — generated instantly, no waiting on a call centre.</p>
              </div>
            ) : (
              <div className="itin-timeline reveal">
                <div className="itin-timeline-head">
                  <h3>{plan.days} days in {plan.state.name}</h3>
                  <span className="itin-timeline-meta">
                    {plan.people} traveller{plan.people > 1 ? 's' : ''} · {TRIP_INTERESTS.find((t) => t.id === plan.interest)?.label}
                  </span>
                </div>
                <WovenDivider color={plan.state.accent} />
                <ol>
                  {plan.itineraryDays.map((d) => (
                    <li key={d.day} className="itin-day-card">
                      <span className="itin-day-num" style={{ background: plan.state.accent }}>Day {d.day}</span>
                      <div>
                        <h4>{d.focus}</h4>
                        <p>Detour: <strong>{d.gem.name}</strong> — {d.gem.story.slice(0, 96)}…</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
