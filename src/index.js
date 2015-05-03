'use strict'

import merge from 'deepmerge'
import array from 'ensure-array'
import {resolve} from 'path'
import browserify from 'browserify'
import Promise from 'bluebird'
import outputFile from 'output-file'

const writeFile = Promise.promisify(outputFile)
Promise.promisifyAll(browserify.prototype)

export function defaults (pack, config) {
  return merge({
    name: pack.get('name'),
    filename: `${pack.get('name')}.js`,
    browserify: {
      transform: []
    }
  }, config)
}

export function build (pack, config) {
  const b = browserify({
    standalone: config.name
  })
  .add(pack.get('main'))
  config.browserify.transform
    .map(t => array(t))
    .forEach(t => b.transform.apply(b, t))
  return b.bundleAsync()
    .then((code) => {
      return writeFile(resolve(config.dest, config.filename), code)
    })
}
