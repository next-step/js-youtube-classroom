import { ItemDB, Filter } from "@/types/index";
const key = "@my-youtube-class-stored-videos";

const videoDB = {
  get: (): ItemDB[] => {
    const data = localStorage.getItem(key) ?? "[]";
    return JSON.parse(data);
  },

  add: (newData: ItemDB): ItemDB[] => {
    const prev = videoDB.get();
    const nextData = [...prev, newData];
    localStorage.setItem(key, JSON.stringify(nextData));
    return nextData;
  },

  updateFilter: (id: string, filter: Filter): ItemDB[] => {
    const nextData = videoDB.get().map((video) => {
      if (video.data.id === id) {
        return { ...video, filter: filter };
      }
      return video;
    });
    localStorage.setItem(key, JSON.stringify(nextData));
    return nextData;
  },
  toggleLike: (id: string): ItemDB[] => {
    const nextData = videoDB.get().map((video) => {
      if (video.data.id === id) {
        return { ...video, liked: !video.liked };
      }
      return video;
    });
    localStorage.setItem(key, JSON.stringify(nextData));
    return nextData;
  },
  toggleWatch: (id: string): ItemDB[] => {
    const nextData = videoDB.get().map((video) => {
      if (video.data.id === id) {
        return { ...video, watched: !video.watched };
      }
      return video;
    });
    localStorage.setItem(key, JSON.stringify(nextData));
    return nextData;
  },
  remove: (id: string): ItemDB[] => {
    const nextData = videoDB.get().filter((video) => video.data.id !== id);
    localStorage.setItem(key, JSON.stringify(nextData));
    return nextData;
  },
};

export default videoDB;
