import { useEffect, useMemo, useState } from "react";
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

      const text = `${business.nombre || ""} ${business.descripcion || ""} ${business.direccion || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [businesses, selectedCategory, search]);

  return (
    <div className="page-shell">
      <AppNav mode={navMode} />

      <main className="content-wrap">
        <PageHeader eyebrow="Comercios activos" title="Comercios activos en Vallecas">
          Consulta los comercios publicados y filtra por tipo de comercio.
        </PageHeader>

        <section className="card mb-8 grid gap-4 md:grid-cols-[1fr_0.7fr]">
          <label className="grid gap-2 font-semibold text-barrio-deep">
            Buscar comercio
            <input
              className="rounded-lg border border-black/10 bg-white p-3 text-black outline-none focus:border-barrio-green"
              placeholder="Buscar por nombre, descripción o dirección"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className="grid gap-2 font-semibold text-barrio-deep">
            Tipo de comercio
            <select
              className="rounded-lg border border-black/10 bg-white p-3 text-black outline-none focus:border-barrio-green"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
        </section>

        {message ? (
          <p className="mb-5 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep">
            {message}
          </p>
        ) : null}

        {filteredBusinesses.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
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
            ))}
          </div>
        ) : (
          <p className="card text-black/70">
            No hay comercios que coincidan con los filtros seleccionados.
          </p>
        )}
      </main>
    </div>
  );
}
