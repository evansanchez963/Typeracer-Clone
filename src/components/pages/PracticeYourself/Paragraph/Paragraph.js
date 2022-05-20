import "./Paragraph.css"

const Paragraph = ({ words, getCharClass, getWordClass }) => {
  return (
    <p id="paragraph">
      {
        words.map((word, wordIdx) => 
          <span key={word + wordIdx}>
            <span className={getWordClass(wordIdx)}>
              {
                word.split("").map((char, charIdx) => 
                  <span key={char + charIdx} className={getCharClass(char, charIdx, wordIdx)}>{char}</span>
                )
              }  
            </span>  
            <span> </span>
          </span>
        )
      }
    </p>
  )
}

export default Paragraph