import styles from "./UserCard.module.css";

function UserCard({ user, makeAdmin }) {
  return (
    <div className={styles.userCard}>
      <div className={styles.info}>
        <h3>Name:</h3>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className={styles.info}>
        <h3>Email:</h3>
        <p>{user.email}</p>
      </div>
      <div className={styles.info}>
        <h3>Username:</h3>
        <p>{user.userName}</p>
      </div>
      <div className={styles.admin}>
        <label htmlFor="isAdmin">Admin:</label>
        <input
          id="isAdmin"
          type="checkbox"
          checked={user.admin}
          onChange={() => makeAdmin(user)}
        />
      </div>
    </div>
  );
}

export default UserCard;
