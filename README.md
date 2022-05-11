
# Klaxoon API

API for retrieve and add bookmark with **Vimeo** and **Flickr** url.

---
## Requirements

Install *NodeJs v14.17.6* or latest on your computer.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.17.6

    $ npm --version
    6.14.15

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/arthurj972/klaxoon-api
    $ cd klaxoon-api
    $ npm install

## Configure app

Open `.env` file then edit it with your settings. 

The following files are important:
- `app.ts` is the global app.
- `server.ts` just launch the API.
- `package.json`
- `db/config.ts`
- `routes/bookmark.route.ts` for routes.
- `controllers/bookmark.controller.ts` for route controllers.
- `dist/` is automatically created folder for `.js` compile.

## Running the project in development

Maybe you have to run with **sudo** if you don't have file permission. 

The following command auto-compile the code with *TSLint parser*.

    $ npm run dev

## Build for production

Maybe you have to run with **sudo** if you don't have file permission. 

    $ npm run build
    $ npm run start

---

## Postman Collection

You can access to Postman Collection for test API manually.

Get here:
https://www.getpostman.com/collections/47d4bfe882b992500887

You must open Postman app and go to Import and choose "Link"
![Exemple d'importation](https://live.staticflickr.com/65535/52051024902_5e7b911ff3_b.jpg)


## Unit test

You can run unit tests with:

	$ npm run test

This command calling all files on `test/unit` directory like `bookmark.controller.test.ts`.


## ESLint & Prettier

You can run ESLint with:

	$ npm run lint

This command automatically fix errors on files with Prettier.