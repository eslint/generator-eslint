# generator-eslint ![CI](https://github.com/eslint/generator-eslint/workflows/CI/badge.svg) [![NPM version](https://img.shields.io/npm/v/generator-eslint.svg?style=flat)](https://npmjs.org/package/generator-eslint)

The ESLint generator for [Yeoman](https://yeoman.io/). This generator is intended to aid development within the [ESLint](https://eslint.org/) project. It is designed to work within the top-level `eslint` directory.

## Installation

First and foremost, you must have [Node.js](https://nodejs.org/) and npm installed. If you don't have Node.js installed, please download and install the latest version.

> **Requirements**
>
> - Node.js ^18.18.0 || ^20.9.0 || >=21.1.0

You must also install Yeoman, if you don't have it installed already. To install Yeoman, you can run this command:

```sh
npm i -g yo
```

With Node.js and Yeoman installed, you can run this command:

```sh
npm i -g generator-eslint
```

## Usage

The Yeoman generator currently supports the following commands:

### eslint:plugin

If you want to create a new ESLint plugin, make sure you're in the top-level directory where you want the plugin to be created and type:

```sh
yo eslint:plugin
```

You'll be prompted for information about your plugin and it will generate a `package.json` file, README, and source code for a stub plugin.

### eslint:rule

If you want to create a new ESLint rule, make sure you're in the top-level directory of an ESLint repo clone or an ESLint plugin and type:

```sh
yo eslint:rule
```

You'll be prompted for some information and then it will generate the files necessary for a new rule, including the source file, a test file, and a documentation file.

## License and Copyright

Copyright OpenJS Foundation and other contributors, <www.openjsf.org>

[MIT License](https://en.wikipedia.org/wiki/MIT_License)
