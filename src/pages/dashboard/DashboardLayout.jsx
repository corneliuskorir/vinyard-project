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
  console.log(authState);

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  const availableUser = !(user.userName === null);
  console.log(user.admin);

  return user.admin ? (
    <>
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
              <NavLink to="/dashboard/users" className={linkStyle}>
                Users
              </NavLink>
              <NavLink to="/" className={linkStyle}>
                Back to Website
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
    </>
  ) : (
    !availableUser && <Navigate to="/authenticate" replace />
  );
}

export default DashboardLayout;
