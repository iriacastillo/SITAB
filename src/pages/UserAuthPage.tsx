import { supabase } from "../lib/supabase";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppNav } from "../components/AppNav";
import { FakeCaptcha, InputField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";

export function UserAuthPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (mode === "register") {
      const email = form.querySelector<HTMLInputElement>("#email")?.value || "";
      const password = form.querySelector<HTMLInputElement>("#password")?.value || "";
      const nombre = form.querySelector<HTMLInputElement>("#name")?.value || "";
      const apellidos = form.querySelector<HTMLInputElement>("#lastName")?.value || "";
      const edad = Number(form.querySelector<HTMLInputElement>("#age")?.value || 0);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user?.id,
        role: "usuario",
        nombre,
        apellidos,
        edad,
        email,
      });

      if (profileError) {
        setMessage(profileError.message);
        return;
      }

      setMessage("Usuario registrado correctamente.");
      window.setTimeout(() => navigate("/usuarios/perfil"), 600);
      return;
    }

    const email = form.querySelector<HTMLInputElement>("#loginEmail")?.value || "";
    const password = form.querySelector<HTMLInputElement>("#loginPassword")?.value || "";

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Sesión iniciada correctamente.");
    window.setTimeout(() => navigate("/usuarios/perfil"), 600);
  }

  return (
    <div className="page-shell">
      <AppNav />
      <main className="content-wrap">
        <PageHeader
          eyebrow="Acceso para usuarios"
          title={mode === "register" ? "Crea tu cuenta vecinal" : "Entra a SITAB"}
        >
          Reserva productos, guarda favoritos y descubre comercios de Vallecas.
        </PageHeader>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="card h-fit bg-barrio-light">
            <h2 className="text-2xl font-black text-barrio-deep">Compra cerca de casa</h2>
            <p className="mt-3 leading-7 text-black/75">
              Explora comercios, elige productos y confirma recogidas presenciales.
            </p>

            <button
              className="btn-secondary mt-6 w-full"
              type="button"
              onClick={() => {
                setMessage("");
                setMode(mode === "register" ? "login" : "register");
              }}
            >
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

            {message ? (
              <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">
                {message}
              </p>
            ) : null}

            <button className="btn-primary" type="submit">
              {mode === "register" ? "Crear cuenta" : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
