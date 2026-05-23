import {
  BookOpen,
  CalendarCheck,
  MapPinned,
  PackagePlus,
  Store,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";

const cards = [
  {
    to: "/comercios/mi-perfil",
    title: "Mi perfil",
    text: "Completa la ficha visual de tu negocio.",
    icon: UserRound,
    badge: "Configurar",
  },
  {
    to: "/comercios/subir-productos",
    title: "Subir productos",
    text: "Publica productos o servicios para que aparezcan en el catálogo.",
    icon: PackagePlus,
    badge: "Publicar",
  },
  {
    to: "/comercios/reservas",
    title: "Reservas recibidas",
    text: "Consulta y gestiona las reservas realizadas por los usuarios.",
    icon: CalendarCheck,
    badge: "Gestionar",
  },
  {
    to: "/comercios/activos",
    title: "Comercios activos en Vallecas",
    text: "Consulta el catálogo local y las fichas publicadas.",
    icon: Store,
    badge: "Explorar",
  },
  {
    to: "/comercios/mapa",
    title: "Mapa del municipio",
    text: "Ve los comercios marcados en una vista de Vallecas.",
    icon: MapPinned,
    badge: "Ubicación",
  },
  {
    to: "/comercios/tutoriales",
    title: "Tutoriales",
    text: "Aprende a publicar, optimizar y digitalizar tu comercio.",
    icon: BookOpen,
    badge: "Ayuda",
  },
];

export function BusinessDashboardPage() {
  return (
    <div className="page-shell">
      <AppNav mode="business" />

      <main className="content-wrap">
        <section className="mb-8 rounded-[2rem] border border-barrio-green/10 bg-white/80 p-8 shadow-soft">
          <PageHeader eyebrow="Panel de comercio" title="Gestiona tu presencia en SITAB 👋">
            Accede rápidamente a tus productos, reservas, ficha pública y herramientas de gestión.
          </PageHeader>
        </section>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ to, title, text, icon: Icon, badge }) => (
            <Link
              className="card group min-h-64 cursor-pointer border border-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-barrio-green/30 hover:shadow-2xl"
              to={to}
              key={to}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 transition group-hover:scale-105">
                  <Icon className="text-barrio-orange" size={34} />
                </div>

                <span className="rounded-full bg-barrio-light px-3 py-1 text-sm font-black text-barrio-deep">
                  {badge}
                </span>
              </div>

              <h2 className="text-2xl font-black text-barrio-deep">
                {title}
              </h2>

              <p className="mt-3 leading-7 text-black/70">
                {text}
              </p>

              <p className="mt-6 font-black text-barrio-green transition group-hover:translate-x-1">
                Entrar →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
