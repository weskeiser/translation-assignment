import {
  useClearTranslationsMutation,
  useGetTranslationsQuery,
} from "api/translationApi";
import { useAppDispatch } from "appRedux/hooks";
import { setCredentials, useAuth } from "auth";
import { useNavigate } from "react-router-dom";
import "./Profile.style.scss";

const Profile = () => {
  const { userId } = useAuth();
  const { data: translations } = useGetTranslationsQuery(userId);
  const [clearTranslationsMutation] = useClearTranslationsMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = () => {
    //clear history
    clearTranslationsMutation(userId);
    //clear localStorage
    localStorage.removeItem("app42token");
    localStorage.removeItem("app42userId");
    //clear credentials
    dispatch(setCredentials({ userId: null, token: "", username: "" }));

    navigate("/login");
    //clear redirect
  };

  const clearTranslations = () => {
    clearTranslationsMutation(userId);
  };

  return (
    <main className="profile">
      <section className="profile_upper">
        <h1>Profile</h1>

        <div className="profile_upper_buttons">
          <button
            className="profile_upper_buttons-clear"
            onClick={clearTranslations}
          >
            Clear History
          </button>

          <button onClick={signOut}>Log out</button>
        </div>

        <p>Translation history</p>
      </section>

      <section className="profile_translations">
        <dl className="profile_translations_list">
          {translations &&
            translations.map((item) => {
              return <dt key={item}>{item}</dt>;
            })}
        </dl>
        {/* <div className="profile_translations_decoration">asldkfj</div> */}
      </section>
    </main>
  );
};

export default Profile;

// if (error) return <p>Something went wrong...</p>;
// if (isLoading) return <p>Loading...</p>;
// if (!user) return <p>Translations history empty.</p>;
