import { NavLink, Outlet } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

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
            <NavLink to="/dashboard/shop">Shop</NavLink>
            <NavLink to="/dashboard/visits">Visits</NavLink>
            <NavLink to="/dashboard/events">Events</NavLink>
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
