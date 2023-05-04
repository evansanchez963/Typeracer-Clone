import getCharClass from "../../utils/getCharClass";
import getWordClass from "../../utils/getWordClass";
import "./Paragraph.css";

const Paragraph = ({ clientStatus, words, currInput, idxInfo }) => {
  return (
    <p className="multiplayer-paragraph">
      {words.map((word, wordIdx) => (
        <span key={word + wordIdx}>
          <span className={getWordClass(wordIdx, clientStatus, idxInfo)}>
            {word.split("").map((char, charIdx) => (
              <span
                key={char + charIdx}
                className={getCharClass(
                  char,
                  charIdx,
                  wordIdx,
                  clientStatus,
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
