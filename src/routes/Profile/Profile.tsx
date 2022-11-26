import { useGetTranslationsQuery } from "api/translationApi";
import { useAppSelector } from "appRedux/hooks";
import { getCredentials } from "auth";
import "./Profile.style.scss";

const Profile = () => {
  const { userId } = useAppSelector(getCredentials);
  const { data: translations } = useGetTranslationsQuery(1);

  console.log(userId);

  const logOut = () => {
    //clear history
    //clear localStorage
    //clear credentials
    //clear redirect
  };

  return (
    <main className="profile">
      <div className="profile_temp">
        <h1>
          You are logged in as <br /> *
        </h1>
        <button onClick={logOut}>Log out</button>
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

// if (error) return <p>Something went wrong...</p>;
// if (isLoading) return <p>Loading...</p>;
// if (!user) return <p>Translations history empty.</p>;
