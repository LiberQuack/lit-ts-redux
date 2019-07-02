export const loadState = () => {
    try {
        return localStorage.state && JSON.parse(localStorage.state);
    } catch (e) {
        console.warn("Could not load redux state from localStorage", e);
    }
};

export const saveState = (state) => {
    try {
        localStorage.state = JSON.stringify(state);
    } catch (e) {
        console.warn("Problem while saving redux state to localStorage", e);
    }
};