# RS School REST service
A Nest.js project

## Load Tests:
### Express
|                      |                              |                               |
|----------------------|------------------------------|-------------------------------|
| Scenarios            | [launched, completed]        | 4123, 4119                    |
| Requests             | [completed]                  | 20603                         |
| Mean                 | [response/sec]               | 106.63                        |
| Response time (msec) | [min, max, median, p95, p99] | 2, 9726, 12, 8167.3, 9643.5   |
| Scenario counts      | [users]                      | 4123 (100%)                   |
| Codes                | [200, 201]                   | 16482, 4121                   |
| Errors               | [ETIMEDOUT]                  | 4                             |

### Fastify
|                      |                              |                               |
|----------------------|------------------------------|-------------------------------|
| Scenarios            | [launched, completed]        | 4107, 4103                    |
| Requests             | [completed]                  | 20525                         |
| Mean                 | [response/sec]               | 106.09                        |
| Response time (msec) | [min, max, median, p95, p99] | 2, 10000, 12, 8293.3, 9902    |
| Scenario counts      | [users]                      | 4107 (100%)                   |
| Codes                | [200, 201]                   | 16419, 4106                   |
| Errors               | [ETIMEDOUT]                  | 4                             |

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Running Docker

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Build images:
```
docker-compose up
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
