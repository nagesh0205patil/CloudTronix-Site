import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;

  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav className="bg-white py-3 text-sm dark:bg-night" aria-label="Breadcrumb">
      <ol className="container-page flex flex-wrap items-center gap-2 text-muted dark:text-slate-400">
        <li>
          <Link to="/" className="font-semibold hover:text-primary dark:hover:text-secondary">Home</Link>
        </li>
        {parts.map((part, index) => {
          const href = `/${parts.slice(0, index + 1).join('/')}`;
          const label = part.replaceAll('-', ' ');
          const isLast = index === parts.length - 1;
          return (
            <li key={href} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="capitalize text-ink dark:text-white">{label}</span>
              ) : (
                <Link to={href} className="capitalize hover:text-primary dark:hover:text-secondary">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
