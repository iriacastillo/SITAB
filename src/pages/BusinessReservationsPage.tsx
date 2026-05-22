import { useEffect, useState } from "react";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";
import { supabase } from "../lib/supabase";

export function BusinessReservationsPage() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadReservas() {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      setMessage("No hay comercio iniciado.");
      return;
    }

    const { data: comercio } = await supabase
      .from("comercios")
      .select("*")
      .eq("owner_id", authData.user.id)
      .single();

    if (!comercio) {
      setMessage("No se ha encontrado el comercio asociado.");
      return;
    }

    const { data, error } = await supabase
      .from("reservas")
      .select("*, productos(*)")
      .eq("comercio_id", comercio.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setReservas(data || []);
  }

  useEffect(() => {
    loadReservas();
  }, []);

  async function marcarCompletada(id: string) {
    const { error } = await supabase
      .from("reservas")
      .update({ estado: "completada" })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Reserva marcada como completada.");
    await loadReservas();
  }

  return (
    <div className="page-shell">
      <AppNav mode="business" />
      <main className="content-wrap">
        <PageHeader eyebrow="Reservas recibidas" title="Gestión de reservas">
          Consulta las reservas realizadas por los usuarios y actualiza su estado.
        </PageHeader>

        {message ? (
          <p className="mb-5 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep">
            {message}
          </p>
        ) : null}

        <div className="grid gap-4">
          {reservas.length ? (
            reservas.map((reserva) => (
              <article className="card grid gap-4 md:grid-cols-[1fr_auto]" key={reserva.id}>
                <div>
                  <p className="text-sm font-black uppercase text-barrio-green">
                    {reserva.estado}
                  </p>

                  <h2 className="text-2xl font-black text-barrio-deep">
                    {reserva.productos?.nombre || "Producto reservado"}
                  </h2>

                  <p className="text-black/70">
                    Fecha: {reserva.fecha} · Hora: {reserva.hora}
                  </p>
                </div>

                <button
                  className="btn-secondary self-center disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                  disabled={reserva.estado !== "activa"}
                  onClick={() => marcarCompletada(reserva.id)}
                >
                  Marcar completada
                </button>
              </article>
            ))
          ) : (
            <p className="card text-black/70">Todavía no tienes reservas recibidas.</p>
          )}
        </div>
      </main>
    </div>
  );
}