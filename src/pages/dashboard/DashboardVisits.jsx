import { Outlet } from "react-router-dom";
import styles from "./DashboardVisits.module.css";

function DashboardVisits() {
  return (
    <div className={styles.visits}>
      <div className={styles.header}>
        <h1>Visits</h1>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardVisits;
