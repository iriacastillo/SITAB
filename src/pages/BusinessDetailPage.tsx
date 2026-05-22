import { Heart, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { ReservationModal } from "../components/ReservationModal";
import { supabase } from "../lib/supabase";

export function BusinessDetailPage({
  backTo,
  userMode = false,
}: {
  backTo: string;
  userMode?: boolean;
}) {
  const { businessId } = useParams();

  const [business, setBusiness] = useState<any>(null);
  const [businessProducts, setBusinessProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [message, setMessage] = useState("");

  const [isFavoriteBusiness, setIsFavoriteBusiness] = useState(false);
  const [favoriteBusinessId, setFavoriteBusinessId] = useState<string | null>(null);
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadBusinessDetail() {
      if (!businessId) return;

      const { data: businessData, error: businessError } = await supabase
        .from("comercios")
        .select("*")
        .eq("id", businessId)
        .single();

      if (businessError) {
        setMessage(businessError.message);
        return;
      }

      setBusiness(businessData);

      const { data: productsData, error: productsError } = await supabase
        .from("productos")
        .select("*")
        .eq("comercio_id", businessId)
        .order("created_at", { ascending: false });

      if (productsError) {
        setMessage(productsError.message);
        return;
      }

      setBusinessProducts(productsData || []);

      const { data: authData } = await supabase.auth.getUser();

      if (authData.user) {
        const { data: favoriteBusinessData } = await supabase
          .from("favoritos")
          .select("*")
          .eq("user_id", authData.user.id)
          .eq("comercio_id", businessId)
          .maybeSingle();

        if (favoriteBusinessData) {
          setIsFavoriteBusiness(true);
          setFavoriteBusinessId(favoriteBusinessData.id);
        } else {
          setIsFavoriteBusiness(false);
          setFavoriteBusinessId(null);
        }

        const { data: favoriteProductsData } = await supabase
          .from("favoritos")
          .select("producto_id")
          .eq("user_id", authData.user.id)
          .not("producto_id", "is", null);

        setFavoriteProductIds(
          (favoriteProductsData || [])
            .map((fav) => fav.producto_id)
            .filter(Boolean),
        );
      }
    }

    loadBusinessDetail();
  }, [businessId]);

  async function toggleFavoriteBusiness() {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("Debes iniciar sesión para guardar favoritos.");
      return;
    }

    if (isFavoriteBusiness && favoriteBusinessId) {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("id", favoriteBusinessId);

      if (error) {
        setMessage(error.message);
        return;
      }

      setIsFavoriteBusiness(false);
      setFavoriteBusinessId(null);
      setMessage("Comercio eliminado de favoritos.");
      return;
    }

    const { data, error } = await supabase
      .from("favoritos")
      .insert({
        user_id: authData.user.id,
        comercio_id: business.id,
      })
      .select()
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    setIsFavoriteBusiness(true);
    setFavoriteBusinessId(data.id);
    setMessage("Comercio añadido a favoritos.");
  }

  async function toggleFavoriteProduct(productId: string) {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("Debes iniciar sesión para guardar favoritos.");
      return;
    }

    const isFavorite = favoriteProductIds.includes(productId);

    if (isFavorite) {
      const { error } = await supabase
        .from("favoritos")
        .delete()
        .eq("user_id", authData.user.id)
        .eq("producto_id", productId);

      if (error) {
        setMessage(error.message);
        return;
      }

      setFavoriteProductIds((current) => current.filter((id) => id !== productId));
      setMessage("Producto eliminado de favoritos.");
      return;
    }

    const { error } = await supabase.from("favoritos").insert({
      user_id: authData.user.id,
      producto_id: productId,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setFavoriteProductIds((current) => [...current, productId]);
    setMessage("Producto añadido a favoritos.");
  }

  if (!business && !message) {
    return (
      <div className="page-shell">
        <AppNav mode={userMode ? "user" : "business"} />
        <main className="content-wrap">
          <p>Cargando comercio...</p>
        </main>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="page-shell">
        <AppNav mode={userMode ? "user" : "business"} />
        <main className="content-wrap">
          <PageHeader title="Comercio no encontrado">
            No hemos podido localizar esta ficha.
          </PageHeader>
          <Link className="btn-primary" to={backTo}>
            Volver
          </Link>
        </main>
      </div>
    );
  }

  const businessForModal = {
    id: business.id,
    name: business.nombre,
    description: business.descripcion || "",
    address: business.direccion || "",
    image: business.foto_url || "",
    category: business.categoria || "",
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
    <div className="page-shell">
      <AppNav mode={userMode ? "user" : "business"} />

      <main className="content-wrap">
        <Link className="mb-6 inline-block font-semibold text-barrio-deep underline" to={backTo}>
          Volver al catálogo
        </Link>

        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {business.foto_url ? (
            <img
              className="h-[28rem] w-full rounded-lg object-cover shadow-soft"
              src={business.foto_url}
              alt={`Foto de ${business.nombre}`}
            />
          ) : null}

          <div>
            <PageHeader eyebrow={business.categoria || "Sin categoría"} title={business.nombre}>
              {business.descripcion || "Sin descripción todavía."}
            </PageHeader>

            <div className="grid gap-3 text-black/75">
              <p className="flex gap-2">
                <MapPin className="text-barrio-orange" /> {business.direccion || "Sin dirección todavía."}
              </p>

              <p className="font-semibold">
                Horario: {business.horario_apertura || "--:--"} - {business.horario_cierre || "--:--"}
              </p>

              <p className="flex gap-2">
                <Phone className="text-barrio-orange" /> {business.telefono || "Sin teléfono"}
              </p>

              {business.web ? (
                <a className="font-semibold text-barrio-deep underline" href={business.web}>
                  Página web
                </a>
              ) : null}

              <p className="leading-7">{business.informacion || ""}</p>
            </div>

            {userMode ? (
              <button className="btn-secondary mt-6" type="button" onClick={toggleFavoriteBusiness}>
                <Heart size={18} fill={isFavoriteBusiness ? "#f28c28" : "none"} />
                {isFavoriteBusiness ? "Comercio guardado" : "Guardar comercio favorito"}
              </button>
            ) : null}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-3xl font-black text-barrio-deep">Productos publicados</h2>

          {message ? (
            <p className="mb-5 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep">
              {message}
            </p>
          ) : null}

          {businessProducts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {businessProducts.map((product) => {
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
                    key={product.id}
                    product={productForCard}
                    favorite={favoriteProductIds.includes(product.id)}
                    onFavorite={userMode ? () => toggleFavoriteProduct(product.id) : undefined}
                    onReserve={userMode ? () => setSelectedProduct(productForCard) : undefined}
                  />
                );
              })}
            </div>
          ) : (
            <p className="card text-black/70">Este comercio todavía no tiene productos publicados.</p>
          )}
        </section>
      </main>

      {selectedProduct ? (
        <ReservationModal
          product={selectedProduct}
          business={businessForModal}
          onClose={() => setSelectedProduct(null)}
          onConfirm={async (date, time) => {
            const { data: authData } = await supabase.auth.getUser();

            const { error } = await supabase.from("reservas").insert([
              {
                user_id: authData.user?.id,
                producto_id: selectedProduct.id,
                comercio_id: business.id,
                fecha: date,
                hora: time,
                estado: "activa",
              },
            ]);

            if (error) {
              setMessage(error.message);
              return;
            }

            setSelectedProduct(null);
            setMessage("Reserva confirmada. Puedes verla en Mis reservas.");
          }}
        />
      ) : null}
    </div>
  );
}
