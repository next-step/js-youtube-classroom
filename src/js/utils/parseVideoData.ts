import { ItemDB } from "@/types/index";

const parseVideoData = (videoDatas: ItemDB[]): string[] => {
  const parsedData = videoDatas.map((videoInfo) => videoInfo.data.id);
  return parsedData;
};

export default parseVideoData;
