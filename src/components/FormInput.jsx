import { useId } from "react";
import styles from "./FormInput.module.css";

function FormInput({
  lable,
  name,
  placeholder,
  error,
  inputRef,
  onChange,
  value,
}) {
  const id = useId();
  const isLongForm = name === "description" || name === "message";

  const isDate = name === "date";

  const isEmail = name === "email";

  function handleChange(e) {
    onChange({ name: name, input: e.target.value });
  }
  return (
    <div className={`${styles.formInput} ${error ? styles.error : ""}`}>
      <label htmlFor={id}>{lable ? lable : ""}</label>
      {isLongForm ? (
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          name={name}
          ref={inputRef}
          value={value}
          type={isDate ? "datetime-local" : isEmail ? "email" : "text"}
          id={id}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}
      {error && <i>{`Please provide a valid ${lable}`}</i>}
    </div>
  );
}

export default FormInput;
