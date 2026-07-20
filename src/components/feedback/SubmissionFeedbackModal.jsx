import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CircleAlert, CircleCheck, MailWarning, X } from 'lucide-react';
import Button from '../Buttons/Button';

const VARIANTS = {
  success: {
    icon: CircleCheck,
    iconClass: 'bg-accent/15 text-accent ring-accent/25',
  },
  'partial-success': {
    icon: CircleCheck,
    badge: MailWarning,
    iconClass: 'bg-accent/15 text-accent ring-accent/25',
  },
  error: {
    icon: CircleAlert,
    iconClass: 'bg-red-400/10 text-red-300 ring-red-300/20',
  },
};

const PARTICLES = [
  { x: -126, y: 52, rotate: -145, color: 'bg-accent' },
  { x: -96, y: -62, rotate: -95, color: 'bg-secondary' },
  { x: -58, y: 78, rotate: 135, color: 'bg-primary' },
  { x: -34, y: -88, rotate: -155, color: 'bg-accent' },
  { x: 6, y: -102, rotate: 175, color: 'bg-secondary' },
  { x: 42, y: -78, rotate: 120, color: 'bg-primary' },
  { x: 78, y: 68, rotate: 155, color: 'bg-accent' },
  { x: 112, y: -48, rotate: 95, color: 'bg-secondary' },
  { x: 132, y: 34, rotate: 145, color: 'bg-primary' },
  { x: -142, y: -18, rotate: -115, color: 'bg-secondary' },
  { x: 68, y: -112, rotate: 130, color: 'bg-accent' },
  { x: -12, y: 92, rotate: -170, color: 'bg-primary' },
];

export default function SubmissionFeedbackModal({
  isOpen,
  type = 'success',
  title,
  message,
  onClose,
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const generatedId = useId().replace(/:/g, '');
  const titleId = `submission-feedback-title-${generatedId}`;
  const descriptionId = `submission-feedback-description-${generatedId}`;
  const variant = VARIANTS[type] || VARIANTS.success;
  const Icon = variant.icon;
  const Badge = variant.badge;

  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = globalThis.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusableElements = modalRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      globalThis.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-night/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-md">
            {!prefersReducedMotion ? (
              <div className="pointer-events-none absolute left-1/2 top-20 z-0" aria-hidden="true">
                {PARTICLES.map((particle, index) => (
                  <motion.span
                    key={`${particle.x}-${particle.y}`}
                    className={`absolute h-3 w-2 rounded-full rounded-br-none ${particle.color}`}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.5 }}
                    animate={{
                      x: particle.x,
                      y: particle.y,
                      rotate: particle.rotate,
                      opacity: [0, 0.85, 0],
                      scale: [0.5, 1, 0.8],
                    }}
                    transition={{ duration: 1.15, delay: 0.12 + index * 0.025, ease: 'easeOut' }}
                  />
                ))}
              </div>
            ) : null}
            <motion.section
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-night p-6 text-center text-white shadow-soft sm:p-8"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.94, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97, y: prefersReducedMotion ? 0 : 8 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.24, ease: 'easeOut' }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close confirmation dialog"
                className="focus-ring absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                onClick={onClose}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className={`relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ring-1 ${variant.iconClass}`}>
                <Icon className="h-9 w-9" aria-hidden="true" />
                {Badge ? (
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-night p-1 text-amber-300 ring-1 ring-white/10">
                    <Badge className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}
              </div>

              <h2 id={titleId} className="font-heading text-2xl font-bold">{title}</h2>
              <div id={descriptionId}>
                <p className="mt-3 leading-7 text-slate-300">{message}</p>
                {type === 'partial-success' ? (
                  <p className="mt-2 font-semibold text-accent">Our team will contact you soon.</p>
                ) : null}
              </div>

              <Button type="button" className="mt-7 min-w-28" onClick={onClose}>
                Close
              </Button>
            </motion.section>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
