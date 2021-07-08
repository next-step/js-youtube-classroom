export const formatDate = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear() || '-';
    const month = d.getMonth() || '-';
    const date = d.getDate() || '-';

    return `${year}년 ${month}월 ${date}일`;
};
