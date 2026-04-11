import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { mockBusinesses, mockProducts, mockUsers } from "../data/mockData";
import { Business, FavoriteState, Product, Reservation, UserProfile } from "../types";

interface AppStore {
  businesses: Business[];
  products: Product[];
  users: UserProfile[];
  activeBusinessId: string;
  activeUserId: string;
  favorites: FavoriteState;
  reservations: Reservation[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateBusiness: (business: Business) => void;
  updateUser: (user: UserProfile) => void;
  toggleBusinessFavorite: (businessId: string) => void;
  toggleProductFavorite: (productId: string) => void;
  addReservation: (reservation: Omit<Reservation, "id" | "status">) => void;
  cancelReservation: (reservationId: string) => { ok: boolean; message: string };
}

const AppContext = createContext<AppStore | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [favorites, setFavorites] = useState<FavoriteState>({
    businessIds: ["pan-vallecas"],
    productIds: ["fruta-1"],
  });
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "reservation-1",
      productId: "pan-1",
      businessId: "pan-vallecas",
      productName: "Hogaza de masa madre",
      businessName: "Horno Vallecano",
      pickupDate: "2026-04-12",
      pickupTime: "11:30",
      status: "Confirmada",
    },
  ]);

  const activeBusinessId = "pan-vallecas";
  const activeUserId = "user-1";

  const value = useMemo<AppStore>(
    () => ({
      businesses,
      products,
      users,
      activeBusinessId,
      activeUserId,
      favorites,
      reservations,
      addProduct: (product) => {
        const id = `product-${Date.now()}`;
        setProducts((current) => [{ ...product, id }, ...current]);
      },
      updateBusiness: (business) => {
        setBusinesses((current) => current.map((item) => (item.id === business.id ? business : item)));
      },
      updateUser: (user) => {
        setUsers((current) => current.map((item) => (item.id === user.id ? user : item)));
      },
      toggleBusinessFavorite: (businessId) => {
        setFavorites((current) => ({
          ...current,
          businessIds: current.businessIds.includes(businessId)
            ? current.businessIds.filter((id) => id !== businessId)
            : [...current.businessIds, businessId],
        }));
      },
      toggleProductFavorite: (productId) => {
        setFavorites((current) => ({
          ...current,
          productIds: current.productIds.includes(productId)
            ? current.productIds.filter((id) => id !== productId)
            : [...current.productIds, productId],
        }));
      },
      addReservation: (reservation) => {
        setReservations((current) => [
          {
            ...reservation,
            id: `reservation-${Date.now()}`,
            status: "Confirmada",
          },
          ...current,
        ]);
      },
      cancelReservation: (reservationId) => {
        const reservation = reservations.find((item) => item.id === reservationId);

        if (!reservation) {
          return { ok: false, message: "No se ha encontrado la reserva." };
        }

        const pickupAt = new Date(`${reservation.pickupDate}T${reservation.pickupTime}`);
        const twoHoursBefore = new Date(pickupAt.getTime() - 2 * 60 * 60 * 1000);

        if (new Date() > twoHoursBefore) {
          return { ok: false, message: "Solo puedes anular una reserva hasta 2 horas antes de la recogida." };
        }

        setReservations((current) =>
          current.map((item) => (item.id === reservationId ? { ...item, status: "Anulada" } : item)),
        );
        return { ok: true, message: "Reserva anulada correctamente." };
      },
    }),
    [businesses, favorites, products, reservations, users],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppStore debe usarse dentro de AppProvider");
  }

  return context;
}
