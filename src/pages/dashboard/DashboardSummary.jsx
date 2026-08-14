import styles from "./DashboardSummary.module.css";

function DashboardSummary() {
  return (
    <div className={styles.summary}>
      <div className={styles.title}>
        <h1> Welcome back Admin</h1>
        <p>This is a summary of what to expect</p>
      </div>
      <div className={styles.content}>
        <div className={`${styles.summaryBox} shop`}>Shop summary</div>
        <div className={`${styles.summaryBox} visits`}>Visits summary </div>
        <div className={`${styles.summaryBox} events`}>Events summary </div>
      </div>
    </div>
  );
}

export default DashboardSummary;
