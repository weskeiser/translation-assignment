import { Fragment } from "react";

// Translate text from input and return JSX.
// Formats into color coded sentences of words comprised of letters and ASL symbols.

const Translation = ({ wordsFromInput }: { wordsFromInput: string[] }) => {
  let incr = 1;

  // -- -- Turn word into JSX. Determine sentence color code. Determine if end of sentence.
  let even = true;
  const processWord = (word: string) => {
    return word.split("").map((letter: string, idx) => {
      const regex = /[A-Z]/gi;
      const alphaNumeric = letter.match(regex);

      // Return letter early if it a sentence ending character
      if (!alphaNumeric) {
        const endOfWord = idx === word.length - 1;

        if (!endOfWord) return letter;

        switch (letter) {
          case "?": {
            even = !even;
            return [letter];
          }
          case "!": {
            even = !even;
            return [letter];
          }
          case ".": {
            even = !even;
            return [letter];
          }
          case ",": {
            even = !even;
            return [letter];
          }
          default: {
            return letter;
          }
        }
      }

      return (
        <span
          className="sign"
          key={Math.random() + letter + Math.random() + incr++}
        >
          <img
            src={`images/signs/${letter.toLowerCase()}.png`}
            alt={`Letter ${letter} in ASL`}
          ></img>
          <span className="letter">{letter}</span>
        </span>
      );
    });
  };

  // -- Renders output.
  // -- Process word with processWord function. If comma or sentence ending char; take out of word and place it after.
  const translation = wordsFromInput.map((word: string) => {
    const evenOrOdd = `word_${even ? "even" : "odd"}`;

    let isComma = "";
    let endOfSentence = false;
    let processedWord = processWord(word);
    const lastLetter = processedWord[processedWord.length - 1];

    if (Array.isArray(lastLetter)) {
      const [char] = lastLetter;
      if (char === ",") {
        isComma = "comma";
      } else {
        endOfSentence = true;
      }

      processedWord.pop();
    }

    return (
      <Fragment key={Math.random() + word + incr++}>
        <span
          title={word}
          className={`word ${evenOrOdd}`}
        >
          {processedWord}
        </span>
        {endOfSentence || isComma ? (
          <span className={`word ${evenOrOdd} ${isComma} end-char`}>
            <span>{lastLetter}</span>
          </span>
        ) : null}
      </Fragment>
    );
  });

  return <>{translation}</>;
};

export default Translation;
