import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import Loader from "../common/Loader";

export default function ProtectedRoute() {
  const { token, isLoading } = useAuth();
  const hasToken = token || localStorage.getItem("access_token");

  if (isLoading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <Loader size={50} />
      </div>
    );
  }

  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
