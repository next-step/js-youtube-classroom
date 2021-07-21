let routeRootComponent;

export default {
    PATH: {
        TO_WATCH: '/to-watch',
        WATCHED: '/watched',
        LIKED: '/liked',
    },

    registerRootComponent: (rootComponent) => {
        routeRootComponent = rootComponent;

        window.onpopstate = () => {
            routeRootComponent.changeRoute({routePath: document.location.pathname});
        };
    },

    push: ({routePath}) => {
        window.history.pushState(null, null, routePath);
        routeRootComponent.changeRoute({routePath});
    },

    back: () => {
        window.history.back();
    },
};
