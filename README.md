## What's inside?

This Kurakani includes the following packages/apps:

### Apps and Packages

-   `native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
-   `server`: a [Express.js](https://expressjs.com/) sever
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo
-   `core`: a package for overall indication used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Kurakani has some additional tools already setup for you:

-   [Expo](https://docs.expo.dev/) for native development
-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [Prettier](https://prettier.io) for code formatting
-   [Trpc](https://trpc.io/) for end-to-end typesafe apis
-   [Socket IO](https://socket.io/) for real time communication

# Setting up project

1. Clone the repo (`git clone https://github.com/kurakanii/kurakani.git`)
2. Install dependencies (`yarn`)
3. Get `.env` file from @morphhyy
4. Run web app (`yarn start:native`)
5. Run server (`yarn start:server`)
6. Run both (`yarn dev`)
