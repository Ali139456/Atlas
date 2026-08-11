"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type FormSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  id?: string;
};

export function FormSelect({ value, onChange, options, placeholder, id }: FormSelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const displayLabel = value || placeholder;
  const isPlaceholder = !value;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function selectOption(option: string) {
    onChange(option);
    setOpen(false);
  }

  return (
    <div ref={wrapRef} className={`form-select${open ? " is-open" : ""}`}>
      <button
        type="button"
        id={selectId}
        className="form-select-trigger input-neon"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={isPlaceholder ? "form-select-placeholder" : undefined}>{displayLabel}</span>
        <ChevronDown className="form-select-chevron" strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <ul className="form-select-menu" role="listbox" aria-labelledby={selectId}>
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              className={`form-select-option${value === option ? " is-selected" : ""}`}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
