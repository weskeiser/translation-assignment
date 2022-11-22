import {
  useGetAllUsersQuery,
  useGetTranslationsQuery,
  useCreateUserMutation,
} from "api/translationApi";
import { useAppDispatch } from "appRedux/hooks";
import { addToHistory } from "./aslHistory.redux";

const ASLHistory = () => {
  const dispatch = useAppDispatch();

  const { data: translations, error, isLoading } = useGetTranslationsQuery(1);

  const { data } = useGetAllUsersQuery(1);

  const newUser = {
    id: 2,
    username: "Bob",
    password: "Hashed&Salted",
    translations: ["fishbowl"],
  };

  const [createUser, result] = useCreateUserMutation();

  const onClicky = () => {
    createUser(newUser);
  };

  if (error) return <p>Something went wrong...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!translations) return <p>Translations history empty.</p>;

  const translationsList = (
    <ul>
      {translations.map((item: any) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );

  const addToAslHistory = () => {
    const addition = "zzlkjdsf8d7fajlk";

    dispatch(addToHistory(addition));
  };

  return (
    <div>
      <button onClick={onClicky}>Add To History</button>
      {translationsList}
    </div>
  );
};

export default ASLHistory;
