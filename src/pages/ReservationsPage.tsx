import { useState } from "react";
import { AppNav } from "../components/AppNav";
import { PageHeader } from "../components/PageHeader";
import { useAppStore } from "../hooks/useAppStore";

export function ReservationsPage() {
  const { reservations, cancelReservation } = useAppStore();
  const [message, setMessage] = useState("");

  return (
    <div className="page-shell">
      <AppNav mode="user" />
      <main className="content-wrap">
        <PageHeader eyebrow="Mis reservas" title="Reservas para recogida en tienda">
          Puedes anular una reserva hasta 2 horas antes de la fecha y hora de recogida.
        </PageHeader>
        {message ? <p className="mb-5 rounded-lg bg-barrio-light p-4 font-semibold text-barrio-deep">{message}</p> : null}
        <div className="grid gap-4">
          {reservations.length ? reservations.map((reservation) => (
            <article className="card grid gap-4 md:grid-cols-[1fr_auto]" key={reservation.id}>
              <div>
                <p className="text-sm font-black uppercase text-barrio-green">{reservation.status}</p>
                <h2 className="text-2xl font-black text-barrio-deep">{reservation.productName}</h2>
                <p className="mt-2 font-semibold text-black/75">{reservation.businessName}</p>
                <p className="text-black/70">Fecha: {reservation.pickupDate} · Hora: {reservation.pickupTime}</p>
              </div>
              <button
                className="btn-secondary self-center disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                disabled={reservation.status !== "Confirmada"}
                onClick={() => {
                  const result = cancelReservation(reservation.id);
                  setMessage(result.message);
                }}
              >
                Anular reserva
              </button>
            </article>
          )) : <p className="card text-black/70">Todavía no tienes reservas.</p>}
        </div>
      </main>
    </div>
  );
}
