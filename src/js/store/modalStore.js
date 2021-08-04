let subscribeStoreCallbackFunctions = [];

const subscribeStore = (callbackFunction) => {
    subscribeStoreCallbackFunctions.push(callbackFunction);
};

const _notify = () => {
    subscribeStoreCallbackFunctions.forEach(fn => fn());
};

const state = {
    isShowModal: false,
};

const setState = ({isShowModal}) => {
    state.isShowModal = isShowModal ?? state.isShowModal;
    _notify();
};

const showModal = () => {
    setState({isShowModal: true});
};

const closeModal = () => {
    setState({isShowModal: false});
};

const getIsShowModal = () => {
    return state.isShowModal;
};

export default {
    subscribeStore,
    getIsShowModal,
    showModal,
    closeModal,
};
