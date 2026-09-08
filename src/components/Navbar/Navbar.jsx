import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '../../constants/site';
import Button from '../Buttons/Button';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/90 text-white backdrop-blur-xl">
      <nav className="container-page flex h-20 items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary font-heading text-lg font-bold text-white">CT</span>
          <span>
            <span className="block font-heading text-lg font-bold text-white">{siteConfig.shortName}</span>
            <span className="block text-xs font-semibold text-slate-400">Smart Technology</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-white/10 text-secondary' : 'text-slate-200 hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <Button to="/contact" variant="secondary">Request Demo</Button>
          <Button to="/contact">Get Quote</Button>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg text-white xl:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-x-0 top-20 z-40 border-t border-white/10 bg-night/95 px-4 py-5 shadow-lift backdrop-blur-xl xl:hidden" id="mobile-navigation">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-primary text-white' : 'text-slate-200 hover:bg-white/10'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex gap-2">
            <Button to="/contact" className="sm:w-auto" onClick={() => setOpen(false)}>Get Quote</Button>
            <Button to="/contact" variant="secondary" onClick={() => setOpen(false)}>Request Demo</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
