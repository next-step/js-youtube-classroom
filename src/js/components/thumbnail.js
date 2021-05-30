const thumbnail = videoId => `
  <div class="preview-container">
    <iframe
    width="100%"
    height="118"
    src="https://www.youtube.com/embed/${videoId}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    ></iframe>
  </div>`;
export default thumbnail;
