import { ArrowRight } from 'lucide-react';
import Button from '../Buttons/Button';
import InfoCard from './InfoCard';

export default function ProductCard({ product }) {
  const Icon = product.icon;

  return (
    <InfoCard icon={Icon} title={product.name} text={product.summary} className="flex h-full flex-col">
      <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {product.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button to="/products" variant="secondary" icon={ArrowRight} className="mt-6 w-fit">
        Learn More
      </Button>
    </InfoCard>
  );
}
