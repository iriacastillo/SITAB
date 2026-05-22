import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, PackageCheck, Store, UserRound } from "lucide-react";
import { AppNav } from "../components/AppNav";
import { InputField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export function UserProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data: authData } = await supabase.auth.getUser();

      if (!authData.user) {
        setMessage("No hay usuario iniciado.");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (error) {
        setMessage(error.message);
        return;
      }

      setProfile(data);
    }

    loadProfile();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("No hay usuario iniciado.");
      return;
    }

    const nextEmail = String(form.get("email") || "");

    const imageFile = form.get("image") as File;

let imageUrl = profile.foto_url || "";

if (imageFile && imageFile.size > 0) {
  const fileName = `${authData.user.id}-${Date.now()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, imageFile);

  if (uploadError) {
    setMessage(uploadError.message);
    return;
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  imageUrl = publicUrlData.publicUrl;
}

const nextProfile = {
  foto_url: imageUrl,
      nombre: String(form.get("name") || ""),
      apellidos: String(form.get("lastName") || ""),
      edad: Number(form.get("age") || 0),
      descripcion: String(form.get("description") || ""),
      email: nextEmail,
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(nextProfile)
      .eq("id", authData.user.id)
      .select()
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfile(data);
    setMessage("Perfil actualizado correctamente.");
  }

  if (!profile) {
    return (
      <div className="page-shell">
        <AppNav mode="user" />

        <main className="content-wrap">
          <p>Cargando perfil...</p>

          {message ? <p>{message}</p> : null}
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <AppNav mode="user" />

      <main className="content-wrap">
        <PageHeader eyebrow="Perfil de usuario" title="Tu espacio vecinal">
          Completa tu perfil y accede a comercios, favoritos y reservas.
        </PageHeader>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="card h-fit">
            {profile.foto_url ? (
              <img
                className="mb-5 h-36 w-36 rounded-lg object-cover"
                src={profile.foto_url}
                alt={`Foto de ${profile.nombre}`}
              />
            ) : null}

            <h2 className="text-3xl font-black text-barrio-deep">
              {profile.nombre} {profile.apellidos}
            </h2>

            <p className="mt-3 leading-7 text-black/70">
              {profile.descripcion || "Sin descripción todavía."}
            </p>

            <p className="mt-3 font-semibold text-black/70">
              {profile.email}
            </p>

            {profile.edad ? (
              <p className="font-semibold text-black/70">
                {profile.edad} años
              </p>
            ) : null}

            <div className="mt-6 grid gap-3">
              <Link className="btn-primary" to="/usuarios/catalogo">
                <Store size={18} /> Catálogo de comercios
              </Link>

              <Link className="btn-secondary" to="/usuarios/favoritos">
                <Heart size={18} /> Favoritos
              </Link>

              <Link className="btn-secondary" to="/usuarios/reservas">
                <PackageCheck size={18} /> Mis reservas
              </Link>
            </div>
          </aside>

          <form className="card grid gap-4" onSubmit={submit}>
            <div className="flex items-center gap-2 text-barrio-deep">
              <UserRound />

              <h2 className="text-2xl font-black">
                Editar perfil
              </h2>
            </div>

            <label
                className="grid gap-2 font-semibold text-barrio-deep"
                htmlFor="image"
              >
                Foto de perfil

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="rounded-lg border border-black/10 bg-white p-3"
                />
              </label>

            <InputField
              id="name"
              name="name"
              label="Nombre"
              defaultValue={profile.nombre || ""}
              required
            />

            <InputField
              id="lastName"
              name="lastName"
              label="Apellidos"
              defaultValue={profile.apellidos || ""}
              required
            />

            <InputField
              id="age"
              name="age"
              label="Edad"
              type="number"
              min={14}
              defaultValue={profile.edad || ""}
            />

            <label
              className="grid gap-2 font-semibold text-barrio-deep"
              htmlFor="description"
            >
              Descripción breve

              <textarea
                id="description"
                name="description"
                className="min-h-28 rounded-lg border border-black/10 bg-white p-3 text-black outline-none focus:border-barrio-green"
                defaultValue={profile.descripcion || ""}
              />
            </label>

            <InputField
              id="email"
              name="email"
              label="Correo"
              type="email"
              defaultValue={profile.email || ""}
              required
            />

            {message ? (
              <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">
                {message}
              </p>
            ) : null}

            <button className="btn-primary" type="submit">
              Guardar cambios
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}