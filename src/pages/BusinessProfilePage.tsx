import React, { useEffect, useState } from "react";
import { AppNav } from "../components/AppNav";
import { InputField, SelectField, TextareaField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export function BusinessProfilePage() {
  const [business, setBusiness] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadBusiness();
  }, []);

  async function loadBusiness() {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("No hay comercio iniciado.");
      return;
    }

    const { data, error } = await supabase
      .from("comercios")
      .select("*")
      .eq("owner_id", authData.user.id)
      .limit(1);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data || data.length === 0) {
      setMessage("No se ha encontrado ningún comercio asociado a esta cuenta.");
      return;
    }

    setBusiness(data[0]);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!business) {
      setMessage("No se ha encontrado el comercio asociado.");
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("No hay comercio iniciado.");
      return;
    }

    const imageFile = form.get("image") as File;
    let imageUrl = business.foto_url || "";

    if (imageFile && imageFile.size > 0) {
      const fileName = `${authData.user.id}-${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("business-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("business-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const nextBusiness = {
      foto_url: imageUrl,
      nombre: String(form.get("name") || ""),
      descripcion: String(form.get("description") || ""),
      direccion: String(form.get("address") || ""),
      horario_apertura: String(form.get("openingTime") || ""),
      horario_cierre: String(form.get("closingTime") || ""),
      telefono: String(form.get("phone") || ""),
      web: String(form.get("website") || ""),
      categoria: String(form.get("category") || ""),
    };

    const { data, error } = await supabase
      .from("comercios")
      .update(nextBusiness)
      .eq("id", business.id)
      .select("*")
      .limit(1);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data || data.length === 0) {
      setMessage("No se ha podido actualizar el comercio.");
      return;
    }

    setBusiness(data[0]);
    setMessage("Perfil actualizado correctamente.");
  }

  if (!business) {
    return (
      <div className="page-shell">
        <AppNav mode="business" />
        <main className="content-wrap">
          <p>Cargando comercio...</p>
          {message ? <p>{message}</p> : null}
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <AppNav mode="business" />

      <main className="content-wrap">
        <PageHeader eyebrow="Mi perfil" title="Ficha pública del comercio">
          Mantén esta información actualizada para que los vecinos sepan qué ofreces y dónde encontrarte.
        </PageHeader>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="card h-fit p-0">
            {business.foto_url ? (
              <img
                className="h-72 w-full rounded-t-lg object-cover"
                src={business.foto_url}
                alt={`Foto de ${business.nombre}`}
              />
            ) : null}

            <div className="p-5">
              <p className="font-black uppercase text-barrio-green">
                {business.categoria || "Sin categoría"}
              </p>

              <h2 className="text-3xl font-black text-barrio-deep">
                {business.nombre || "Comercio sin nombre"}
              </h2>

              <p className="mt-3 leading-7 text-black/70">
                {business.descripcion || "Sin descripción todavía."}
              </p>

              <p className="mt-4 font-semibold text-black/75">
                {business.direccion || "Sin dirección todavía."}
              </p>
            </div>
          </aside>

          <form className="card grid gap-4" onSubmit={submit}>
            <label className="grid gap-2 font-semibold text-barrio-deep" htmlFor="image">
              Foto del negocio
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="rounded-lg border border-black/10 bg-white p-3 text-black outline-none focus:border-barrio-green"
              />
            </label>

            <InputField
              id="name"
              name="name"
              label="Nombre del negocio"
              defaultValue={business.nombre || ""}
              required
            />

            <TextareaField
              id="description"
              name="description"
              label="Descripción breve"
              defaultValue={business.descripcion || ""}
            />

            <InputField
              id="address"
              name="address"
              label="Ubicación / dirección"
              defaultValue={business.direccion || ""}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                id="openingTime"
                name="openingTime"
                label="Horario de apertura"
                type="time"
                defaultValue={business.horario_apertura || ""}
              />

              <InputField
                id="closingTime"
                name="closingTime"
                label="Horario de cierre"
                type="time"
                defaultValue={business.horario_cierre || ""}
              />

              <InputField
                id="phone"
                name="phone"
                label="Teléfono de contacto"
                defaultValue={business.telefono || ""}
              />

              <InputField
                id="website"
                name="website"
                label="Página web"
                defaultValue={business.web || ""}
              />
            </div>

            <SelectField
              id="category"
              name="category"
              label="Categoría del negocio"
              defaultValue={business.categoria || ""}
            >
              <option value="">Selecciona una categoría</option>
              <option>Alimentación</option>
              <option>Mercería</option>
              <option>Ferretería</option>
              <option>Zapatería</option>
              <option>Moda y complementos</option>
              <option>Papelería</option>
              <option>Artesanía</option>
              <option>Regalos</option>
              <option>Peluquería y estética</option>
              <option>Servicios</option>
              <option>Hostelería</option>
              <option>Otros</option>
            </SelectField>

            {message ? (
              <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">
                {message}
              </p>
            ) : null}

            <button className="btn-primary" type="submit">
              Guardar perfil
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
