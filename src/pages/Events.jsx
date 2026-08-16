import { EventsProvider } from "../providers/EventsProvider";
import EventsList from "../components/EventsList";
import styles from "./Events.module.css";

function Events() {
  return (
    <div className={styles.events}>
      <EventsProvider>
        <div className={styles.title}>
          <h2>Come taste the Sun</h2>
          <p>upcoming events</p>
        </div>
        <EventsList />
      </EventsProvider>
    </div>
  );
}

export default Events;
