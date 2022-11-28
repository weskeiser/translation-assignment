import { useSetTranslationsMutation } from "api/translationApi";
import { useAuth } from "auth";
import Form from "features/common/Form";
import Translation from "features/Translation";
import { FormEvent, useRef, useState } from "react";
import "./Home.style.scss";

export interface TranslateForm extends FormEvent<HTMLFormElement> {
  query: HTMLInputElement;
}

const Home = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [setTranslationsInDB] = useSetTranslationsMutation();
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

  const { userId } = useAuth();

  // $ - After user input: split text and keep in state. Clear input.
  const onSubmit = (e: TranslateForm) => {
    e.preventDefault();
    const { value: text } = e.currentTarget.query;
    const inputEl = inputRef.current as HTMLInputElement;

    setWordsFromInput(text.split(" "));

    setTranslationsInDB({ userId, text });

    inputEl.value = "";
  };

  return (
    <main className="home">
      <section className="home_input">
        <Form
          id="translation-form"
          onSubmit={onSubmit}
          aria-label="Input for translation from English to ASL"
        >
          <input
            ref={inputRef}
            type="text"
            name="query"
            placeholder="Write something..."
            autoFocus
          />
        </Form>
      </section>

      <section className="home_translation">
        <div className="home_translation_box">
          <output
            form="translation-form"
            name="output"
            aria-label="Output from translation"
          >
            <Translation wordsFromInput={wordsFromInput} />
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
