import { Heart, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { ReservationModal } from "../components/ReservationModal";
import { useAppStore } from "../hooks/useAppStore";
import { Product } from "../types";

export function BusinessDetailPage({ backTo, userMode = false }: { backTo: string; userMode?: boolean }) {
  const { businessId } = useParams();
  const {
    businesses,
    products,
    favorites,
    toggleBusinessFavorite,
    toggleProductFavorite,
    addReservation,
  } = useAppStore();
  const business = businesses.find((item) => item.id === businessId);
  const businessProducts = products.filter((product) => product.businessId === businessId);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState("");

  if (!business) {
    return (
      <div className="page-shell">
        <AppNav mode={userMode ? "user" : "business"} />
        <main className="content-wrap">
          <PageHeader title="Comercio no encontrado">No hemos podido localizar esta ficha.</PageHeader>
          <Link className="btn-primary" to={backTo}>Volver</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <AppNav mode={userMode ? "user" : "business"} />
      <main className="content-wrap">
        <Link className="mb-6 inline-block font-semibold text-barrio-deep underline" to={backTo}>Volver al catálogo</Link>
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <img className="h-[28rem] w-full rounded-lg object-cover shadow-soft" src={business.image} alt={`Foto de ${business.name}`} />
          <div>
            <PageHeader eyebrow={business.category} title={business.name}>
              {business.description}
            </PageHeader>
            <div className="grid gap-3 text-black/75">
              <p className="flex gap-2"><MapPin className="text-barrio-orange" /> {business.address}</p>
              <p className="font-semibold">Horario: {business.openingTime} - {business.closingTime}</p>
              <p className="flex gap-2"><Phone className="text-barrio-orange" /> {business.phone}</p>
              {business.website ? <a className="font-semibold text-barrio-deep underline" href={business.website}>Página web</a> : null}
              <p className="leading-7">{business.information}</p>
            </div>
            {userMode ? (
              <button className="btn-secondary mt-6" type="button" onClick={() => toggleBusinessFavorite(business.id)}>
                <Heart size={18} fill={favorites.businessIds.includes(business.id) ? "#f28c28" : "none"} />
                {favorites.businessIds.includes(business.id) ? "Comercio guardado" : "Guardar comercio favorito"}
              </button>
            ) : null}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-5 text-3xl font-black text-barrio-deep">Productos publicados</h2>
          {message ? <p className="mb-5 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep">{message}</p> : null}
          {businessProducts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {businessProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.productIds.includes(product.id)}
                  onFavorite={userMode ? () => toggleProductFavorite(product.id) : undefined}
                  onReserve={userMode ? () => setSelectedProduct(product) : undefined}
                />
              ))}
            </div>
          ) : (
            <p className="card text-black/70">Este comercio todavía no tiene productos publicados.</p>
          )}
        </section>
      </main>

      {selectedProduct ? (
        <ReservationModal
          product={selectedProduct}
          business={business}
          onClose={() => setSelectedProduct(null)}
          onConfirm={(date, time) => {
            addReservation({
              productId: selectedProduct.id,
              businessId: business.id,
              productName: selectedProduct.name,
              businessName: business.name,
              pickupDate: date,
              pickupTime: time,
            });
            setSelectedProduct(null);
            setMessage("Reserva confirmada. Puedes verla en Mis reservas.");
          }}
        />
      ) : null}
    </div>
  );
}
