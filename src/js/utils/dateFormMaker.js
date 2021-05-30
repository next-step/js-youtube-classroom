const dateFormMaker = dateFormString => {
  const dateObj = new Date(dateFormString);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const dateForm = `${year}년 ${month}월 ${date}일`;

  return dateForm;
};

export default dateFormMaker;
