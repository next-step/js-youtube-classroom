import { RawItem, Item } from "@/types/index";

const parseAPIData = (items: RawItem[]): Item[] => {
  const parsedData = items.map((item) => {
    return { id: item.id.videoId, snippet: item.snippet };
  });
  return parsedData;
};

export default parseAPIData;
