import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary text-white shadow-lift hover:-translate-y-0.5 hover:bg-blue-700',
  secondary: 'bg-white text-primary ring-1 ring-primary/20 hover:-translate-y-0.5 hover:bg-blue-50 dark:bg-white/10 dark:text-white dark:ring-white/15',
  ghost: 'bg-transparent text-ink hover:bg-slate-100 dark:text-white dark:hover:bg-white/10',
};

export default function Button({ children, to, href, variant = 'primary', className = '', icon: Icon, ...props }) {
  const classes = `focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`;
  const content = (
    <>
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
