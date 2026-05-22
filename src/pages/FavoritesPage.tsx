import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { BusinessCard } from "../components/BusinessCard";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { supabase } from "../lib/supabase";

export function FavoritesPage() {
  const [favoriteBusinesses, setFavoriteBusinesses] = useState<any[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadFavorites() {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("No hay usuario iniciado.");
      return;
    }

    // FAVORITOS DE COMERCIOS
    const { data: businessFavorites, error: businessError } = await supabase
      .from("favoritos")
      .select(`
        id,
        comercios (*)
      `)
      .eq("user_id", authData.user.id)
      .not("comercio_id", "is", null);

    if (businessError) {
      setMessage(businessError.message);
      return;
    }

    // FAVORITOS DE PRODUCTOS
    const { data: productFavorites, error: productError } = await supabase
      .from("favoritos")
      .select(`
        id,
        productos (*)
      `)
      .eq("user_id", authData.user.id)
      .not("producto_id", "is", null);

    if (productError) {
      setMessage(productError.message);
      return;
    }

    setFavoriteBusinesses(businessFavorites || []);
    setFavoriteProducts(productFavorites || []);
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function removeFavorite(id: string) {
    const { error } = await supabase
      .from("favoritos")
      .delete()
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Favorito eliminado correctamente.");
    await loadFavorites();
  }

  return (
    <div className="page-shell">
      <AppNav mode="user" />

      <main className="content-wrap">
        <PageHeader
          eyebrow="Favoritos"
          title="Tus comercios y productos guardados"
        >
          Todo lo que quieras tener a mano para volver rápido.
        </PageHeader>

        {message ? (
          <p className="mb-5 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep">
            {message}
          </p>
        ) : null}

        {/* COMERCIOS */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-black text-barrio-deep">
            Comercios favoritos
          </h2>

          {favoriteBusinesses.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {favoriteBusinesses.map((fav) => {
                const business = fav.comercios;

                const businessForCard = {
                  id: business.id,
                  name: business.nombre,
                  description:
                    business.descripcion || "Sin descripción todavía.",
                  address:
                    business.direccion || "Sin dirección todavía.",
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
                };

                return (
                  <div className="grid gap-3" key={fav.id}>
                    <BusinessCard
                      business={businessForCard}
                      to={`/usuarios/catalogo/${business.id}`}
                    />

                    <button
                      className="btn-secondary"
                      type="button"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      Quitar de favoritos
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty text="Aún no has guardado comercios." />
          )}
        </section>

        {/* PRODUCTOS */}
        <section>
          <h2 className="mb-4 text-2xl font-black text-barrio-deep">
            Productos favoritos
          </h2>

          {favoriteProducts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {favoriteProducts.map((fav) => {
                const product = fav.productos;

                const productForCard = {
                  id: product.id,
                  businessId: product.comercio_id,
                  name: product.nombre,
                  description: product.descripcion,
                  price: product.precio,
                  quantity: product.cantidad,
                  category: product.categoria,
                  image: product.foto_url,
                };

                return (
                  <ProductCard
                    key={fav.id}
                    product={productForCard}
                    favorite
                    onFavorite={() => removeFavorite(fav.id)}
                  />
                );
              })}
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

      <Link className="btn-primary" to="/usuarios/catalogo">
        Explorar comercios
      </Link>
    </div>
  );
}
