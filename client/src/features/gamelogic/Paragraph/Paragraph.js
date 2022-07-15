import "./Paragraph.css";

const Paragraph = ({
  words,
  getCharClass,
  getWordClass,
  gameStatus,
  inputInfo,
  idxInfo,
}) => {
  return (
    <p id="paragraph">
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
                  inputInfo,
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
