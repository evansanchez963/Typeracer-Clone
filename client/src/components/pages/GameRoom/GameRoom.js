import { useSocket } from "../../../context/SocketContext";
import "./GameRoom.css";

const GameRoom = () => {
  const socket = useSocket();

  //const [joinedUsers, setJoinedUsers] = useState([]);

  return <section id="game-room"></section>;
};

export default GameRoom;
