import axios from "axios";

const getTextData = async () => {
  const { data } = await axios.get(
    "https://typeracer-clone-backend.onrender.com/api/game/get-random-paragraph"
  );
  const text = data.text;

  return text;
};

export default getTextData;
