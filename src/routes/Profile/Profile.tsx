import { useGetTranslationsQuery } from "api/translationApi";
import "./Profile.style.scss";

const Profile = () => {
  const { data: user, error, isLoading } = useGetTranslationsQuery(1);

  if (error) return <p>Something went wrong...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Translations history empty.</p>;

  return (
    <main className="profile">
      <div className="profile_temp">
        <h1>
          You are logged in as <br /> *
        </h1>
        <button>Log out</button>
      </div>

      <div className="profile_translations">
        <ul className="profile_translations_list">
          {user.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    </main>
  );
};

export default Profile;
