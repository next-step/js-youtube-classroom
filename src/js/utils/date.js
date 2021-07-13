export const dateToLocaleString = dateText => {
    const date = new Date(dateText);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
