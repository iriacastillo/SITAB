import { AppNav } from "../components/AppNav";
import { BusinessCard } from "../components/BusinessCard";
import { PageHeader } from "../components/PageHeader";
import { useAppStore } from "../hooks/useAppStore";

export function BusinessCatalogPage({ basePath = "/usuarios/catalogo", navMode = "business" }: { basePath?: string; navMode?: "business" | "user" }) {
  const { businesses } = useAppStore();

  return (
    <div className="page-shell">
      <AppNav mode={navMode} />
      <main className="content-wrap">
        <PageHeader eyebrow="Comercios activos" title="Comercios activos en Vallecas">
          Fichas visibles con comercios y productos de ejemplo para probar el flujo completo.
        </PageHeader>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} to={`${basePath}/${business.id}`} />
          ))}
        </div>
      </main>
    </div>
  );
}
