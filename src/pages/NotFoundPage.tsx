import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";

export function NotFoundPage() {
  return (
    <div className="page-shell">
      <AppNav />
      <main className="content-wrap">
        <PageHeader title="Página no encontrada">La ruta no existe en este prototipo.</PageHeader>
        <Link className="btn-primary" to="/">Volver al inicio</Link>
      </main>
    </div>
  );
}
