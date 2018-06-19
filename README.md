# LitElement project boilerplate
Project created using LitElement, Typescript and Redux - [Demo](https://quackmartins.github.io/lit-ts-redux)

*Consider starring the repo if it's helpful, That's the way I know you like it*

This project comes with:
  - Router implementation with lazy loading
  - PageElement with simple transition
  - Redux Implementation
  - Form handler helper
  - Polyfills for older browsers
  - Bundle analyzer
  - E2E Testing solution with [cypress](https://www.cypress.io)

## Run The Project
Execute the commands bellow to run the app, I personally prefer to use [WebStorm](https://www.jetbrains.com/webstorm) for developing, but [VSCode](https://code.visualstudio.com/) (with [lit-html plugin](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)) could be used as well. Also I recommend using bash as the terminal 
```bash
npm install -g yarn
yarn install
yarn start
```

## Npm Scripts
|**npm script**   |**description**                                                  |
|-----------------|-----------------------------------------------------------------|
|start            | Start and serve the app                                         |
|dist             | Bundle and optimize                                             |
|dist:github      | Bundle and optimize app using `github.env`                      |
|gh-pages         | Bundle and optimize... then commit `/dist` to `gh-pages` branch |
|test             | Run tests                                                       |
|test:headless    | Run tests (headless)                                            |

## Environment
[dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) was used for managing the environment, files are under `src/scripts/enviroment`

|**Files**        |**Description**                                                                            |
|-----------------|-------------------------------------------------------------------------------------------|
|settings.ts      |Exposes environment settings to the app                                                    |
|local.env        |Variables in this file are used in app through `process.env.<VARIABLE>` (loaded by default)|
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
