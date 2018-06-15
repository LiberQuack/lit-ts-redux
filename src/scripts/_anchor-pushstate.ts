//TODO: Move this to a standalone project

document.addEventListener("click", (e) => {

    let element;

    if ((e as any).composed) {
        element = (e as any).composedPath().find((it: Element) => it.tagName === "A");
    } else {
        element = e.target as Element;
    }


    if (element && element.tagName === "A") {
        if (e.ctrlKey || e.metaKey || e.which === 2 || e.which === 3) {
            return;
        }

        let href = element.getAttribute('href');
        if (!href) return;

        // don't pushState if the URL is for a different host
        if (href.indexOf('http') === 0 && window.location.host !== new URL(href).host) {
            return;
        }

        let state = window.history.state || {};

        // push state into the history stack
        window.history.pushState(state, null, href);

        // dispatch a popstate event
        try {
            window.dispatchEvent(new PopStateEvent('popstate', {
                bubbles: false,
                cancelable: false,
                state
            }));
        } catch(error) {
            let evt = document.createEvent('CustomEvent');
            evt.initCustomEvent('popstate', false, false, { state });
            (evt as any).state = state;
            window.dispatchEvent(evt);
        }

        e.preventDefault();
    }
});