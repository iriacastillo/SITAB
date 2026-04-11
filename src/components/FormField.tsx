import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  id: string;
};

export function InputField({ label, id, ...props }: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="label">{label}</span>
      <input className="field" id={id} {...props} />
    </label>
  );
}

export function TextareaField({ label, id, ...props }: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="label">{label}</span>
      <textarea className="field min-h-28 resize-y" id={id} {...props} />
    </label>
  );
}

export function SelectField({ label, id, children, ...props }: FieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="label">{label}</span>
      <select className="field" id={id} {...props}>
        {children}
      </select>
    </label>
  );
}

export function FakeCaptcha() {
  return (
    <label className="flex items-center gap-3 rounded-lg border border-black/15 bg-white p-4 font-semibold text-black/75">
      <input type="checkbox" required className="h-5 w-5 accent-barrio-green" />
      No soy un robot
    </label>
  );
}
