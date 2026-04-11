import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Business } from "../types";

export function BusinessCard({ business, to }: { business: Business; to: string }) {
  return (
    <article className="card grid gap-4 overflow-hidden p-0">
      <img className="h-52 w-full object-cover" src={business.image} alt={`Foto de ${business.name}`} />
      <div className="grid gap-3 p-5">
        <div>
          <p className="text-sm font-black uppercase text-barrio-green">{business.category}</p>
          <h2 className="text-2xl font-black text-barrio-deep">{business.name}</h2>
        </div>
        <p className="leading-7 text-black/70">{business.description}</p>
        <p className="flex items-start gap-2 text-sm font-semibold text-black/70">
          <MapPin className="mt-0.5 shrink-0 text-barrio-orange" size={18} />
          {business.address}
        </p>
        <Link className="btn-primary mt-2" to={to}>
          Ver más
        </Link>
      </div>
    </article>
  );
}
