import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { FakeCaptcha, InputField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";

export function UserAuthPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function submit(event: FormEvent) {
    event.preventDefault();
    setMessage(mode === "register" ? "Usuario registrado en modo prototipo." : "Sesión iniciada en modo prototipo.");
    window.setTimeout(() => navigate("/usuarios/perfil"), 600);
  }

  return (
    <div className="page-shell">
      <AppNav />
      <main className="content-wrap">
        <PageHeader eyebrow="Acceso para usuarios" title={mode === "register" ? "Crea tu cuenta vecinal" : "Entra a SITAB"}>
          Reserva productos, guarda favoritos y descubre comercios de Vallecas.
        </PageHeader>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="card h-fit bg-barrio-light">
            <h2 className="text-2xl font-black text-barrio-deep">Compra cerca de casa</h2>
            <p className="mt-3 leading-7 text-black/75">Explora comercios, elige productos y confirma recogidas presenciales.</p>
            <button className="btn-secondary mt-6 w-full" type="button" onClick={() => setMode(mode === "register" ? "login" : "register")}>
              {mode === "register" ? "Ya tengo cuenta" : "Crear cuenta de usuario"}
            </button>
            <Link className="mt-3 block text-center font-semibold text-barrio-deep underline" to="/">
              Volver al inicio
            </Link>
          </aside>
          <form className="card grid gap-4" onSubmit={submit}>
            {mode === "register" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField id="name" label="Nombre" required />
                <InputField id="lastName" label="Apellidos" required />
                <InputField id="age" label="Edad" type="number" min={14} required />
                <InputField id="email" label="Correo electrónico" type="email" required />
                <InputField id="password" label="Contraseña" type="password" required />
                <InputField id="confirmPassword" label="Confirmar contraseña" type="password" required />
              </div>
            ) : (
              <div className="grid gap-4">
                <InputField id="loginEmail" label="Correo electrónico" type="email" required />
                <InputField id="loginPassword" label="Contraseña" type="password" required />
              </div>
            )}
            <FakeCaptcha />
            {message ? <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">{message}</p> : null}
            <button className="btn-primary" type="submit">{mode === "register" ? "Crear cuenta" : "Entrar"}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
