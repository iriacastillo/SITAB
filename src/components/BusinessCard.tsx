import { Clock3, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Business } from "../types";

export function BusinessCard({
  business,
  to,
}: {
  business: Business;
  to: string;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]">
      
      <div className="relative overflow-hidden">
        <img
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
          src={business.image}
          alt={`Foto de ${business.name}`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-wide text-barrio-deep backdrop-blur">
            {business.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-3xl font-black text-white drop-shadow-md">
            {business.name}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 p-6">
        <p className="line-clamp-3 leading-7 text-black/70">
          {business.description}
        </p>

        <div className="grid gap-3 rounded-2xl bg-[#f7faf7] p-4">
          
          <div className="flex items-start gap-3">
            <MapPin
              className="mt-0.5 shrink-0 text-barrio-orange"
              size={18}
            />

            <span className="text-sm font-medium text-black/75">
              {business.address}
            </span>
          </div>

          {(business.openingTime || business.closingTime) && (
            <div className="flex items-center gap-3">
              <Clock3 className="shrink-0 text-barrio-orange" size={18} />

              <span className="text-sm font-medium text-black/75">
                {business.openingTime} - {business.closingTime}
              </span>
            </div>
          )}

          {business.website && (
            <div className="flex items-center gap-3">
              <Globe className="shrink-0 text-barrio-orange" size={18} />

              <span className="truncate text-sm font-medium text-barrio-deep">
                {business.website}
              </span>
            </div>
          )}
        </div>

        <Link
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-barrio-green px-5 py-4 text-sm font-black text-white transition hover:bg-[#0d5c38]"
          to={to}
        >
          Ver comercio
        </Link>
      </div>
    </article>
  );
}
