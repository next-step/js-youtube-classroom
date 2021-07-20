const requestOptions = {
  method: 'GET',
  redirect: 'follow',
};

fetch(
  'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResult=25&q=제로투&key=AIzaSyABFRQDgFVJQNXJnQ62bsVIDkA0q0wiutE',
  requestOptions
)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
