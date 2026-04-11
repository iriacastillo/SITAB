import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "../types";

export function ProductCard({
  product,
  favorite,
  onFavorite,
  onReserve,
}: {
  product: Product;
  favorite?: boolean;
  onFavorite?: () => void;
  onReserve?: () => void;
}) {
  return (
    <article className="card grid gap-4 p-0">
      <img className="h-44 w-full rounded-t-lg object-cover" src={product.image} alt={`Foto de ${product.name}`} />
      <div className="grid gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-barrio-green">{product.category}</p>
            <h3 className="text-xl font-black text-barrio-deep">{product.name}</h3>
          </div>
          <p className="rounded-lg bg-barrio-yellow px-3 py-1 font-black text-black">{product.price.toFixed(2)} €</p>
        </div>
        <p className="leading-7 text-black/70">{product.description}</p>
        <p className="font-semibold text-black/70">Disponibles: {product.quantity}</p>
        {(onReserve || onFavorite) && (
          <div className="grid gap-2 sm:grid-cols-2">
            {onReserve ? (
              <button className="btn-primary" type="button" onClick={onReserve}>
                <ShoppingBag size={18} />
                Reservar
              </button>
            ) : null}
            {onFavorite ? (
              <button className="btn-secondary" type="button" onClick={onFavorite}>
                <Heart size={18} fill={favorite ? "#f28c28" : "none"} />
                {favorite ? "Guardado" : "Favorito"}
              </button>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
