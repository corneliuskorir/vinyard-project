import { useRef, useState } from "react";
import FormInput from "./FormInput";
import useFormData from "../hooks/useFormData";
import { useOutletContext, useParams } from "react-router-dom";
import FormButton from "./FormButton";
import styles from "./EventForm.module.css";
import { useEvents } from "../providers/EventsProvider";

function EventForm() {
  const { eventId } = useParams();
  /*   console.log(eventId);
   */
  const { addEvents, editEvent } = useEvents();

  const { loading, data, error } = useOutletContext();

  let defaultData = { title: "", description: "", imageUrl: "", date: "" };
  const errorObj = {
    title: false,
    description: false,
    imageUrl: false,
    date: false,
  };

  if (eventId) {
    defaultData = data.find((item) => item.id === eventId);
  }

  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageUrlRef = useRef();
  const dateRef = useRef();

  const [formError, setFormError, formData, handleFormChange] = useFormData({
    defaultData: defaultData,
    focusRef: titleRef,
    errorObj: errorObj,
  });

  function handleSubmit(e) {
    e.preventDefault();
    //validate formdata not empty and set error to true for field that does
    for (const key in formData) {
      if (!Object.hasOwn(formData, key)) continue;
      const element = formData[key].trim();
      if (!element) {
        console.log(`${key} is empty`);
        setFormError((prev) => ({ ...prev, [key]: true }));
        return;
      }
    }
    if (eventId) {
      editEvent(formData);
      return;
    }
    addEvents(formData);
  }

  if (loading) {
    return <div className={styles.loading}> Just a moment...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
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
          error={formError.title}
          inputRef={titleRef}
          onChange={handleFormChange}
        />

        <FormInput
          lable={"Description"}
          name={"description"}
          value={formData.description}
          placeholder={"Description of the event"}
          error={formError.description}
          inputRef={descriptionRef}
          onChange={handleFormChange}
        />

        <FormInput
          lable={"Image Url"}
          name={"imageUrl"}
          value={formData.imageUrl}
          placeholder={"Poster Image url"}
          error={formError.imageUrl}
          inputRef={imageUrlRef}
          onChange={handleFormChange}
        />

        <FormInput
          lable={"Date"}
          name={"date"}
          value={formData.date}
          error={formError.date}
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
