import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { FakeCaptcha, InputField, SelectField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";

export function BusinessAuthPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function submit(event: FormEvent) {
    event.preventDefault();
    setMessage(mode === "register" ? "Comercio registrado en modo prototipo." : "Sesión iniciada en modo prototipo.");
    window.setTimeout(() => navigate("/comercios/panel"), 600);
  }

  return (
    <div className="page-shell">
      <AppNav />
      <main className="content-wrap">
        <PageHeader eyebrow="Acceso para comercios" title={mode === "register" ? "Registra tu comercio" : "Entra a tu panel"}>
          El CIF se usará como identificación principal del comercio cuando conectemos el backend real.
        </PageHeader>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="card h-fit bg-barrio-light">
            <h2 className="text-2xl font-black text-barrio-deep">Tu escaparate en Vallecas</h2>
            <p className="mt-3 leading-7 text-black/75">Publica productos, actualiza horarios y recibe reservas para recogida en tienda.</p>
            <button className="btn-secondary mt-6 w-full" type="button" onClick={() => setMode(mode === "register" ? "login" : "register")}>
              {mode === "register" ? "Ya tengo cuenta" : "Crear cuenta de comercio"}
            </button>
            <Link className="mt-3 block text-center font-semibold text-barrio-deep underline" to="/">
              Volver al inicio
            </Link>
          </aside>

          <form className="card grid gap-4" onSubmit={submit}>
            {mode === "register" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField id="businessName" label="Nombre del comercio" required />
                  <InputField id="cif" label="CIF" required />
                  <InputField id="responsible" label="Persona responsable" required />
                  <InputField id="phone" label="Teléfono" type="tel" required />
                  <InputField id="email" label="Correo electrónico" type="email" required />
                  <SelectField id="size" label="Tamaño del negocio" required defaultValue="">
                    <option value="" disabled>Selecciona una opción</option>
                    <option>1-2</option>
                    <option>3-5</option>
                    <option>6-10</option>
                    <option>más de 10</option>
                  </SelectField>
                  <InputField id="password" label="Contraseña" type="password" required />
                  <InputField id="confirmPassword" label="Confirmar contraseña" type="password" required />
                </div>
                <label className="flex gap-3 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep">
                  <input type="checkbox" required className="mt-1 h-5 w-5 accent-barrio-green" />
                  Acepto las condiciones de uso de SITAB para comercios.
                </label>
                <FakeCaptcha />
              </>
            ) : (
              <div className="grid gap-4">
                <InputField id="loginEmail" label="Correo electrónico" type="email" required />
                <InputField id="loginPassword" label="Contraseña" type="password" required />
                <FakeCaptcha />
              </div>
            )}
            {message ? <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">{message}</p> : null}
            <button className="btn-primary" type="submit">{mode === "register" ? "Registrar comercio" : "Entrar al panel"}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
