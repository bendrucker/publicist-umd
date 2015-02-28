'use strict';

import {writeStream} from 'fs';
import browserify from 'browserify';

export default function umd (pack) {
  const release = `./release/umd/${pack.get('name')}.js`;
  return new Promise(function (resolve, reject) {
    browserify({
      standalone: pack.get('name')
    })
    .add(pack.get('main'))
    .bundle()
    .pipe(writeStream(release))
    .on('error', reject)
    .on('close', resolve);
  })
  .return(release);
}
