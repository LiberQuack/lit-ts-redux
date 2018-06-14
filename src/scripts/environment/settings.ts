//Removes the last "/" from baseUrl
const baseurl = process.env.BASE_URL.replace(/\/$/, "");

export const settings = {
    app: {
        routes: {
            root: `${baseurl}/`,
            about: `${baseurl}/about`,
            tickets: `${baseurl}/tickets`,
        }
    }
};
