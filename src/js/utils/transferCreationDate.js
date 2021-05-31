import dateFormMaker from 'js/utils/dateFormMaker';

const transferCreationDate = date => {
  const today = new Date();
  const registerDate = new Date(date);

  // 초 단위로 댓글을 작성한 시점으로부터의 경과 시간이 담김
  const creationDate = Number.parseInt((today.getTime() - registerDate.getTime()) / 1000);

  if (creationDate < 1) return '방금 전';
  if (creationDate < 60) return `${creationDate}초 전`;
  if (creationDate >= 60 && creationDate < 3600) return `${parseInt(creationDate / 60)}분 전`;
  if (creationDate >= 3600 && creationDate < 3600 * 24) return `${parseInt(creationDate / 3600)}시간 전`;
  if (creationDate >= 3600 * 24 && creationDate < 691200) {
    return `${Math.round(creationDate / 60 / 60 / 24)}일 전`;
  }
  return dateFormMaker(date);
};

export default transferCreationDate;
