const handleChange = (event, setInputInfo) => {
  setInputInfo((prev) => ({ ...prev, currInput: event.target.value.trim() }));
};

export default handleChange;
