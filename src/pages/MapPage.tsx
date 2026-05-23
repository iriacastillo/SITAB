import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Store } from "lucide-react";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export function MapPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadBusinesses() {
      const { data, error } = await supabase
        .from("comercios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
        return;
      }

      setBusinesses(data || []);
    }

    loadBusinesses();
  }, []);

  function getPinPosition(business: any, index: number) {
  if (!business.latitud || !business.longitud) {
    const fallback = [
      { left: 32, top: 38 },
      { left: 58, top: 42 },
      { left: 44, top: 62 },
      { left: 70, top: 58 },
    ];

    return fallback[index % fallback.length];
  }

  const minLat = 40.35;
  const maxLat = 40.42;
  const minLng = -3.72;
  const maxLng = -3.62;

  const left = ((business.longitud - minLng) / (maxLng - minLng)) * 100;
  const top = ((maxLat - business.latitud) / (maxLat - minLat)) * 100;

  return {
    left: Math.max(8, Math.min(92, left)),
    top: Math.max(8, Math.min(92, top)),
  };
  }

  return (
    <div className="page-shell">
      <AppNav mode="business" />

      <main className="content-wrap">
        <section className="mb-8 rounded-[2rem] border border-barrio-green/10 bg-white/80 p-8 shadow-soft">
          <PageHeader eyebrow="Mapa del municipio" title="Comercios activos en Vallecas">
            Consulta visualmente los comercios publicados en SITAB y accede a su ficha.
          </PageHeader>
        </section>

        {message ? (
          <p className="mb-5 rounded-xl bg-barrio-light p-4 font-semibold text-barrio-deep">
            {message}
          </p>
        ) : null}

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-barrio-green/20 bg-barrio-light shadow-soft">
            <iframe
  title="Mapa de Vallecas"
  className="absolute inset-0 h-full w-full"
  src="https://www.openstreetmap.org/export/embed.html?bbox=-3.704%2C40.365%2C-3.625%2C40.405&layer=mapnik"
  style={{
    border: 0,
    width: "100%",
    height: "100%",
  }}
/>

            <div className="absolute inset-0 bg-barrio-light/20 pointer-events-none" />

            <div className="absolute left-6 top-6 rounded-2xl bg-white/90 px-5 py-3 shadow-soft">
              <p className="text-xs font-black uppercase text-barrio-green">
                Zona
              </p>
              <p className="text-xl font-black text-barrio-deep">Vallecas</p>
            </div>

            {businesses.map((business, index) => {
              const position = getPinPosition(business, index);

              return (
                <Link
                  className="group absolute grid -translate-x-1/2 -translate-y-1/2 gap-2 text-center"
                  style={{ left: `${position.left}%`, top: `${position.top}%` }}
                  key={business.id}
                  to={`/comercios/activos/${business.id}`}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-barrio-orange font-black text-black shadow-soft ring-4 ring-white transition group-hover:scale-110">
                    <MapPin size={26} />
                  </span>

                  <span className="max-w-40 rounded-xl bg-white px-3 py-2 text-xs font-black text-barrio-deep shadow-soft">
                    {business.nombre || "Comercio"}
                  </span>
                </Link>
              );
            })}
          </div>

          <aside className="grid gap-4">
            <div className="card bg-white/90">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50">
                  <Store className="text-barrio-orange" size={28} />
                </div>

                <div>
                  <p className="text-sm font-black uppercase text-barrio-green">
                    Comercios publicados
                  </p>
                  <p className="text-3xl font-black text-barrio-deep">
                    {businesses.length}
                  </p>
                </div>
              </div>
            </div>

            {businesses.length ? (
              businesses.map((business, index) => (
                <Link
                  className="card flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-barrio-green/30 hover:shadow-2xl"
                  key={business.id}
                  to={`/comercios/activos/${business.id}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-barrio-orange font-black">
                    {index + 1}
                  </span>

                  <span>
                    <span className="block font-black text-barrio-deep">
                      {business.nombre || "Comercio sin nombre"}
                    </span>

                    <span className="text-sm text-black/70">
                      {business.direccion || "Sin dirección todavía."}
                    </span>

                    <span className="mt-1 block text-xs font-black uppercase text-barrio-green">
                      {business.categoria || "Sin categoría"}
                    </span>
                  </span>
                </Link>
              ))
            ) : (
              <p className="card text-black/70">
                Todavía no hay comercios publicados.
              </p>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
}
