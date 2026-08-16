import EventCard from "../pages/dashboard/EventCard";
import { useEvents } from "../providers/EventsProvider";
import styles from "./EventsList.module.css";

function EventsList() {
  const { eventState } = useEvents();
  const { loading, data, error } = eventState;

  if (loading) {
    return <div>Just a moment...</div>;
  }
  if (error) {
    return <div className={error}>{error}</div>;
  }

  const dateSorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));

  return [].length ? (
    <div className={styles.eventsList}>
      {dateSorted.map((item) => (
        <EventCard event={item} />
      ))}
    </div>
  ) : (
    <div className={styles.empty}>
      We are workin on some exciting events. Come back later we might have
      something for you.
    </div>
  );
}

export default EventsList;
