function NewEvent() {
  return (
    <div>
      <form>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" />
        <label htmlFor="description">Description:</label>
        <input type="text" id="description" />
        <label htmlFor="image">Image url:</label>
        <input type="text" id="image" />

        <button>Create</button>
      </form>
    </div>
  );
}

export default NewEvent;
