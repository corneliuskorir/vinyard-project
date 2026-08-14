import styles from "./DashboardEvents.module.css";

function DashboardEvents() {
  return (
    <div className={styles.events}>
      <div className={styles.header}>
        <h1>Events</h1>
        <div className={styles.newEvent} onClick={() => {}}>
          New Event
        </div>
      </div>
    </div>
  );
}

export default DashboardEvents;
