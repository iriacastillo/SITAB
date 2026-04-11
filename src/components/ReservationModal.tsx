import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { Product, Business } from "../types";
import { InputField } from "./FormField";

export function ReservationModal({
  product,
  business,
  onClose,
  onConfirm,
}: {
  product: Product;
  business: Business;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    onConfirm(date, time);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4" role="dialog" aria-modal="true">
      <form className="w-full max-w-lg rounded-lg bg-white p-6 shadow-soft" onSubmit={submit}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-black uppercase text-barrio-green">Reserva presencial</p>
            <h2 className="text-2xl font-black text-barrio-deep">{product.name}</h2>
            <p className="text-black/70">{business.name}</p>
          </div>
          <button className="rounded-lg p-2 hover:bg-barrio-light" type="button" onClick={onClose}>
            <X />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        <div className="grid gap-4">
          <InputField id="pickupDate" label="Fecha de recogida" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
          <InputField id="pickupTime" label="Hora de recogida" type="time" required value={time} onChange={(e) => setTime(e.target.value)} />
          <p className="rounded-lg bg-barrio-light p-4 text-sm font-semibold text-barrio-deep">
            La tienda guardará tu producto para que puedas recogerlo en el horario indicado.
          </p>
          <button className="btn-primary" type="submit">
            Confirmar reserva
          </button>
        </div>
      </form>
    </div>
  );
}
