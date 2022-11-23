import Form from "features/common/Form";
import { FormEvent, useRef, useState } from "react";
import "./Home.style.scss";

export interface TranslateForm extends FormEvent<HTMLFormElement> {
  query: HTMLInputElement;
}

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [wordsFromInput, setWordsFromInput] = useState<string[]>(["bro."]);

  const onSubmit = (e: TranslateForm) => {
    e.preventDefault();
    const queryInput = e.currentTarget.query;

    setWordsFromInput(queryInput.value.split(" "));

    (inputRef.current as HTMLInputElement).value = "";
  };

  const showOutput = (wordsFromInput: string[]) => {
    let incr = 1;

    const signFromWord = (word: string) => {
      return word.split("").map((letter: string, idx) => {
        const regex = /[A-Z]/gi;
        const alphaNumeric = letter.match(regex);

        if (!alphaNumeric) {
          const endOfWord = idx === word.length - 1;
          if (!endOfWord) return [letter, false];

          switch (letter) {
            case "?": {
              return [letter, true];
            }
            case "!": {
              return [letter, true];
            }
            case ".": {
              return [letter, true];
            }
            default: {
              return [letter, false];
            }
          }
        }

        return [
          <img
            key={Math.random() + letter + Math.random() + incr++}
            src={`images/signs/${letter.toLowerCase()}.png`}
            alt={`Letter ${letter} in ASL`}
          ></img>,
          false,
        ];
      });
    };

    return wordsFromInput.map((word: string) => {
      let even = true;

      const [...sign] = signFromWord(word);
      console.log(sign);

      return (
        <span
          key={Math.random() + word + incr++}
          title={word}
          className={`sign_${even ? "even" : "odd"}`}
        >
          {[...sign]}
        </span>
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
