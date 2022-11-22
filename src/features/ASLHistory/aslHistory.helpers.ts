import { User } from "global/interfaces";

export const makeNewHistory = (user: User, addition: string) => {
  const { translations } = user;

  const exists = translations.findIndex((entry) => entry === addition);
  if (exists >= 0) return translations;

  const historyLength = translations.unshift(addition);
  if (historyLength > 10) translations.pop();

  return translations;
};
