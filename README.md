# generator-eslint [![Build Status](https://secure.travis-ci.org/eslint/generator-eslint.png?branch=master)](https://travis-ci.org/eslint/generator-eslint)

The ESLint generator for [Yeoman](http://yeoman.io). This generator is intended to aid development within the [ESLint](http://eslint.org) project. It is designed to work within the top-level `eslint` directory.


## Installation

First and foremost, you must have [Node.js](http://nodejs.org) and npm installed. If you don't have Node.js installed, please download and install the latest version.

With Node.js installed, you can run this command:

```
npm i -g generator-eslint
```

## Usage

The Yeoman generator currently supports the following commands:

### eslint:plugin

If you want to create a new ESLint plugin, make sure you're in the top-level directory where you want the plugin to be created and type:

```
$ yo eslint:plugin
```

You'll be prompted for information about your plugin and it will generate a `package.json` file, README, and source code for a stub plugin.

### eslint:rule

If you want to create a new ESLint rule, make sure you're in the top-level directory of an ESLint repo clone or an ESLint plugin and type:

```
$ yo eslint:rule
```

You'll be prompted for some information and then it will generate the files necessary for a new rule, including the source file, a test file, and a documentation file.

## License and Copyright

Copyright 2014-2015 Nicholas C. Zakas. All rights reserved.

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
