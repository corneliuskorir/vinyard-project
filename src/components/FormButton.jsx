import styles from "./FormButton.module.css";

function FormButton({ title, onClick }) {
  return (
    <div className={styles.buttonDiv} onClick={onClick}>
      {title}
    </div>
  );
}

export default FormButton;
