import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";
import { useAppStore } from "../hooks/useAppStore";

export function MapPage() {
  const { businesses } = useAppStore();

  return (
    <div className="page-shell">
      <AppNav mode="business" />
      <main className="content-wrap">
        <PageHeader eyebrow="Mapa del municipio" title="Vallecas en modo prototipo">
          Representación visual con pines de los comercios publicados. Punto futuro de backend: conectar con un servicio de mapas y geocodificación.
        </PageHeader>
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[32rem] overflow-hidden rounded-lg border border-barrio-green bg-barrio-light shadow-soft">
            <img
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
              alt="Vista aérea urbana usada como mapa visual"
            />
            <div className="absolute inset-6 rounded-lg border-2 border-dashed border-barrio-green bg-white/35" />
            <p className="absolute left-6 top-6 rounded-lg bg-white px-4 py-2 font-black text-barrio-deep">Vallecas</p>
            {businesses.map((business, index) => (
              <Link
                className="absolute grid -translate-x-1/2 -translate-y-1/2 gap-1 text-center"
                style={{ left: `${business.coordinates.x}%`, top: `${business.coordinates.y}%` }}
                key={business.id}
                to={`/comercios/activos/${business.id}`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-barrio-orange font-black text-black shadow-soft ring-4 ring-white">
                  {index + 1}
                </span>
                <span className="rounded-lg bg-white px-2 py-1 text-xs font-black text-barrio-deep shadow-soft">{business.name}</span>
              </Link>
            ))}
          </div>
          <div className="grid gap-4">
            {businesses.map((business, index) => (
              <Link className="card flex items-center gap-4 hover:border-barrio-green" key={business.id} to={`/comercios/activos/${business.id}`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-barrio-orange font-black">{index + 1}</span>
                <span>
                  <span className="block font-black text-barrio-deep">{business.name}</span>
                  <span className="text-sm text-black/70">{business.address}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
