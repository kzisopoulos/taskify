# Taskify

This is an Angular v17 application, its purpose is academical as I want to put together an application with simple business logic from A-Z.

In this application the stack is:

Frontend: Angular v17, TailwindCSS
Backend: ExpressJS, Prisma ORM, Zod
DB: LibSQL/Turso

The complete uploaded application can be found at: [taskify](www.google.com)

## Development server

In order to run this application locally , you must checkout the backend application aswell.

You can check it out and find info on how to setup it [taskify-backend](https://github.com/kzisopoulos/taskify-backend)
Also you need to create

1. Inside `src/environments` create `environment.development.ts` with
   ```
   export const environment = {
   	production: false,
   	apiUrl: 'http://localhost:3001/api',
   };
   ```
2. Inside `src` folder create `proxy.config.ts` configuration file with

   ```
   {
      "/api": {
         "target": "http://localhost:3001",
         "secure": false
      }
   }
   ```

- Instead of localhost:3001 you can use your own api url. <br>
- `environment.ts` will server as the default for when you are building

## Production deployment

If you wish to deploy your own version of this app , you should firstly deploy the backend, then change all your urls to point at it and then you will most probably want to remove `proxy.config.ts` and also remove it from `angular.json` under `serve > options > proxyConfig`.
And then deploy the frontend aswell.

Happy coding.
