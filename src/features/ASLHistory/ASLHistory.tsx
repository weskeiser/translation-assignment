import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { addToHistory, fetchHistory, selectHistory } from "./aslHistory.redux";

const ASLHistory = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(fetchHistory());
  };

  //@ts-ignore
  const { entities } = useAppSelector(selectHistory);
  console.log(entities);

  const history = useAppSelector(selectHistory);
  console.log(history);
  // console.log(selectHistory("fetchHistory"));

  const historyList = () => {
    if (!history) return null;

    return (
      <ul>
        {(history as string[]).map((item: any) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    );
  };

  const addToAslHistory = () => {
    const addition = "zzlkjdsf8d7fajlk";

    dispatch(addToHistory(addition));
  };

  return (
    <div>
      <button onClick={handleClick}>aslHistory</button>
      <button onClick={addToAslHistory}>Add To History</button>
      {historyList()}
    </div>
  );
};

export default ASLHistory;
