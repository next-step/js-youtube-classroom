const key = "@my-youtube-class-search-hisotry";

const searchHistoryDB = {
  get: () => {
    const data = localStorage.getItem(key) ?? "[]";
    return JSON.parse(data);
  },

  set: (keyword: string) => {
    const prev = searchHistoryDB.get();
    const nextData = [...new Set([keyword, ...prev.slice(0, 2)])];
    localStorage.setItem(key, JSON.stringify(nextData));
  },
};

export default searchHistoryDB;
