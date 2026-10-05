import { useState } from 'react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#predict', label: 'Predict' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#about', label: 'About' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function handleNavigate(href) {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="navbar-brand" onClick={(e) => { e.preventDefault(); handleNavigate('#home'); }}>
          <span aria-hidden="true">🏠</span>
          <span>Egyptian House Price Predictor</span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavigate(link.href); }}
            >
              {link.label}
            </a>
          ))}
          <span className="navbar-badge">AI-assisted · React · Python</span>
        </nav>

        <button
          className="navbar-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="navbar-mobile" aria-label="Mobile">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavigate(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
