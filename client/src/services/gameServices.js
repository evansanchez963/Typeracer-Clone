import axios from "axios";

const getTextData = async () => {
  const { data } = await axios.get(
    "https://typeracer-clone-production.up.railway.app/api/game/random-paragraph"
  );
  const text = data.text;

  return text;
};

export default getTextData;
