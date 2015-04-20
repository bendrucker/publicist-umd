'use strict'

import merge from 'deepmerge'
import array from 'ensure-array'
import {resolve} from 'path'
import {createWriteStream as writeStream} from 'fs'
import toPromise from 'stream-to-promise'
import browserify from 'browserify'

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
  return toPromise(b.bundle().pipe(writeStream(resolve(config.dest, config.filename))))
}
