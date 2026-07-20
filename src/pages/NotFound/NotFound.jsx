import { Home } from 'lucide-react';
import Button from '../../components/Buttons/Button';
import Seo from '../../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <section className="flex min-h-[70vh] items-center bg-surface dark:bg-night">
        <div className="container-page text-center">
          <p className="font-heading text-7xl font-bold text-primary">404</p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-ink dark:text-white">Page not found</h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted dark:text-slate-300">The page you are looking for may have moved or does not exist.</p>
          <Button to="/" icon={Home} className="mt-8">Go Home</Button>
        </div>
      </section>
    </>
  );
}
