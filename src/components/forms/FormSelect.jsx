import { useEffect, useId, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

export default function FormSelect({
  name,
  control,
  label,
  placeholder,
  options,
  rules,
  error,
  disabled = false,
  onValueChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const rootRef = useRef(null);
  const generatedId = useId().replace(/:/g, '');
  const triggerId = `${name}-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;
  const errorId = `${triggerId}-error`;

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [isOpen]);

  const openDropdown = (selectedValue) => {
    const selectedIndex = options.findIndex((option) => option.value === selectedValue);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const selectedOption = options.find((option) => option.value === field.value);

        const selectOption = (option) => {
          field.onChange(option.value);
          onValueChange?.(option.value);
          setHighlightedIndex(options.indexOf(option));
          setIsOpen(false);
        };

        const handleKeyDown = (event) => {
          if (event.key === 'Tab') {
            setIsOpen(false);
            return;
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            setIsOpen(false);
            return;
          }

          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!isOpen) {
              openDropdown(field.value);
              return;
            }
            const direction = event.key === 'ArrowDown' ? 1 : -1;
            setHighlightedIndex((current) => {
              const start = current < 0 ? 0 : current;
              return (start + direction + options.length) % options.length;
            });
            return;
          }

          if ((event.key === 'Enter' || event.key === ' ') && isOpen) {
            event.preventDefault();
            if (highlightedIndex >= 0) selectOption(options[highlightedIndex]);
          }
        };

        return (
          <div ref={rootRef} className="relative grid gap-2 text-sm font-semibold text-white">
            <label htmlFor={triggerId}>{label}</label>
            <button
              ref={field.ref}
              id={triggerId}
              type="button"
              className={`form-input flex items-center justify-between gap-3 text-left disabled:cursor-not-allowed disabled:opacity-50 ${selectedOption ? 'text-white' : 'text-slate-400'}`}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-controls={listboxId}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              aria-activedescendant={isOpen && highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined}
              disabled={disabled}
              onBlur={field.onBlur}
              onClick={() => (isOpen ? setIsOpen(false) : openDropdown(field.value))}
              onKeyDown={handleKeyDown}
            >
              <span className="truncate">{selectedOption?.label || placeholder}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {isOpen ? (
                <motion.ul
                  id={listboxId}
                  role="listbox"
                  aria-label={label}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.14 }}
                  className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-night p-1.5 text-white shadow-soft"
                >
                  {options.map((option, index) => {
                    const isSelected = field.value === option.value;
                    const isHighlighted = highlightedIndex === index;
                    return (
                      <li
                        id={`${listboxId}-option-${index}`}
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 font-medium text-white outline-none transition-colors ${isSelected ? 'bg-accent/20 text-accent' : isHighlighted ? 'bg-white/10' : 'hover:bg-white/10'}`}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectOption(option)}
                      >
                        <span>{option.label}</span>
                        {isSelected ? <Check className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
                      </li>
                    );
                  })}
                </motion.ul>
              ) : null}
            </AnimatePresence>
            {error ? <span id={errorId} className="text-xs text-red-300" role="alert">{error}</span> : null}
          </div>
        );
      }}
    />
  );
}
