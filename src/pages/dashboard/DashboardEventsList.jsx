import EventCard from "./EventCard";
import styles from "./DashboardEventsList.module.css";

const eventsDemo = [
  {
    id: 1,
    title: "This is a fake title",
    description:
      "This is a fake description of the event and the thing youre supposed to do there",
    image: "",
    date: "",
    rsvps: [
      {
        userName: "jack black",
        userId: 1,
      },
      {
        userName: "jack black",
        userId: 1,
      },
      {
        userName: "jack black",
        userId: 1,
      },
    ],
  },
  {
    id: 2,
    title: "This is a fake title",
    description:
      "This is a fake description of the event and the thing youre supposed to do there",
    image: "",
    date: "",
    rsvps: [
      {
        userName: "jack black",
        userId: 1,
      },
      {
        userName: "jack black",
        userId: 2,
      },
      {
        userName: "jack black",
        userId: 3,
      },
    ],
  },
  {
    id: 3,
    title: "This is a fake title",
    description:
      "This is a fake description of the event and the thing youre supposed to do there",
    image: "",
    date: "",
    rsvps: [
      {
        userName: "jack black",
        userId: 1,
      },
      {
        userName: "jack black",
        userId: 1,
      },
      {
        userName: "jack black",
        userId: 1,
      },
    ],
  },
];

function DashboardEventsList() {
  return eventsDemo.length ? (
    <div className={styles.eventsList}>
      {eventsDemo.map((e) => (
        <EventCard event={e} />
      ))}
    </div>
  ) : (
    <div>
      <h3>No events at the moment</h3>
      <p>create an event to view them here</p>
    </div>
  );
}
export default DashboardEventsList;
