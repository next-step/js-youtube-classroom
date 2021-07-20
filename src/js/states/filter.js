export const filter = {
    value: 'toWatch',

    get() {
        return this.value;
    },

    set(newFilter = '') {
        this.value = newFilter;
    },
};
