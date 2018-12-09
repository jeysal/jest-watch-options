# jest-watch-options

> A [Jest](https://github.com/facebook/jest/) watch mode plugin to change CLI options while Jest is running.

[![build status](https://img.shields.io/travis/jeysal/jest-watch-options/master.svg?style=flat-square)](https://travis-ci.org/jeysal/jest-watch-options)
[![npm package](https://img.shields.io/npm/v/jest-watch-options.svg?style=flat-square)](https://www.npmjs.com/package/jest-watch-options)
[![license](https://img.shields.io/github/license/jeysal/jest-watch-options.svg?style=flat-square)](https://github.com/jeysal/jest-watch-options/blob/master/LICENSE)

## Installation

Run

```sh
npm install --save-dev jest-watch-options
```

and add the following option to your Jest config:

```
watchPlugins: ['jest-watch-options'],
```

## Usage

While in Jest watch mode, press `-` to open up the options prompt (the first `-` will already be there),
then keep typing the options you want to apply and hit enter to confirm.

Note that Jest only allows select options to be changed at runtime ([documentation](https://jestjs.io/docs/en/watch-plugins#authorized-configuration-keys) & updateConfigAndRun [source code](https://github.com/facebook/jest/blob/master/packages/jest-cli/src/watch.js)).
