import { useGetTranslationsQuery } from "api/translationApi";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { getCredentials, setCredentials } from "auth";
import "./Profile.style.scss";

const Profile = () => {
  const { data: user, error, isLoading } = useGetTranslationsQuery(1);

  const dispatch = useAppDispatch();

  const { data: translations } = useGetTranslationsQuery(1);

  const test = useAppSelector(getCredentials);
  console.log("auth:", test);

  const onClick = () => {
    console.log(test);
  };

  if (error) return <p>Something went wrong...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Translations history empty.</p>;
  console.log(translations);

  return (
    <main className="profile">
      <div className="profile_temp">
        <h1>
          You are logged in as <br /> *
        </h1>
        <button onClick={onClick}>Log out</button>
      </div>

      <div className="profile_translations">
        <dl className="profile_translations_list">
          {translations &&
            translations.map((item) => {
              return <dt key={item}>{item}</dt>;
            })}
        </dl>
        {/* <div className="profile_translations_decoration">asldkfj</div> */}
      </div>
    </main>
  );
};

export default Profile;
