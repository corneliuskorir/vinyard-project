import { NavLink, Outlet } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

const linkStyle = ({ isActive }) =>
  ` ${styles.navLink} ${isActive ? styles.active : ""}`;
function DashboardLayout() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.navigation}>
        <div className={styles.header}>
          <p>Ambrosia</p>
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
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
