import getCharClass from "../../utils/getCharClass";
import getWordClass from "../../utils/getWordClass";
import "./Paragraph.css";

const Paragraph = ({ gameStatus, words, currInput, idxInfo }) => {
  return (
    <p className="paragraph">
      {words.map((word, wordIdx) => (
        <span key={word + wordIdx}>
          <span className={getWordClass(wordIdx, gameStatus, idxInfo)}>
            {word.split("").map((char, charIdx) => (
              <span
                key={char + charIdx}
                className={getCharClass(
                  char,
                  charIdx,
                  wordIdx,
                  gameStatus,
                  currInput,
                  idxInfo
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
