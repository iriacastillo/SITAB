import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { BusinessCard } from "../components/BusinessCard";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { useAppStore } from "../hooks/useAppStore";

export function FavoritesPage() {
  const { businesses, products, favorites, toggleProductFavorite } = useAppStore();
  const favoriteBusinesses = businesses.filter((business) => favorites.businessIds.includes(business.id));
  const favoriteProducts = products.filter((product) => favorites.productIds.includes(product.id));

  return (
    <div className="page-shell">
      <AppNav mode="user" />
      <main className="content-wrap">
        <PageHeader eyebrow="Favoritos" title="Tus comercios y productos guardados">
          Todo lo que quieras tener a mano para volver rápido.
        </PageHeader>
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-black text-barrio-deep">Comercios favoritos</h2>
          {favoriteBusinesses.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {favoriteBusinesses.map((business) => <BusinessCard key={business.id} business={business} to={`/usuarios/catalogo/${business.id}`} />)}
            </div>
          ) : (
            <Empty text="Aún no has guardado comercios." />
          )}
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-black text-barrio-deep">Productos favoritos</h2>
          {favoriteProducts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} favorite onFavorite={() => toggleProductFavorite(product.id)} />
              ))}
            </div>
          ) : (
            <Empty text="Aún no has guardado productos." />
          )}
        </section>
      </main>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="card">
      <p className="mb-4 text-black/70">{text}</p>
      <Link className="btn-primary" to="/usuarios/catalogo">Explorar comercios</Link>
    </div>
  );
}
