import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="focus-ring fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white shadow-lift"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
