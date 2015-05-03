# publicist-umd [![Build Status](https://travis-ci.org/bendrucker/publicist-umd.svg?branch=master)](https://travis-ci.org/bendrucker/publicist-umd)

UMD build task for [publicist](https://github.com/bendrucker/publicist). Uses Browserify to generate a standalone bundle so people who don't use Node/Browserify can consume your library. 

## Installing

```sh
npm install --save-dev publicist-umd
```

## API

See the [publicist plugin docs](https://github.com/bendrucker/publicist#plugins) for full details on how publicist-umd will be called.

##### Configuration

publicist-umd loads the following default configuration which you can selectively override via publicist:

* `name`: Passed to browserify's `opts.standalone` to create the global namespace. Defaults to the `name` field from `package.json`
* `filename`: The filename of the generated JavaScript file. Defaults to the `name` with a `.js` extension.
* `browserify`
  * `transform`: An array of transforms to be registered with browserify. Normally you should store these under the `browserify.transform` field in `package.json` directly. Configuring transforms through publicist should be reserved for when your UMD build requires transforms that shouldn't run with normal browserify usage.

##### Build

Creates a standalone UMD build and writes it to the specified `dest` from your configuration.
