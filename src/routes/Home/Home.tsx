import { useSetTranslationsMutation } from "api/translationApi";
import Form from "features/common/Form";
import React from "react";
import { FormEvent, useRef, useState } from "react";
import "./Home.style.scss";

export interface TranslateForm extends FormEvent<HTMLFormElement> {
  query: HTMLInputElement;
}

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [wordsFromInput, setWordsFromInput] = useState<string[]>([
    "A",
    "short",
    "sentence.",
    "Followed",
    "by",
    "another.",
    "Followed",
    "by",
    "a",
    "little.",
  ]);

  const [setTranslationsInDB] = useSetTranslationsMutation();

  const onSubmit = (e: TranslateForm) => {
    e.preventDefault();
    const { value: text } = e.currentTarget.query;

    setWordsFromInput(text.split(" "));

    setTranslationsInDB({ id: 1, text });

    (inputRef.current as HTMLInputElement).value = "";
  };

  const showOutput = (wordsFromInput: string[]) => {
    let incr = 1;
    let even = true;

    const signsFromWord = (word: string) => {
      return word.split("").map((letter: string, idx) => {
        const regex = /[A-Z]/gi;
        const alphaNumeric = letter.match(regex);

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
            default: {
              return letter;
            }
          }
        }

        return (
          <>
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
          </>
        );
      });
    };

    return wordsFromInput.map((word: string) => {
      const evenOrOdd = `word_${even ? "even" : "odd"}`;

      let signs = signsFromWord(word);
      const lastLetter = signs[signs.length - 1];
      let endOfSentence = false;

      if (Array.isArray(lastLetter)) {
        endOfSentence = true;
        signs.pop();
      }

      return (
        <React.Fragment key={Math.random() + word + incr++}>
          <span
            title={word}
            className={`word ${evenOrOdd}`}
          >
            {signs}
          </span>
          {endOfSentence ? (
            <span className={`word ${evenOrOdd} end-char`}>
              <span>{lastLetter}</span>
            </span>
          ) : null}
        </React.Fragment>
      );
    });
  };

  return (
    <main className="home">
      <section
        className="home_input"
        aria-label="Input for translation"
      >
        <Form
          id="translation-form"
          onSubmit={onSubmit}
        >
          <input
            ref={inputRef}
            type="text"
            name="query"
            placeholder="Write something..."
          />
        </Form>
      </section>

      <section
        className="home_translation"
        aria-label="Output for translation"
      >
        <div className="home_translation_box">
          <output
            form="translation-form"
            name="output"
          >
            {showOutput(wordsFromInput)}
          </output>
          <div className="home_translation_box-bottom">
            <button aria-roledescription="Toggle: ASL or English in output area">
              Translation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
