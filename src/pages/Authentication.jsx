import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./Authentication.module.css";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import useFormData from "../hooks/useFormData";
import { useAuth } from "../providers/AuthProvider";

function Authentication() {
  const [signInLoginToggle, setSignInLoginToggle] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  const { user, authState, login, signUp } = useAuth();

  const defaultData = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  };

  const errorObj = {
    firstName: false,
    lastName: false,
    email: false,
    userName: false,
    password: false,
  };

  const [formError, setFormError, formData, handleFormChange, setFormData] =
    useFormData({
      defaultData: defaultData,
      focusRef: firstNameRef,
      errorObj: errorObj,
    });

  function handleToggle() {
    if (!signInLoginToggle) {
      console.log("now login ?");
      setFormError({ userName: false, password: false });
      setFormData({ userName: "", password: "" });
    }
    if (signInLoginToggle) {
      console.log("now signup ?");
      setFormError(errorObj);
      setFormData(defaultData);
    }
    setSignInLoginToggle(!signInLoginToggle);
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (const key in formData) {
      if (!Object.hasOwn(formData, key)) continue;
      const element = formData[key].trim();
      if (!element) {
        console.log(`${key} is empty`);
        setFormError((prev) => ({ ...prev, [key]: true }));
        return;
      }
    }
    if (signInLoginToggle) {
      login(formData);
      return;
    } else {
      signUp(formData);
      return;
    }
  }
  console.log(user);

  return user.userName ? (
    <Navigate to="/" replace />
  ) : (
    <div className={styles.auth}>
      <div className={styles.header}>
        <h1>Welcome {signInLoginToggle && "back"} to Suncrest valley</h1>
        <p>
          {signInLoginToggle
            ? "Continue where you left of"
            : "Create an account"}
        </p>
      </div>
      <div className={styles.formDiv}>
        <form onSubmit={handleSubmit}>
          {!signInLoginToggle && (
            <>
              <FormInput
                name={"firstName"}
                value={formData.firstName}
                onChange={handleFormChange}
                lable={"First Name"}
                error={formError.firstName}
              />
              <FormInput
                name={"lastName"}
                value={formData.lastName}
                onChange={handleFormChange}
                lable={"Last Name"}
                error={formError.lastName}
              />
              <FormInput
                name={"email"}
                value={formData.email}
                onChange={handleFormChange}
                lable={"Email"}
                error={formError.email}
              />
            </>
          )}
          <FormInput
            name={"userName"}
            value={formData.userName}
            onChange={handleFormChange}
            lable={"Username"}
            error={formError.userName}
          />
          <FormInput
            name={"password"}
            value={formData.password}
            onChange={handleFormChange}
            lable={"Password"}
            error={formError.password}
          />
          {authState.loading ? (
            <p>Trying to log you in ...</p>
          ) : (
            <FormButton title={signInLoginToggle ? "Login" : "Sign Up"} />
          )}
        </form>
      </div>

      {authState.error && <p className={styles.error}> {authState.error}</p>}

      <div onClick={handleToggle}>
        {signInLoginToggle
          ? "Dont have and account? Sign Up"
          : "Already have an account ? Login"}
      </div>
    </div>
  );
}

export default Authentication;
