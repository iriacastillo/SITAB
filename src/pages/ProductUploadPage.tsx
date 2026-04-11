import { FormEvent, useState } from "react";
import { AppNav } from "../components/AppNav";
import { InputField, SelectField, TextareaField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { useAppStore } from "../hooks/useAppStore";
import { ProductCategory } from "../types";

export function ProductUploadPage() {
  const { addProduct, activeBusinessId, products } = useAppStore();
  const [message, setMessage] = useState("");
  const myProducts = products.filter((product) => product.businessId === activeBusinessId);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    addProduct({
      businessId: activeBusinessId,
      name: String(form.get("name")),
      description: String(form.get("description")),
      price: Number(form.get("price")),
      quantity: Number(form.get("quantity")),
      category: String(form.get("category")) as ProductCategory,
      image: String(form.get("image")) || "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=80",
    });
    event.currentTarget.reset();
    setMessage("Producto publicado. Ya aparece en el catálogo de usuarios.");
  }

  return (
    <div className="page-shell">
      <AppNav mode="business" />
      <main className="content-wrap">
        <PageHeader eyebrow="Subir productos" title="Publica productos o servicios">
          Este formulario guarda la información en estado local. Punto futuro de backend: reemplazar `addProduct` por una llamada API.
        </PageHeader>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form className="card grid gap-4" onSubmit={submit}>
            <InputField id="image" name="image" label="Foto del producto o servicio" placeholder="URL de imagen" />
            <InputField id="name" name="name" label="Nombre" required />
            <TextareaField id="description" name="description" label="Descripción" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField id="price" name="price" label="Precio" type="number" min="0" step="0.01" required />
              <InputField id="quantity" name="quantity" label="Cantidad disponible" type="number" min="0" required />
            </div>
            <SelectField id="category" name="category" label="Categoría opcional" defaultValue="Otros">
              {["Panadería", "Fruta", "Regalos", "Papelería", "Servicios", "Otros"].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </SelectField>
            {message ? <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">{message}</p> : null}
            <button className="btn-primary" type="submit">Guardar y publicar</button>
          </form>
          <section>
            <h2 className="mb-4 text-2xl font-black text-barrio-deep">Productos publicados</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {myProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
