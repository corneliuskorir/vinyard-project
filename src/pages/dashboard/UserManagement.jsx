import { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import styles from "./UserManagement.module.css";
import UserCard from "../../components/UserCard";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  const { getAllUsers, allUsers, makeAdmin, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getAllUsers();
  }, []);
  function handleLogOut() {
    navigate("/", { replace: true });
  }
  return (
    <div className={styles.users}>
      <div className={styles.header}>
        <h1>User management</h1>
        <button onClick={() => logOut()}>Logout</button>
      </div>
      <div className={styles.content}>
        {allUsers.length ? (
          allUsers.map((user) => <UserCard user={user} makeAdmin={makeAdmin} />)
        ) : (
          <div>
            There are no users, That makes you a tresspaser, Please leave.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
