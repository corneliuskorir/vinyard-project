import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./DashboardLayout.module.css";
import { DashboardProvider } from "../../providers/DashboardProvider";
import { useAuth } from "../../providers/AuthProvider";

const linkStyle = ({ isActive }) =>
  ` ${styles.navLink} ${isActive ? styles.active : ""}`;
function DashboardLayout() {
  const navigate = useNavigate();

  const { user, authState } = useAuth();

  console.log(user.userName);

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  return user.userName !== null ? (
    <div className={styles.dashboard}>
      <div className={styles.navigation}>
        <div className={styles.header} onClick={() => navigate("/dashboard")}>
          <p>Suncrest Valley</p>
          <h1>Dashboard</h1>
        </div>
        <div>
          <nav>
            <NavLink to="/dashboard/shop" className={linkStyle}>
              Shop
            </NavLink>
            <NavLink to="/dashboard/visits" className={linkStyle}>
              Visits
            </NavLink>
            <NavLink to="/dashboard/events" className={linkStyle}>
              Events
            </NavLink>
          </nav>
        </div>
      </div>
      <div className={styles.content}>
        <DashboardProvider>
          <Outlet />
        </DashboardProvider>
      </div>
    </div>
  ) : (
    <Navigate to={"/authenticate"} replace />
  );
}

export default DashboardLayout;
