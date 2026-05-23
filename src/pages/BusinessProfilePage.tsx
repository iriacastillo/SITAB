import React, { useEffect, useState } from "react";
import {
  Camera,
  Clock,
  Globe,
  MapPin,
  Phone,
  Save,
  Store,
} from "lucide-react";
import { AppNav } from "../components/AppNav";
import { InputField, SelectField, TextareaField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export function BusinessProfilePage() {
  const [business, setBusiness] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
    setMessage("");

    if (!business) {
      setMessage("No se ha encontrado el comercio asociado.");
      setSaving(false);
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("No hay comercio iniciado.");
      setSaving(false);
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
        setSaving(false);
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
      latitud: Number(form.get("latitude") || 0),
      longitud: Number(form.get("longitude") || 0),
    };

    const { data, error } = await supabase
      .from("comercios")
      .update(nextBusiness)
      .eq("id", business.id)
      .select("*")
      .limit(1);

    if (error) {
      setMessage(error.message);
      setSaving(false);
      return;
    }

    if (!data || data.length === 0) {
      setMessage("No se ha podido actualizar el comercio.");
      setSaving(false);
      return;
    }

    setBusiness(data[0]);
    setMessage("Perfil actualizado correctamente.");
    setSaving(false);
  }

  if (!business) {
    return (
      <div className="page-shell">
        <AppNav mode="business" />
        <main className="content-wrap">
          <div className="card">
            <p className="font-semibold text-barrio-deep">Cargando comercio...</p>
            {message ? <p className="mt-2 text-black/70">{message}</p> : null}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <AppNav mode="business" />

      <main className="content-wrap">
        <section className="mb-8 rounded-[2rem] border border-barrio-green/10 bg-white/80 p-8 shadow-soft">
          <PageHeader eyebrow="Mi perfil" title="Ficha pública del comercio">
            Cuida tu escaparate digital para que los vecinos entiendan qué ofreces, dónde encontrarte y cuándo pueden visitarte.
          </PageHeader>
        </section>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="card h-fit overflow-hidden p-0">
            <div className="relative">
              {business.foto_url ? (
                <img
                  className="h-80 w-full object-cover"
                  src={business.foto_url}
                  alt={`Foto de ${business.nombre}`}
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center bg-barrio-light">
                  <Store className="text-barrio-green" size={64} />
                </div>
              )}

              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-sm font-black uppercase text-barrio-deep shadow-soft">
                {business.categoria || "Sin categoría"}
              </span>
            </div>

            <div className="p-6">
              <h2 className="text-4xl font-black text-barrio-deep">
                {business.nombre || "Comercio sin nombre"}
              </h2>

              <p className="mt-3 leading-7 text-black/70">
                {business.descripcion || "Sin descripción todavía."}
              </p>

              <div className="mt-6 grid gap-3 text-black/75">
                <p className="flex items-center gap-2 font-semibold">
                  <MapPin className="text-barrio-orange" size={20} />
                  {business.direccion || "Sin dirección todavía."}
                </p>

                <p className="flex items-center gap-2">
                  <Clock className="text-barrio-orange" size={20} />
                  {business.horario_apertura || "--:--"} - {business.horario_cierre || "--:--"}
                </p>

                <p className="flex items-center gap-2">
                  <Phone className="text-barrio-orange" size={20} />
                  {business.telefono || "Sin teléfono"}
                </p>

                {business.web ? (
                  <p className="flex items-center gap-2">
                    <Globe className="text-barrio-orange" size={20} />
                    {business.web}
                  </p>
                ) : null}
              </div>
            </div>
          </aside>

          <form
            className="card grid gap-5 border border-black/5 bg-white/90"
            onSubmit={submit}
          >
            <div className="flex items-center gap-3 border-b border-black/10 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                <Store className="text-barrio-orange" size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-barrio-deep">
                  Editar información
                </h2>
                <p className="text-sm text-black/60">
                  Estos datos serán visibles para los usuarios.
                </p>
              </div>
            </div>

            <label className="grid gap-2 font-semibold text-barrio-deep" htmlFor="image">
              <span className="flex items-center gap-2">
                <Camera size={18} /> Foto del negocio
              </span>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="rounded-xl border border-black/10 bg-white p-3 text-black outline-none focus:border-barrio-green"
              />

              <span className="text-sm font-normal text-black/50">
                Recomendado: imagen horizontal, clara y representativa del comercio.
              </span>
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
    id="latitude"
    name="latitude"
    label="Latitud"
    type="number"
    step="any"
    defaultValue={business.latitud || ""}
  />

  <InputField
    id="longitude"
    name="longitude"
    label="Longitud"
    type="number"
    step="any"
    defaultValue={business.longitud || ""}
  />
</div>

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
              <p className="rounded-xl bg-barrio-light p-4 font-semibold text-barrio-deep">
                {message}
              </p>
            ) : null}

            <button
              className="btn-primary flex items-center justify-center gap-2"
              type="submit"
              disabled={saving}
            >
              <Save size={18} />
              {saving ? "Guardando..." : "Guardar perfil"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}