import {
  ArrowRight,
  BadgeEuro,
  CheckCircle2,
  ExternalLink,
  FileText,
  Lightbulb,
  LockKeyhole,
  Megaphone,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";

const free = [
  "Cómo publicar tu comercio",
  "Cómo subir productos",
  "Cómo completar el perfil",
];

const premium = [
  "Cómo digitalizar tu comercio",
  "Cómo mejorar la visibilidad",
  "Cómo atraer clientes",
  "Cómo optimizar tus publicaciones",
];

const ayudas = [
  "Alertas de ayudas públicas para comercio local",
  "Orientación sobre subvenciones de digitalización",
  "Preparación de documentación básica",
  "Revisión de requisitos y plazos",
];

export function TutorialsPage() {
  return (
    <div className="page-shell">
      <AppNav mode="business" />

      <main className="content-wrap">
        <section className="mb-8 rounded-[2rem] border border-barrio-green/10 bg-white/80 p-8 shadow-soft">
          <PageHeader eyebrow="Tutoriales" title="Aprende a sacar partido a SITAB">
            Recursos para mejorar tu presencia digital, publicar mejor y encontrar oportunidades para tu comercio.
          </PageHeader>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="card border border-black/5 bg-white/90">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-barrio-light">
              <CheckCircle2 className="text-barrio-green" size={32} />
            </div>

            <p className="font-black uppercase text-barrio-green">
              Tutorial gratuito
            </p>

            <h2 className="text-3xl font-black text-barrio-deep">
              Primeros pasos
            </h2>

            <p className="mt-3 leading-7 text-black/70">
              Guías básicas para empezar a usar SITAB y tener tu comercio visible.
            </p>

            <ul className="mt-6 grid gap-3">
              {free.map((item) => (
                <li
                  className="flex items-center justify-between gap-3 rounded-2xl bg-barrio-light p-4 font-semibold text-barrio-deep"
                  key={item}
                >
                  <span className="flex items-center gap-3">
                    <CheckCircle2 size={18} />
                    {item}
                  </span>
                  <ArrowRight size={18} />
                </li>
              ))}
            </ul>

            <button className="btn-primary mt-6 w-full" type="button">
              Empezar guía gratuita
            </button>
          </section>

          <section className="card border-2 border-barrio-orange bg-[#fff7df]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white">
                <LockKeyhole className="text-barrio-orange" size={32} />
              </div>

              <span className="rounded-full bg-barrio-orange px-4 py-2 text-sm font-black text-black">
                Premium · de pago
              </span>
            </div>

            <p className="font-black uppercase text-barrio-brown">
              Tutorial premium
            </p>

            <h2 className="text-3xl font-black text-barrio-deep">
              Impulso digital
            </h2>

            <p className="mt-3 leading-7 text-black/70">
              Acompañamiento para mejorar visibilidad, ventas, publicaciones y gestión digital.
            </p>

            <div className="mt-6 grid gap-3">
              {premium.map((item) => (
                <button
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left font-semibold text-barrio-deep transition hover:-translate-y-0.5 hover:shadow-md"
                  key={item}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <BadgeEuro size={18} className="text-barrio-orange" />
                    {item}
                  </span>
                  <ArrowRight size={18} />
                </button>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card border border-barrio-green/10 bg-white/90">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-barrio-light">
                <FileText className="text-barrio-green" size={30} />
              </div>

              <div>
                <p className="font-black uppercase text-barrio-green">
                  Ayudas y subvenciones
                </p>
                <h2 className="text-3xl font-black text-barrio-deep">
                  Apoyo para comercios locales
                </h2>
              </div>
            </div>

            <p className="leading-7 text-black/70">
              Espacio pensado para centralizar oportunidades públicas: ayudas de digitalización,
              modernización del comercio, eficiencia energética, contratación o formación.
            </p>

            <ul className="mt-6 grid gap-3">
              {ayudas.map((item) => (
                <li
                  className="flex items-center gap-3 rounded-2xl bg-barrio-light p-4 font-semibold text-barrio-deep"
                  key={item}
                >
                  <ShieldCheck className="text-barrio-green" size={18} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="btn-primary" type="button">
                Ver oportunidades
              </button>

              <button className="btn-secondary" type="button">
                Solicitar orientación
              </button>
            </div>
          </div>

          <aside className="grid gap-4">
            <div className="card bg-white/90">
              <Rocket className="mb-4 text-barrio-orange" size={34} />
              <h3 className="text-2xl font-black text-barrio-deep">
                Diagnóstico digital
              </h3>
              <p className="mt-2 text-black/70">
                Revisión rápida de ficha, productos, imágenes y presencia online.
              </p>
            </div>

            <div className="card bg-white/90">
              <Megaphone className="mb-4 text-barrio-orange" size={34} />
              <h3 className="text-2xl font-black text-barrio-deep">
                Visibilidad local
              </h3>
              <p className="mt-2 text-black/70">
                Consejos para destacar en el catálogo y atraer clientes del barrio.
              </p>
            </div>

            <div className="card bg-white/90">
              <Lightbulb className="mb-4 text-barrio-orange" size={34} />
              <h3 className="text-2xl font-black text-barrio-deep">
                Próximamente
              </h3>
              <p className="mt-2 text-black/70">
                Acceso a guías descargables, vídeos y enlaces oficiales.
              </p>

              <button
                className="mt-4 inline-flex items-center gap-2 font-black text-barrio-deep underline"
                type="button"
              >
                Más información <ExternalLink size={16} />
              </button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
