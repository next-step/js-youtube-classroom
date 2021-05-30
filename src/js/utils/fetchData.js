const fetchData = (node, datas, getTemplate) => {
  node.innerHTML = datas.map(data => getTemplate(data)).join('');
};

export default fetchData;
