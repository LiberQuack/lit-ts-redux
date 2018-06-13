# LitElement project boilerplate

Project created using LitElement, Typescript and Redux

**PR are welcome**
*Consider starring the repo if it's helpful, That's the way I know you like it*

## Npm Scripts (TODO: channge containers.env)
|**npm script**   |**description**                                                   |
|-----------------|------------------------------------------------------------------|
|start            | Start and serve the app                                          |
|start:containers | Start and serve the app using `containers.env`                   |
|dist             | Bundle and optimize                                              |
|dist:containers  | Bundle and optimize app using `containers.env`                   |
|gh-pages         | Buandle and optmize... then commit `/dist` to `gh-pages` branch  |
|test             | Run tests                                                        |
|test:live        | Run tests with file watch                                        |
|test:compose     | Used in docker-compose-test.yml                                  |

## Environment
[dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) was used for managing the environment, files are under `src/scripts/_enviroment`

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
