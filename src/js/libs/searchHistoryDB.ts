const key = "@my-youtube-class-search-hisotry";

const searchHistoryDB = {
  get: (): string[] => {
    const data = localStorage.getItem(key) ?? "[]";
    return JSON.parse(data);
  },

  set: (nextData: string[]): void => {
    localStorage.setItem(key, JSON.stringify(nextData));
  },
};

export default searchHistoryDB;
