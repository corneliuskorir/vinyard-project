import styles from "./EventCard.module.css";

function EventCard({ event }) {
  return (
    <div className={styles.eventCard}>
      <div className={styles.buttons}>
        <div>Edit</div>
        <div>Delete</div>
      </div>
      <h3>{event.title} </h3>
      <p>{event.description}</p>
    </div>
  );
}

export default EventCard;
