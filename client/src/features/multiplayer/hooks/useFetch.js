import { useState, useEffect } from "react";
import { useSocket } from "../../../context/SocketContext";
import axios from "axios";

const useFetch = (roomCode, userRoster) => {
  const [text, setText] = useState("");
  const socket = useSocket();

  const fetchDataHandler = async (data) => {
    if (data.fetchData) {
      console.log("Fetch data!");
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

    // If this socket id is the first one to join room or is first on the roster,
    // send text info to other clients in room.
    if (
      text !== "" &&
      Object.keys(userRoster).length > 1 &&
      Object.keys(userRoster)[0] === socket.id
    )
      socket.emit("send_text_data", { room: roomCode, text: text });

    return () => {
      socket.off("fetch_text_data", fetchDataHandler);
      socket.off("recieve_text_data", recieveDataHandler);
    };
  }, [roomCode, userRoster, text, socket]);

  return { text };
};

export default useFetch;
