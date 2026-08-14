import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./DashboardEvents.module.css";

function DashboardEvents() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewEventPage = location.pathname === "/dashboard/events/new";

  const handleClick = () =>
    !isNewEventPage
      ? navigate("/dashboard/events/new")
      : navigate("/dashboard/events");

  console.log(location.pathname);
  return (
    <div className={styles.events}>
      <div className={styles.header}>
        <h1>Events</h1>
        <div className={styles.newEvent} onClick={handleClick}>
          {!isNewEventPage ? "New Event" : "Back"}
        </div>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardEvents;
