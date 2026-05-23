import { useEffect, useMemo, useState } from "react";
import { Filter, Search, Store } from "lucide-react";
import { AppNav } from "../components/AppNav";
import { BusinessCard } from "../components/BusinessCard";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "../lib/supabase";

const categories = [
  "Todas",
  "Alimentación",
  "Mercería",
  "Ferretería",
  "Zapatería",
  "Moda y complementos",
  "Papelería",
  "Artesanía",
  "Regalos",
  "Peluquería y estética",
  "Servicios",
  "Hostelería",
  "Otros",
];

export function BusinessCatalogPage({
  basePath = "/usuarios/catalogo",
  navMode = "business",
}: {
  basePath?: string;
  navMode?: "business" | "user";
}) {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [search, setSearch] = useState("");
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

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesCategory =
        selectedCategory === "Todas" || business.categoria === selectedCategory;

      const text = `${business.nombre || ""} ${business.descripcion || ""} ${business.direccion || ""} ${business.categoria || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [businesses, selectedCategory, search]);

  return (
    <div className="page-shell">
      <AppNav mode={navMode} />

      <main className="content-wrap">
        <section className="mb-8 rounded-[2rem] border border-barrio-green/10 bg-white/80 p-8 shadow-soft">
          <PageHeader
            eyebrow="Comercios activos"
            title="Descubre comercios de Vallecas"
          >
            Busca negocios locales, filtra por categoría y accede a su ficha pública.
          </PageHeader>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-barrio-light p-5">
              <p className="text-sm font-black uppercase text-barrio-green">
                Comercios publicados
              </p>
              <p className="mt-1 text-4xl font-black text-barrio-deep">
                {businesses.length}
              </p>
            </div>

            <div className="rounded-2xl bg-barrio-light p-5">
              <p className="text-sm font-black uppercase text-barrio-green">
                Resultados visibles
              </p>
              <p className="mt-1 text-4xl font-black text-barrio-deep">
                {filteredBusinesses.length}
              </p>
            </div>

            <div className="rounded-2xl bg-barrio-light p-5">
              <p className="text-sm font-black uppercase text-barrio-green">
                Categoría activa
              </p>
              <p className="mt-2 text-lg font-black text-barrio-deep">
                {selectedCategory}
              </p>
            </div>
          </div>
        </section>

        <section className="card mb-8 grid gap-5 border border-black/5 bg-white/90">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-50">
              <Filter className="text-barrio-orange" size={26} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-barrio-deep">
                Filtrar comercios
              </h2>
              <p className="text-sm text-black/60">
                Encuentra rápidamente el comercio que necesitas.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_0.7fr]">
            <label className="grid gap-2 font-semibold text-barrio-deep">
              Buscar comercio
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40"
                  size={20}
                />
                <input
                  className="w-full rounded-xl border border-black/10 bg-white py-4 pl-12 pr-4 text-black outline-none transition focus:border-barrio-green focus:ring-4 focus:ring-barrio-light"
                  placeholder="Buscar por nombre, descripción, categoría o dirección"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
            </label>

            <label className="grid gap-2 font-semibold text-barrio-deep">
              Tipo de comercio
              <select
                className="rounded-xl border border-black/10 bg-white p-4 text-black outline-none transition focus:border-barrio-green focus:ring-4 focus:ring-barrio-light"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${
                  selectedCategory === category
                    ? "bg-barrio-green text-white"
                    : "bg-barrio-light text-barrio-deep hover:bg-barrio-green/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {message ? (
          <p className="mb-5 rounded-xl bg-barrio-light p-4 font-semibold text-barrio-deep">
            {message}
          </p>
        ) : null}

        {filteredBusinesses.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                className="transition-all duration-300 hover:-translate-y-1"
              >
                <BusinessCard
                  business={{
                    id: business.id,
                    name: business.nombre,
                    description: business.descripcion || "Sin descripción todavía.",
                    address: business.direccion || "Sin dirección todavía.",
                    image: business.foto_url || "",
                    category: business.categoria || "Sin categoría",
                    cif: business.cif || "",
                    responsibleName: business.responsable || "",
                    email: business.email || "",
                    phone: business.telefono || "",
                    size: business.trabajadores || "",
                    information: business.informacion || "",
                    openingTime: business.horario_apertura || "",
                    closingTime: business.horario_cierre || "",
                    website: business.web || "",
                    coordinates: {
                      x: 40.391,
                      y: -3.657,
                    },
                  }}
                  to={`${basePath}/${business.id}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="card flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-orange-50">
              <Store className="text-barrio-orange" size={34} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-barrio-deep">
                No hay resultados
              </h2>
              <p className="mt-2 text-black/70">
                Prueba con otra búsqueda o cambia la categoría seleccionada.
              </p>
            </div>

            <button
              className="btn-secondary"
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("Todas");
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
