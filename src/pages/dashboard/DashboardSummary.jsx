import { Link } from "react-router-dom";
import styles from "./DashboardSummary.module.css";

function DashboardSummary() {
  return (
    <div className={styles.summary}>
      <div className={styles.title}>
        <h1> Welcome back Admin</h1>
        <p>This is a summary of what to expect</p>
      </div>
      <div className={styles.content}>
        <div className={`${styles.summaryBox} shop`}>
          <p> Shop summary </p>
          <Link to="/dashboard/shop">View more</Link>
        </div>
        <div className={`${styles.summaryBox} visits`}>
          <p> Visits summary </p>
          <Link to="/dashboard/visits">View more</Link>
        </div>
        <div className={`${styles.summaryBox} events`}>
          <p>Events summary</p>
          <Link to="/dashboard/events">View more</Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardSummary;
