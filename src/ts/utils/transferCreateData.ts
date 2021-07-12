import dateFormMaker from './dateFormMaker';

const SECOND = 1;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const transferCreationDate = (dateFormString: string) => {
  const today = new Date();
  const registerDate = new Date(dateFormString);

  // 초 단위로 댓글을 작성한 시점으로부터의 경과 시간이 담김
  const creationDate = (today.getTime() - registerDate.getTime()) / 1000;

  if (creationDate < 1 * SECOND) return '방금 전';
  if (creationDate < 1 * MINUTE) return `${creationDate}초 전`;
  if (creationDate >= 1 * MINUTE && creationDate < 1 * HOUR) return `${creationDate / MINUTE}분 전`;
  if (creationDate >= 1 * HOUR && creationDate < 24 * HOUR) return `${creationDate / HOUR}시간 전`;
  if (creationDate >= 24 * HOUR && creationDate < 8 * DAY) {
    return `${Math.round(creationDate / DAY)}일 전`;
  }
  return dateFormMaker(dateFormString);
};

export default transferCreationDate;
