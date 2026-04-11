import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, PackageCheck, Store, UserRound } from "lucide-react";
import { AppNav } from "../components/AppNav";
import { InputField, TextareaField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";
import { useAppStore } from "../hooks/useAppStore";
import { UserProfile } from "../types";

export function UserProfilePage() {
  const { users, activeUserId, updateUser } = useAppStore();
  const user = users.find((item) => item.id === activeUserId)!;
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextUser: UserProfile = {
      ...user,
      image: String(form.get("image")),
      name: String(form.get("name")),
      description: String(form.get("description")),
      email: String(form.get("email")),
      neighborhood: String(form.get("neighborhood")),
    };
    updateUser(nextUser);
    setMessage("Perfil actualizado correctamente.");
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
            <img className="mb-5 h-36 w-36 rounded-lg object-cover" src={user.image} alt={`Foto de ${user.name}`} />
            <h2 className="text-3xl font-black text-barrio-deep">{user.name} {user.lastName}</h2>
            <p className="mt-3 leading-7 text-black/70">{user.description}</p>
            <p className="mt-3 font-semibold text-black/70">{user.email}</p>
            <p className="font-semibold text-black/70">{user.neighborhood}</p>
            <div className="mt-6 grid gap-3">
              <Link className="btn-primary" to="/usuarios/catalogo"><Store size={18} /> Catálogo de comercios</Link>
              <Link className="btn-secondary" to="/usuarios/favoritos"><Heart size={18} /> Favoritos</Link>
              <Link className="btn-secondary" to="/usuarios/reservas"><PackageCheck size={18} /> Mis reservas</Link>
            </div>
          </aside>
          <form className="card grid gap-4" onSubmit={submit}>
            <div className="flex items-center gap-2 text-barrio-deep">
              <UserRound />
              <h2 className="text-2xl font-black">Editar perfil</h2>
            </div>
            <InputField id="image" name="image" label="Foto de perfil" defaultValue={user.image} />
            <InputField id="name" name="name" label="Nombre" defaultValue={user.name} required />
            <TextareaField id="description" name="description" label="Descripción breve" defaultValue={user.description} />
            <InputField id="email" name="email" label="Correo" type="email" defaultValue={user.email} required />
            <InputField id="neighborhood" name="neighborhood" label="Zona o barrio" defaultValue={user.neighborhood} />
            {message ? <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">{message}</p> : null}
            <button className="btn-primary" type="submit">Editar perfil</button>
          </form>
        </div>
      </main>
    </div>
  );
}
