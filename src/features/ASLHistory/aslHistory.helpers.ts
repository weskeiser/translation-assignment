import { IUser } from "global/types";

export const makeNewHistory = (user: IUser, addition: string) => {
  const { translations } = user;

  const exists = translations.findIndex((entry) => entry === addition);
  if (exists >= 0) return translations;

  const historyLength = translations.unshift(addition);
  if (historyLength > 10) translations.pop();

  return translations;
};
