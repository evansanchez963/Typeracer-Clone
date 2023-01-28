import axios from "axios";

const getTextData = async () => {
  const { data } = await axios.get(
    "https://typeracer-clone-backend.vercel.app/api/game/random-paragraph"
  );
  const text = data.text;

  return text;
};

export default getTextData;
