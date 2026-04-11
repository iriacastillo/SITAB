import { ArrowRight, CheckCircle2, Store, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { AppNav } from "../components/AppNav";

export function HomePage() {
  return (
    <div className="page-shell bg-barrio-light">
      <AppNav />
      <main>
        <section className="content-wrap grid min-h-[78vh] items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 grid h-24 w-24 place-items-center rounded-lg bg-barrio-deep text-3xl font-black text-white shadow-soft">
              ST
            </div>
            <p className="font-black uppercase text-barrio-green">Siente Tu Barrio</p>
            <h1 className="mt-2 text-5xl font-black leading-tight text-barrio-deep sm:text-6xl">SITAB</h1>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-black/75">
              Conectamos a vecinos y comercios de Vallecas para descubrir productos cercanos, reservarlos y recogerlos
              presencialmente en la tienda.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link className="btn-primary text-lg" to="/comercios/acceso">
                Acceso para comercios
                <ArrowRight size={20} />
              </Link>
              <Link className="btn-warm text-lg" to="/usuarios/acceso">
                Acceso para usuarios
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <img
              className="h-72 w-full rounded-lg object-cover shadow-soft"
              src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80"
              alt="Mercado local con frutas y verduras"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="card">
                <Store className="mb-3 text-barrio-orange" size={34} />
                <h2 className="text-xl font-black text-barrio-deep">Para comercios</h2>
                <p className="mt-2 leading-7 text-black/70">Crea tu perfil, publica productos y gana visibilidad en el barrio.</p>
              </article>
              <article className="card">
                <UsersRound className="mb-3 text-barrio-orange" size={34} />
                <h2 className="text-xl font-black text-barrio-deep">Para vecinos</h2>
                <p className="mt-2 leading-7 text-black/70">Encuentra tiendas, guarda favoritos y reserva para recoger cerca.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white py-10">
          <div className="content-wrap grid gap-4 md:grid-cols-3">
            {["Compra cercana y consciente", "Reservas sin complicaciones", "Vallecas más conectado"].map((text) => (
              <div className="flex items-center gap-3 rounded-lg border border-black/10 p-4" key={text}>
                <CheckCircle2 className="text-barrio-green" />
                <p className="font-bold text-barrio-deep">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
