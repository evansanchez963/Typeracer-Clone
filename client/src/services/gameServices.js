import axios from "axios";

const getTextData = async () => {
  const response = await axios.get("https://metaphorpsum.com/paragraphs/1/1");
  const text = response.data;
  return text;
};

export default getTextData;
