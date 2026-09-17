"use client";

import { useId, type ComponentPropsWithRef, type ReactNode } from "react";

// Wires the control's help and error text into aria-describedby so the message
// is announced as part of the field, not read as loose page text.
export function describedBy(
  id: string,
  options: { help?: string; error?: string }
): string | undefined {
  const ids = [options.help ? `${id}-help` : null, options.error ? `${id}-error` : null].filter(
    (value): value is string => value !== null
  );

  return ids.length > 0 ? ids.join(" ") : undefined;
}

type FieldProps = {
  id: string;
  label: string;
  help?: string;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, help, error, children }: FieldProps) {
  return (
    <div className="rs-field">
      <label className="rs-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {help ? (
        <p className="rs-help" id={`${id}-help`}>
          {help}
        </p>
      ) : null}
      {error ? (
        <p className="rs-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FieldGroupProps = {
  legend: string;
  help?: string;
  error?: string;
  columns?: boolean;
  children: ReactNode;
};

export function FieldGroup({ legend, help, error, columns, children }: FieldGroupProps) {
  const legendId = useId();

  return (
    <div className="rs-field" role="group" aria-labelledby={legendId}>
      <p className="rs-label" id={legendId}>
        {legend}
      </p>
      <div className={columns ? "rs-choices rs-choices-row" : "rs-choices"}>{children}</div>
      {help ? <p className="rs-help">{help}</p> : null}
      {error ? (
        <p className="rs-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  invalid,
  ...rest
}: ComponentPropsWithRef<"input"> & { invalid?: boolean }) {
  return <input {...rest} className="rs-input" aria-invalid={invalid ? true : undefined} />;
}

export function TextArea({
  invalid,
  ...rest
}: ComponentPropsWithRef<"textarea"> & { invalid?: boolean }) {
  return <textarea {...rest} className="rs-input rs-textarea" aria-invalid={invalid ? true : undefined} />;
}

type RadioOptionProps = {
  value: string;
  label: string;
  description?: string;
  input: ComponentPropsWithRef<"input">;
};

export function RadioOption({ value, label, description, input }: RadioOptionProps) {
  return (
    <label className="rs-choice">
      <input {...input} type="radio" value={value} className="rs-choice-input" />
      <span className="rs-choice-text">
        <span className="rs-choice-label">{label}</span>
        {description ? <span className="rs-choice-desc">{description}</span> : null}
      </span>
    </label>
  );
}

type CheckRowProps = {
  id: string;
  title: string;
  input: ComponentPropsWithRef<"input">;
  children: ReactNode;
};

export function CheckRow({ id, title, input, children }: CheckRowProps) {
  return (
    <div className="rs-check-row">
      <input {...input} type="checkbox" id={id} className="rs-check" />
      <div>
        <label className="rs-check-title" htmlFor={id}>
          {title}
        </label>
        <p className="rs-check-text">{children}</p>
      </div>
    </div>
  );
}