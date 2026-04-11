import { FormEvent, useState } from "react";
import { AppNav } from "../components/AppNav";
import { InputField, SelectField, TextareaField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";
import { useAppStore } from "../hooks/useAppStore";
import { Business, BusinessCategory } from "../types";

export function BusinessProfilePage() {
  const { businesses, activeBusinessId, updateBusiness } = useAppStore();
  const business = businesses.find((item) => item.id === activeBusinessId)!;
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextBusiness: Business = {
      ...business,
      image: String(form.get("image")),
      name: String(form.get("name")),
      description: String(form.get("description")),
      address: String(form.get("address")),
      information: String(form.get("information")),
      openingTime: String(form.get("openingTime")),
      closingTime: String(form.get("closingTime")),
      phone: String(form.get("phone")),
      website: String(form.get("website")),
      category: String(form.get("category")) as BusinessCategory,
    };
    updateBusiness(nextBusiness);
    setMessage("Perfil actualizado correctamente.");
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
            <img className="h-72 w-full rounded-t-lg object-cover" src={business.image} alt={`Foto de ${business.name}`} />
            <div className="p-5">
              <p className="font-black uppercase text-barrio-green">{business.category}</p>
              <h2 className="text-3xl font-black text-barrio-deep">{business.name}</h2>
              <p className="mt-3 leading-7 text-black/70">{business.description}</p>
              <p className="mt-4 font-semibold text-black/75">{business.address}</p>
            </div>
          </aside>
          <form className="card grid gap-4" onSubmit={submit}>
            <InputField id="image" name="image" label="Foto del negocio" defaultValue={business.image} required />
            <InputField id="name" name="name" label="Nombre del negocio" defaultValue={business.name} required />
            <TextareaField id="description" name="description" label="Descripción breve" defaultValue={business.description} required />
            <InputField id="address" name="address" label="Ubicación / dirección" defaultValue={business.address} required />
            <TextareaField id="information" name="information" label="Información general" defaultValue={business.information} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField id="openingTime" name="openingTime" label="Horario de apertura" type="time" defaultValue={business.openingTime} required />
              <InputField id="closingTime" name="closingTime" label="Horario de cierre" type="time" defaultValue={business.closingTime} required />
              <InputField id="phone" name="phone" label="Teléfono de contacto" defaultValue={business.phone} required />
              <InputField id="website" name="website" label="Página web" defaultValue={business.website} />
            </div>
            <SelectField id="category" name="category" label="Categoría del negocio" defaultValue={business.category}>
              {["Alimentación", "Artesanía", "Papelería", "Regalos", "Servicios"].map((category) => <option key={category}>{category}</option>)}
            </SelectField>
            {message ? <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">{message}</p> : null}
            <button className="btn-primary" type="submit">Guardar perfil</button>
          </form>
        </div>
      </main>
    </div>
  );
}
