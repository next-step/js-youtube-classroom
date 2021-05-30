const MAX_RESULT = 10;
const PART = "snippet";

let lastPage = "";
const getAPI = async (keyword: string) => {
  try {
    const url = lastPage
      ? `${process.env.API_URL}?part=${PART}&maxResults=${MAX_RESULT}&q=${keyword}&key=${process.env.API_KEY}&pageToken=${lastPage}`
      : `${process.env.API_URL}?part=${PART}&maxResults=${MAX_RESULT}&q=${keyword}&key=${process.env.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    lastPage = data.nextPageToken;
    return data.items;
  } catch (error) {
    console.log(error);
  }
};

export default getAPI;
