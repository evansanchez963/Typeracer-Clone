import axios from "axios";

const getTextData = async () => {
  const { data } = await axios.get(
    "http://localhost:5000/api/game/get-random-paragraph"
  );
  const text = data.text;

  return text;
};

export default getTextData;
