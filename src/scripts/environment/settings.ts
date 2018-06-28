//Removes the last "/" from baseUrl
const baseurl = process.env.BASE_URL.replace(/\/$/, "");
const envName = process.env.NAME;

export const settings = {
    app: {
        routes: {
            root: `${baseurl}/`,
            about: `${baseurl}/about`,
            tickets: `${baseurl}/tickets`,
            bundle: `${baseurl}/report.html`,
        }
    },
    environmentName: envName,
};