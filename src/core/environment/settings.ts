const baseurl = "/";
const envName = process.env.NAME;

export const settings = {
    app: {
        routes: {
            root: `/`,
            about: `/about`,
            tickets: `/tickets`,
            bundle: `/report.html`,
        }
    },
    environmentName: envName,
};
