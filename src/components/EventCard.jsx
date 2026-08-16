import { useLocation, useNavigate } from "react-router-dom";
import styles from "./EventCard.module.css";
import { format } from "date-fns";
import { useEvents } from "../providers/EventsProvider";

function EventCard({ event }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard/events";

  const navigate = useNavigate();

  console.log("Date problem", new Date(event.date));
  const date = format(new Date(event.date), "LLL io y K:mm bbb");

  const { deleteEvent } = useEvents();

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImage}>
        <img src={event.imageUrl} />
      </div>
      <div className={styles.details}>
        <h3>{event.title} </h3>
        <p>{event.description}</p>
        <p id="date">{date}</p>

        {isDashboard && (
          <div className={styles.buttons}>
            <div onClick={() => navigate(`/dashboard/events/${event.id}`)}>
              Edit
            </div>
            <div
              className={styles.delete}
              onClick={() => deleteEvent(event.id)}
            >
              Delete
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCard;
