import { BadgeEuro, CheckCircle2, LockKeyhole } from "lucide-react";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";

const free = ["Cómo publicar tu comercio", "Cómo subir productos", "Cómo completar el perfil"];
const premium = ["Cómo digitalizar tu comercio", "Cómo mejorar la visibilidad", "Cómo atraer clientes", "Cómo optimizar tus publicaciones"];

export function TutorialsPage() {
  return (
    <div className="page-shell">
      <AppNav mode="business" />
      <main className="content-wrap">
        <PageHeader eyebrow="Tutoriales" title="Aprende a sacar partido a SITAB">
          Recursos para publicar mejor y preparar la presencia digital de tu comercio.
        </PageHeader>
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="card">
            <CheckCircle2 className="mb-4 text-barrio-green" size={42} />
            <p className="font-black uppercase text-barrio-green">Tutorial gratuito</p>
            <h2 className="text-3xl font-black text-barrio-deep">Primeros pasos</h2>
            <ul className="mt-6 grid gap-3">
              {free.map((item) => (
                <li className="flex items-center gap-3 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep" key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="card border-2 border-barrio-orange bg-[#fff7df]">
            <div className="mb-4 flex items-center gap-3">
              <LockKeyhole className="text-barrio-orange" size={42} />
              <span className="rounded-lg bg-barrio-orange px-3 py-1 font-black text-black">Premium · de pago</span>
            </div>
            <p className="font-black uppercase text-barrio-brown">Tutorial premium</p>
            <h2 className="text-3xl font-black text-barrio-deep">Impulso digital</h2>
            <ul className="mt-6 grid gap-3">
              {premium.map((item) => (
                <li className="flex items-center gap-3 rounded-lg bg-white p-4 font-semibold text-barrio-deep" key={item}>
                  <BadgeEuro size={18} className="text-barrio-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
