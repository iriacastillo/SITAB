import { BookOpen, MapPinned, PackagePlus, Store, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";

const cards = [
  { to: "/comercios/subir-productos", title: "Subir productos", text: "Publica productos o servicios para que aparezcan en el catálogo.", icon: PackagePlus },
  { to: "/comercios/mi-perfil", title: "Mi perfil", text: "Completa la ficha visual de tu negocio.", icon: UserRound },
  { to: "/comercios/activos", title: "Comercios activos en Vallecas", text: "Consulta el catálogo local y las fichas publicadas.", icon: Store },
  { to: "/comercios/mapa", title: "Mapa del municipio", text: "Ve los comercios marcados en una vista de Vallecas.", icon: MapPinned },
  { to: "/comercios/tutoriales", title: "Tutoriales", text: "Aprende a publicar, optimizar y digitalizar tu comercio.", icon: BookOpen },
];

export function BusinessDashboardPage() {
  return (
    <div className="page-shell">
      <AppNav mode="business" />
      <main className="content-wrap">
        <PageHeader eyebrow="Panel de comercio" title="Gestiona tu presencia en SITAB">
          Accede rápido a las secciones principales de tu comercio.
        </PageHeader>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ to, title, text, icon: Icon }) => (
            <Link className="card min-h-56 transition hover:-translate-y-1 hover:border-barrio-green" to={to} key={to}>
              <Icon className="mb-5 text-barrio-orange" size={42} />
              <h2 className="text-2xl font-black text-barrio-deep">{title}</h2>
              <p className="mt-3 leading-7 text-black/70">{text}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
