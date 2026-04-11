import { Heart, Home, MapPinned, Menu, PackagePlus, Store, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

type NavMode = "public" | "business" | "user";

const links = {
  business: [
    { to: "/comercios/panel", label: "Panel", icon: Home },
    { to: "/comercios/subir-productos", label: "Subir productos", icon: PackagePlus },
    { to: "/comercios/mi-perfil", label: "Mi perfil", icon: UserRound },
    { to: "/comercios/activos", label: "Comercios activos", icon: Store },
    { to: "/comercios/mapa", label: "Mapa", icon: MapPinned },
  ],
  user: [
    { to: "/usuarios/perfil", label: "Mi perfil", icon: UserRound },
    { to: "/usuarios/catalogo", label: "Catálogo", icon: Store },
    { to: "/usuarios/favoritos", label: "Favoritos", icon: Heart },
    { to: "/usuarios/reservas", label: "Mis reservas", icon: PackagePlus },
  ],
};

export function AppNav({ mode = "public" }: { mode?: NavMode }) {
  const [open, setOpen] = useState(false);
  const items = mode === "business" ? links.business : mode === "user" ? links.user : [];

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-black text-barrio-deep" aria-label="Ir al inicio">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-barrio-green text-lg text-white">ST</span>
          <span>
            <span className="block text-xl leading-none">SITAB</span>
            <span className="text-xs font-semibold text-black/65">Siente Tu Barrio</span>
          </span>
        </Link>

        {items.length > 0 ? (
          <>
            <button className="btn-secondary px-3 py-2 md:hidden" type="button" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
              <span className="sr-only">Abrir navegación</span>
            </button>
            <nav className="hidden items-center gap-2 md:flex" aria-label="Navegación principal">
              {items.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                      isActive ? "bg-barrio-light text-barrio-deep" : "text-black/70 hover:bg-barrio-light"
                    }`
                  }
                >
                  <Icon size={17} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </>
        ) : (
          <div className="hidden gap-3 sm:flex">
            <Link className="btn-secondary py-2" to="/comercios/acceso">
              Comercios
            </Link>
            <Link className="btn-primary py-2" to="/usuarios/acceso">
              Usuarios
            </Link>
          </div>
        )}
      </div>

      {open && items.length > 0 ? (
        <nav className="border-t border-black/10 bg-white px-4 py-3 md:hidden" aria-label="Navegación móvil">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-2 rounded-lg px-3 py-3 font-semibold ${
                  isActive ? "bg-barrio-light text-barrio-deep" : "text-black/75"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
