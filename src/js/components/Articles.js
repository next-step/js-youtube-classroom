export function Articles($el) {

    const render = () => {
        $el.innerHTML = `
            <main class="mt-10">
                <section class="video-wrapper">
                    <article class="clip">
                        <div class="preview-container">
                            <iframe
                                width="100%"
                                height="118"
                                src="https://www.youtube.com/embed/Ngj3498Tm_0"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div class="content-container pt-2 px-1">
                            <h3>아두이노 무드등</h3>
                            <div>
                                <a
                                    href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
                                    target="_blank"
                                    class="channel-name mt-1"
                                >
                                    메이커준
                                </a>
                                <div class="meta">
                                    <p>2021년 3월 2일</p>
                                </div>
                                <div>
                                    <span class="opacity-hover">✅</span>
                                    <span class="opacity-hover">👍</span>
                                    <span class="opacity-hover">💬</span>
                                    <span class="opacity-hover">🗑️</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        `;
    };

    render();
}
