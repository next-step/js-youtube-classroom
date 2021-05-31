import { APIResult } from "@/types/index";
import { MAX_DATA_NUMBER } from "@/constants/index";
import parseAPIData from "@/utils/parseAPIData";

const getAPI = async (
  keyword: string,
  lastKey: string
): Promise<APIResult | void> => {
  try {
    const url = `${process.env.API_URL}?part=snippet&maxResults=${MAX_DATA_NUMBER}&q=${keyword}&key=${process.env.API_KEY}&pageToken=${lastKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const nextPage = data.nextPageToken;
    const dataSize = data.pageInfo.totalResults;
    return {
      datas: parseAPIData(data.items),
      lastKey: nextPage,
      size: dataSize,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getAPI;
