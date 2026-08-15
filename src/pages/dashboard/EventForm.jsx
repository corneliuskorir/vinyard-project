import { useRef, useState } from "react";
import FormInput from "../../components/FormInput";
import useFormData from "../../hooks/useFormData";

function EventForm() {
  const defaultData = { title: "", description: "", imageUrl: "" };
  const errorObj = { title: false, description: false, image: false };
  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageUrlRef = useRef();

  const { error, formData, handleFormChange } = useFormData({
    defaultData: defaultData,
    focusRef: titleRef,
    errorObj: errorObj,
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button>Create</button>
      </form>
    </div>
  );
}

export default EventForm;
