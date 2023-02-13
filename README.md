# Passport.ts Starter

The main purpose of this repository is to demonstrate local and oauth authentication systems using **@passport** and workflow for writing Node.js code in TypeScript.

## Get Started

### Installation

```bash
$ git clone https://github.com/febriadj/passportts-starter.git
```

Clone and open this repository in your IDE or text editor.

```bash
$ mv .env.example .env
```

Rename the `.env.example` file to `.env` and complete the required "environment variables".

```bash
$ npm install
```

```bash
$ npm start
```

See more commands in `package.json`.

### Config

```ts
// ./src/config.ts
const config: Readonly<IConfig> = {
  isProd: process.env.NODE_ENV === 'production',
  port: 8080,
  cors: {
    origin: ['http://localhost:3000'],
  },
  // ...
};
```

Set up the server basic configuration in `./src/config.ts` file.

### Reset Git History

```bash
$ rm -rf .git/ && rm -rf .husky/
```

Remove `.git/` and `.husky/` folders before reinitializing.

```bash
$ git init && npx husky install
```

```bash
$ npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'
```

Reinitialize **Git** and **@husky**.

[(Back to top)](#passportts-starter)
