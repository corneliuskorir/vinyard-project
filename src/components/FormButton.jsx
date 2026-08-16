import styles from "./FormButton.module.css";

function FormButton({ title }) {
  return (
    <div className={styles.buttonDiv}>
      <button type="submit">{title}</button>
    </div>
  );
}

export default FormButton;
