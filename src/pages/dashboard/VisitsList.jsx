import VisitorCard from "../../components/VisitorCard";
import { useVisits } from "../../providers/VisitsProvider";
import styles from "./VisitsList.module.css";

function VisitsList() {
  const { visitsState } = useVisits();
  const { data, loading, error } = visitsState;
  if (loading) {
    return <div className={styles.loading}>Just a moment...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  const dateSorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  return dateSorted.length ? (
    <div className={styles.visitsList}>
      {dateSorted.map((item) => (
        <VisitorCard visitor={item} />
      ))}
    </div>
  ) : (
    <div className={styles.noData}>No appointmets at the moment</div>
  );
}

export default VisitsList;
