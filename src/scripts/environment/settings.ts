const baseurl = process.env.BASE_URL;

export const settings = {
    app: {
        routes: {
            root: `${baseurl}/`,
            about: `${baseurl}/about`,
            tickets: `${baseurl}/tickets`,
        }
    }
};
