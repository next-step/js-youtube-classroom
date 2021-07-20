export const saveButtonTemplate = () => {
    return `<button class="btn save-button">⬇️ 저장</button>`;
};

export const saveCancelButtonTemplate = () => {
    return `<button class="btn save-cancel-button">↪️ 저장 취소</button>`;
};

export const hoverWatchButtonTemplate = () => {
    return `<span id="watched" class="opacity-hover ml-2 js-watched-button">✅</span>`;
};

export const watchedButtonTemplate = () => {
    return `<span id="watched" class="false ml-2 js-watched-button">✅</span>`;
};

export const hoverLikeButtonTemplate = () => {
    return `<span id="liked" class="opacity-hover ml-2 js-liked-button">👍🏻</span>`;
};

export const likedButtonTemplate = () => {
    return `<span id="liked" class="false ml-2 js-liked-button">👍🏻</span>`;
};
