import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto mt-10 max-w-3xl divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink dark:text-white"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <span>{item.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen ? <p className="px-5 pb-5 leading-7 text-muted dark:text-slate-300">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
