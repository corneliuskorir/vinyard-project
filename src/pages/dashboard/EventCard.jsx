import { useNavigate } from "react-router-dom";
import styles from "./EventCard.module.css";

function EventCard({ event }) {
  const navigate = useNavigate();
  return (
    <div className={styles.eventCard}>
      <h3>{event.title} </h3>
      <p>{event.description}</p>
      <div className={styles.eventImage}>
        <img src={event.imageUrl} />
      </div>
      <div className={styles.buttons}>
        <div onClick={() => navigate(`/dashboard/events/${event.id}`)}>
          Edit
        </div>
        <div className={styles.delete}>Delete</div>
      </div>
    </div>
  );
}

export default EventCard;
