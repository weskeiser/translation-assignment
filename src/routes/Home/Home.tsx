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
  const { userId } = useAuth();
  const [setTranslationsInDB] = useSetTranslationsMutation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [wordsFromInput, setWordsFromInput] = useState<string[]>([]);

  // $ - After user input: split text and keep in state. Clear input.
  const onSubmit = (e: TranslateForm) => {
    e.preventDefault();
    const { value: text } = e.currentTarget.query;
    if (!text) return;

    const inputEl = inputRef.current as HTMLInputElement;

    setWordsFromInput(text.split(" "));

    setTranslationsInDB({ userId, text });

    inputEl.value = "";
  };

  const focusInput = () => {
    (inputRef.current as HTMLInputElement).focus();
  };

  return (
    <main className="home">
      <section className="home_input">
        <Form
          id="translation-form"
          onSubmit={onSubmit}
          aria-label="Input for translation from English to ASL"
          onBtnClick={focusInput}
        >
          <input
            ref={inputRef}
            type="text"
            name="query"
            placeholder="Write something..."
            autoFocus={true}
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
            <Translation
              plainText={wordsFromInput}
              className="output_signs"
            />
          </output>

          <div className="home_translation_box-bottom"></div>
        </div>
      </section>
    </main>
  );
};

export default Home;
