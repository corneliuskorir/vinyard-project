import { useRef, useState } from "react";
import FormInput from "../../components/FormInput";
import useFormData from "../../hooks/useFormData";
import { useParams } from "react-router-dom";
import FormButton from "../../components/FormButton";
import styles from "./EventForm.module.css";

function EventForm() {
  const { eventId } = useParams();

  console.log(eventId);

  const defaultData = { title: "", description: "", imageUrl: "", date: "" };
  const errorObj = { title: false, description: false, image: false };

  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageUrlRef = useRef();
  const dateRef = useRef();

  const [error, formData, handleFormChange] = useFormData({
    defaultData: defaultData,
    focusRef: titleRef,
    errorObj: errorObj,
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.eventForm}>
      <form onSubmit={handleSubmit}>
        <h2>{eventId ? "Edit Event" : "New Event"}</h2>
        <FormInput
          lable={"Title"}
          name={"title"}
          value={formData.title}
          placeholder={"Enter event title"}
          error={error.title}
          inputRef={titleRef}
          onChange={handleFormChange}
        />

        <FormInput
          lable={"Description"}
          name={"description"}
          value={formData.description}
          placeholder={"Description of the event"}
          error={error.description}
          inputRef={descriptionRef}
          onChange={handleFormChange}
        />

        <FormInput
          lable={"Image Url"}
          name={"imageUrl"}
          value={formData.imageUrl}
          placeholder={"Poster Image url"}
          error={error.image}
          inputRef={imageUrlRef}
          onChange={handleFormChange}
        />

        <FormInput
          lable={"Date"}
          name={"date"}
          value={formData.date}
          error={error.date}
          inputRef={dateRef}
          onChange={handleFormChange}
        />

        <FormButton title={eventId ? "Save" : "Done"} />
      </form>
    </div>
  );
}

export default EventForm;

//todo: (plugin data when in edit mode)
