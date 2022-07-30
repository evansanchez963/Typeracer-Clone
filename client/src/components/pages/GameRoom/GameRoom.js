import { useSocket } from "../../../context/SocketContext";
import "./GameRoom.css";

const GameRoom = () => {
  const socket = useSocket();

  //const [joinedUsers, setJoinedUsers] = useState([]);

  return (
    <section id="game-room">
      <h1>Connected Users: numUsers</h1>
    </section>
  );
};

export default GameRoom;
