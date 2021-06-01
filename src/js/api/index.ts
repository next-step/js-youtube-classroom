import { APIResult } from "@/types/index";
import { MAX_DATA_NUMBER, SERVER_ERROR_MESSAGE } from "@/constants/index";
import parseAPIData from "@/utils/parseAPIData";

const getAPI = async (
  keyword: string,
  lastKey: string
): Promise<APIResult | void> => {
  try {
    const url = `${process.env.API_URL}?part=snippet&maxResults=${MAX_DATA_NUMBER}&q=${keyword}&key=${process.env.API_KEY}&pageToken=${lastKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw SERVER_ERROR_MESSAGE;
    }
    const data = await response.json();
    const nextPage = data.nextPageToken;
    const dataSize = data.pageInfo.totalResults;
    return {
      datas: parseAPIData(data.items),
      lastKey: nextPage,
      size: dataSize,
    };
  } catch (error) {
    throw SERVER_ERROR_MESSAGE;
  }
};

export default getAPI;
