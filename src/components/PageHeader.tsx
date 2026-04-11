export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-sm font-black uppercase tracking-wide text-barrio-green">{eyebrow}</p> : null}
      <h1 className="text-3xl font-black text-barrio-deep sm:text-4xl">{title}</h1>
      {children ? <div className="mt-3 text-lg leading-8 text-black/70">{children}</div> : null}
    </div>
  );
}
