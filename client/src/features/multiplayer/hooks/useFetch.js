import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (socket, roomCode, userRoster) => {
  const [text, setText] = useState("");

  const fetchDataHandler = async (data) => {
    if (data.fetchData) {
      try {
        const response = await axios.get(
          "http://metaphorpsum.com/paragraphs/1/1"
        );
        setText(response.data);
      } catch (err) {
        setText(err);
      }
    } else return;
  };

  const recieveDataHandler = (data) => {
    setText(data.text);
  };

  useEffect(() => {
    socket.on("fetch_text_data", fetchDataHandler);
    socket.on("recieve_text_data", recieveDataHandler);

    // If this socket id is not the first one to join room,
    // send text info to other clients in room.
    if (Object.keys(userRoster).length > 1)
      socket.emit("send_text_data", { room: roomCode, text: text });

    return () => socket.off("fetch_text_data", fetchDataHandler);
  }, [socket, userRoster]);

  return { text };
};

export default useFetch;
