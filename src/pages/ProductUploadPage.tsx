import React, { useEffect, useState } from "react";
import { AppNav } from "../components/AppNav";
import { InputField, SelectField, TextareaField } from "../components/FormField";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/ProductCard";
import { supabase } from "../lib/supabase";

export function ProductUploadPage() {
  const [message, setMessage] = useState("");
  const [business, setBusiness] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  async function loadBusinessAndProducts() {
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) {
    setMessage("No hay comercio iniciado.");
    return;
  }

  const { data: businessRows, error: businessError } = await supabase
    .from("comercios")
    .select("*")
    .eq("owner_id", authData.user.id)
    .limit(1);

  if (businessError) {
    setMessage(businessError.message);
    return;
  }

  if (!businessRows || businessRows.length === 0) {
    setMessage("No se ha encontrado el comercio asociado.");
    return;
  }

  const businessData = businessRows[0];
  setBusiness(businessData);

  const { data: productsData, error: productsError } = await supabase
    .from("productos")
    .select("*")
    .eq("comercio_id", businessData.id)
    .order("created_at", { ascending: false });

  if (productsError) {
    setMessage(productsError.message);
    return;
  }

  setProducts(productsData || []);
  setMessage("");
}

  useEffect(() => {
    loadBusinessAndProducts();
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Guardando...");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    if (!business) {
      setMessage("No se ha encontrado el comercio asociado.");
      return;
    }

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("No hay comercio iniciado.");
      return;
    }

    const imageFile = form.get("image") as File;
    let imageUrl =
      "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=80";

    if (imageFile && imageFile.size > 0) {
      const fileName = `${authData.user.id}-${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const newProduct = {
      comercio_id: business.id,
      nombre: String(form.get("name") || ""),
      descripcion: String(form.get("description") || ""),
      precio: Number(form.get("price") || 0),
      cantidad: Number(form.get("quantity") || 0),
      categoria: String(form.get("category") || "Otros"),
      unidad_precio: String(form.get("priceUnit") || "€/unidad"),
      unidad_cantidad: String(form.get("quantityUnit") || "unidades"),
      foto_url: imageUrl,
    };

    const { error } = await supabase.from("productos").insert(newProduct);

    if (error) {
      setMessage(error.message);
      return;
    }

    formElement.reset();
    setMessage("Producto publicado correctamente.");
    await loadBusinessAndProducts();
  }

  return (
    <div className="page-shell">
      <AppNav mode="business" />

      <main className="content-wrap">
        <PageHeader eyebrow="Subir productos" title="Publica productos o servicios">
          Añade productos o servicios de tu comercio para que aparezcan en el catálogo de usuarios.
        </PageHeader>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <form className="card grid gap-4" onSubmit={submit}>
            <label className="grid gap-2 font-semibold text-barrio-deep" htmlFor="image">
              Foto del producto o servicio

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="rounded-lg border border-black/10 bg-white p-3 text-black outline-none focus:border-barrio-green"
              />
            </label>

            <InputField id="name" name="name" label="Nombre" required />

            <TextareaField id="description" name="description" label="Descripción" required />

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField id="price" name="price" label="Precio" type="number" min="0" step="0.01" required />
              <InputField id="quantity" name="quantity" label="Cantidad disponible" type="number" min="0" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField id="priceUnit" name="priceUnit" label="Unidad de precio" defaultValue="€/unidad">
                <option>€/unidad</option>
                <option>€/kg</option>
              </SelectField>

              <SelectField id="quantityUnit" name="quantityUnit" label="Unidad de cantidad" defaultValue="unidades">
                <option>unidades</option>
                <option>kg</option>
              </SelectField>
            </div>

            <SelectField id="category" name="category" label="Categoría opcional" defaultValue="Otros">
              {[
                "Panadería",
                "Fruta",
                "Alimentación",
                "Mercería",
                "Ferretería",
                "Zapatería",
                "Moda y complementos",
                "Papelería",
                "Artesanía",
                "Regalos",
                "Peluquería y estética",
                "Servicios",
                "Hostelería",
                "Otros",
              ].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </SelectField>

            {message ? (
              <p className="rounded-lg bg-barrio-light p-3 font-semibold text-barrio-deep">
                {message}
              </p>
            ) : null}

            <button className="btn-primary" type="submit" disabled={message === "Guardando..."}>
              {message === "Guardando..." ? "Guardando..." : "Guardar y publicar"}
            </button>
          </form>

          <section>
            <h2 className="mb-4 text-2xl font-black text-barrio-deep">
              Productos publicados
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    businessId: product.comercio_id,
                    name: product.nombre,
                    description: product.descripcion,
                    price: product.precio,
                    quantity: product.cantidad,
                    category: product.categoria,
                    image: product.foto_url,
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}