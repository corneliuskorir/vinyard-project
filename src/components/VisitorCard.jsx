import { useVisits } from "../providers/VisitsProvider";
import styles from "./VisitorCard.module.css";

function VisitorCard({ visitor }) {
  const { deleteVisit } = useVisits();
  return (
    <div className={styles.visitorCard}>
      <div className={styles.infoItem}>
        <h4>Name:</h4>
        <p>{visitor.name}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Email:</h4>
        <p>{visitor.email}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Message:</h4>
        <p>{visitor.message}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Expected date:</h4>
        <p>{visitor.date}</p>
      </div>
      <div
        className={styles.actions}
        onClick={() => {
          deleteVisit(visitor.id);
        }}
      >
        <p>delete</p>
      </div>
    </div>
  );
}
export default VisitorCard;
