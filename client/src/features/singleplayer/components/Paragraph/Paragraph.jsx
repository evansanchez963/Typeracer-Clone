import { getCharClass, getWordClass } from "../../utils/index";
import "./Paragraph.css";

const Paragraph = ({ gameStatus, words, currInput, idxInfoState }) => {
  return (
    <p className="singleplayer-paragraph">
      {words.map((word, wordIdx) => (
        <span key={wordIdx}>
          <span className={getWordClass(wordIdx, gameStatus, idxInfoState)}>
            {word.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className={getCharClass(
                  { char, charIdx, wordIdx },
                  gameStatus,
                  currInput,
                  idxInfoState
                )}
              >
                {char}
              </span>
            ))}
          </span>
          <span> </span>
        </span>
      ))}
    </p>
  );
};

export default Paragraph;
