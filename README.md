# Appik

This library looks towards a good front-end architecture where we do not use components for everything, 
despite they are great we prefer to divide the front-end in:

 - **Router** is kept away from components (eg: `<Router path="/home">`), we don't think it's a UI responsability. See the [example](#Router)
 - **Resources** these are the things you share via `app.set("resource-name", {foo: "bar"})` and `app.get("resource-name")`
 - **Application** is the combination of the last two topics

## Router

```typescript
const router = new Appik.Router();

router.route("home", "/", ({app, routeContext}) => {
    app.set("message", "Welcome")
});
```

## Inspector

```typescript
import {openAppInspector} from "appik/appik-inspector";
import {app} from "./index.ts"


if (process.env.NODE_ENV === "development") {
    openAppInspector();
}
```

By running this code a popup will be opened with our app inspecting 
tool, be sure to remove it in your production build 

---

*Consider starring the repo if it's helpful, That's the way I know you like it*

This project comes with:
  - _router implementation with lazy loading
  - Page implementation with transition
  - Redux Implementation
  - Form handler helper
  - Polyfills for older browsers
  - Offline support
  - Bundle analyzer [report-html](https://quackmartins.github.io/lit-ts-redux/report.htlm)
  - E2E Testing solution with [cypress](https://www.cypress.io)

## Run The Project
Execute the commands bellow to run the application, I personally prefer to use [WebStorm](https://www.jetbrains.com/webstorm) for developing, but [VSCode](https://code.visualstudio.com/) (with [lit-html plugin](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)) could be used as well. Also I recommend using bash as the terminal 
```bash
npm install -g yarn
yarn install
yarn start
```

## Npm Scripts
|**npm script**               |**description**                                                  |
|-----------------------------|-----------------------------------------------------------------|
|npm run **start**            | Start and serve the application                                         |
|npm run **dist**             | Bundle and optimize                                             |
|npm run **dist:github**      | Bundle and optimize application using `github.env`                      |
|npm run **gh-pages**         | Bundle and optimize... then commit `/dist` to `gh-pages` branch |
|npm run **test**             | Run tests                                                       |
|npm run **test:headless**    | Run tests (headless)                                            |

## Environment
[dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) was used for managing the environment, files are under `src/scripts/enviroment`

|**Files**        |**Description**                                                                            |
|-----------------|-------------------------------------------------------------------------------------------|
|settings.ts      |Exposes environment settings to the application                                                    |
|local.env        |Variables in this file are used in application through `process.env.<VARIABLE>` (loaded by default)|
|*.env            |To load other `<file>.env` instead of `local.env` set `ENVIRONMENT=<file>`                 |

*Note: It's possible to use system variables, even if it is not present in `*.env` files*

## Docker (TODO)

Build and run docker image by executing:

```bash
docker image build -t polymer-project --build-arg ENVIRONMENT=local .
docker container run -it 80:80 polymer-project
```

## Testing (TODO)
Files are under `src/ui-tests`, they are written with [testcafe](https://github.com/DevExpress/testcafe) which works like selenium, but don't need to install additional drivers,
also we mock our api by using [shmock](https://github.com/xetorthio/shmock)

Locally run

    npm run test:live

Or run docker-compose-test.yml

    docker-compose -f docker-compose-test.yml down && docker-compose -f docker-compose-test.yml up --abort-on-container-exit --build -t 30
