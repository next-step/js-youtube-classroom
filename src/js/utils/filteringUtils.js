export const filterDataById = (datas, targetId) =>
  datas.filter(({ id: { videoId } }) => videoId !== targetId);

export const filterId = (datas, targetId) =>
  datas.filter(id => id !== targetId);
