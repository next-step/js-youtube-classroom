import { ItemDB } from "@/types/index";

const parseVideoData = (videoDatas: ItemDB[]): Set<string> => {
  const parsedData = videoDatas.map((videoInfo) => videoInfo.data.id);
  return new Set(parsedData);
};

export default parseVideoData;
