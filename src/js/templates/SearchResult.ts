const videoArticle = (data: unknown) => `
<article class="clip">
 <div class="preview-container">
    <iframe
    width="100%"
    height="118"
    src="https://www.youtube.com/embed/Ngj3498Tm_0"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    ></iframe>
 </div>
 <div class="content-container pt-2 px-1">
    <h3>아두이노 무드등</h3>
        <div>
            <a href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
             target="_blank"
              class="channel-name mt-1"
             >
                메이커준
            </a>
            <div class="meta">
                <p>2021년 3월 2일</p>
            </div>
            <div class="d-flex justify-end">
                <button class="btn">⬇️ 저장</button>
            </div>
        </div>
    </div>
</article>
`;

const template = (storedVideoCount: number, datas: unknown[]) => {
  const videoCount = `
    <div class="d-flex justify-end text-gray-700">
    저장된 영상 갯수: ${storedVideoCount} 개
    </div>`;

  const list = `
        <section class="video-wrapper">
        ${datas.map((data) => videoArticle(data)).join("")}
        </section>
    `;

  return `${videoCount}${list}`;
};

export default template;
