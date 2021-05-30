import transferCreationDate from 'js/utils/transferCreationDate';

const content = ({ title, channelTitle, channelId, publishTime }, element) => `
  <div class="content-container pt-2 px-1">
    <h3>${title}</h3>
    <div>
      <a
        href="https://www.youtube.com/channel/${channelId}"
        target="_blank"
        rel="noopener"
        class="channel-name mt-1"
      >
        ${channelTitle}
      </a>
      <div class="meta">
        <p>${transferCreationDate(publishTime)}</p>
      </div>
      ${element()}
    </div>
  </div>`;

export default content;
