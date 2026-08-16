import EventCard from "../../components/EventCard";
import styles from "./DashboardEventsList.module.css";
import { useOutletContext } from "react-router-dom";

function DashboardEventsList() {
  const { loading, data, error } = useOutletContext();
  /*   console.log(loading, data, error);
   */
  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Just a moment...</h2>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  return data.length ? (
    <div className={styles.eventsList}>
      {data.map((e) => (
        <EventCard event={e} />
      ))}
    </div>
  ) : (
    <div className={styles.noData}>
      <h3>No events at the moment</h3>
      <p>create an event to view them here</p>
    </div>
  );
}
export default DashboardEventsList;
