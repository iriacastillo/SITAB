
import { Navigate, Route, Routes } from "react-router-dom";
import { BusinessAuthPage } from "./pages/BusinessAuthPage";
import { BusinessCatalogPage } from "./pages/BusinessCatalogPage";
import { BusinessDashboardPage } from "./pages/BusinessDashboardPage";
import { BusinessDetailPage } from "./pages/BusinessDetailPage";
import { BusinessProfilePage } from "./pages/BusinessProfilePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductUploadPage } from "./pages/ProductUploadPage";
import { ReservationsPage } from "./pages/ReservationsPage";
import { TutorialsPage } from "./pages/TutorialsPage";
import { UserAuthPage } from "./pages/UserAuthPage";
import { UserCatalogPage } from "./pages/UserCatalogPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { BusinessReservationsPage } from "./pages/BusinessReservationsPage";

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/comercios/acceso" element={<BusinessAuthPage />} />
      <Route path="/usuarios/acceso" element={<UserAuthPage />} />
      <Route path="/comercios/panel" element={<BusinessDashboardPage />} />
      <Route path="/comercios/subir-productos" element={<ProductUploadPage />} />
      <Route path="/comercios/mi-perfil" element={<BusinessProfilePage />} />
      <Route path="/comercios/activos" element={<BusinessCatalogPage basePath="/comercios/activos" />} />
      <Route path="/comercios/activos/:businessId" element={<BusinessDetailPage backTo="/comercios/activos" />} />
      <Route path="/comercios/mapa" element={<MapPage />} />
      <Route path="/comercios/tutoriales" element={<TutorialsPage />} />
      <Route path="/usuarios/perfil" element={<UserProfilePage />} />
      <Route path="/usuarios/catalogo" element={<UserCatalogPage />} />
      <Route path="/usuarios/catalogo/:businessId" element={<BusinessDetailPage backTo="/usuarios/catalogo" userMode />} />
      <Route path="/usuarios/favoritos" element={<FavoritesPage />} />
      <Route path="/usuarios/reservas" element={<ReservationsPage />} />
      <Route path="/usuarios" element={<Navigate to="/usuarios/perfil" replace />} />
      <Route path="/comercios" element={<Navigate to="/comercios/panel" replace />} />
      <Route path="/comercios/reservas" element={<BusinessReservationsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
