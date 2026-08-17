import { STATES } from '../../data/states';
import Logo from '../common/Logo';
import './footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="login-brand">
            <Logo size={40} />
            <span className="login-brand-name">AVYSURE</span>
          </div>
          <p>Northeast states, one companion. Built for the traveller who wants the
            trail, not just the postcard.</p>
        </div>

        <div className="footer-col">
          <span className="eyebrow">States</span>
          <ul>
            {STATES.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <span className="eyebrow">Toolkit</span>
          <ul>
            <li>Digital itinerary generator</li>
            <li>Live weather</li>
            <li>Expense tracker</li>
            <li>Geo-fenced hidden gems</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} AVYSURE — Smart India Hackathon concept build</span>
        <span>Made with ❤️ for the Northeast</span>
      </div>
    </footer>
  );
}
