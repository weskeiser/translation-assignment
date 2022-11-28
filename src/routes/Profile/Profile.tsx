import {
  useClearTranslationsMutation,
  useGetTranslationsQuery,
} from "api/translationApi";
import { useAppDispatch } from "appRedux/hooks";
import { setCredentials, useAuth } from "auth";
import { useNavigate } from "react-router-dom";
import "./Profile.style.scss";
import { MouseEvent, useState } from "react";
import Translation from "features/Translation";

const Profile = () => {
  const { userId } = useAuth();
  const { data: translations } = useGetTranslationsQuery(userId);
  const [clearTranslationsMutation] = useClearTranslationsMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [translationShown, setTranslationShown] = useState<string[] | null>(
    null
  );

  const signOut = () => {
    // Clear localStorage
    localStorage.removeItem("app42token");
    localStorage.removeItem("app42userId");

    // Unset credentials
    dispatch(setCredentials({ userId: null, token: null, username: null }));

    // Redirect to login
    navigate("/login");
  };

  const clearTranslations = () => {
    clearTranslationsMutation(userId);
  };

  const toggleTranslation = (e: MouseEvent<HTMLButtonElement>) => {
    if (translationShown) return setTranslationShown(null);

    const { innerText } = e.target as HTMLButtonElement;
    setTranslationShown(innerText.split(" "));
  };

  return (
    <main className="profile">
      <section className="profile_upper">
        <h1>Profile</h1>

        <div className="profile_upper_buttons">
          <button onClick={clearTranslations}>Clear History</button>

          <button
            onClick={signOut}
            className="profile_upper_buttons-signout"
          >
            Log out
          </button>
        </div>

        <p>Translation history</p>
      </section>

      <section className="profile_translations">
        <ul className="profile_translations_list">
          {translationShown ? (
            <li>
              <button onClick={toggleTranslation}>
                <Translation plainText={translationShown} />
              </button>
            </li>
          ) : translations ? (
            translations.map((item) => {
              return (
                <li key={item}>
                  <button onClick={toggleTranslation}>{item}</button>
                </li>
              );
            })
          ) : null}
        </ul>
        <div className="profile_translations_decoration"></div>
      </section>
    </main>
  );
};

export default Profile;

// if (error) return <p>Something went wrong...</p>;
// if (isLoading) return <p>Loading...</p>;
// if (!user) return <p>Translations history empty.</p>;
