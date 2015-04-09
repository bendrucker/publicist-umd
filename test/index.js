'use strict';

import assert from 'assert';
import * as umd from '../';
import {Package as Pack} from 'packhorse';
import {sync as rmSync} from 'rimraf';
import {mkdirSync, readFileSync} from 'fs';
import {join} from 'path';
import {runInNewContext as run} from 'vm';

describe('publicist-umd', function () {

  const output = join(__dirname, 'output');

  this.timeout(3000);

  let pack;
  beforeEach(() => {
    mkdirSync(output);
    pack = new Pack('');
  });
  afterEach(() => {
    rmSync(output);
  });

  function assertBuild (name) {
    const code = readFileSync(join(output, `${name}.js`)).toString();
    const window = {};
    run(code, {window});
    assert.equal(window[name], 'foo');
    return code;
  }

  it('builds a umd bundle', () => {
    pack.set('name', 'normal');
    pack.set('main', join(__dirname, 'fixtures/normal.js'));
    return umd.build(pack, umd.defaults(pack, {
      dest: output
    }))
    .return('normal')
    .then(assertBuild);
  });

  it('can set transforms', () => {
    pack.set('name', 'es6');
    pack.set('main', join(__dirname, 'fixtures/es6.js'));
    return umd.build(pack, umd.defaults(pack, {
      dest: output,
      browserify: {
        transform: ['babelify']
      }
    }))
    .return('es6')
    .then(assertBuild)
    .then((code) => {
      assert(code.includes('COMMENT'));
    });
  });

  it('can set transforms with options', () => {
    pack.set('name', 'es6');
    pack.set('main', join(__dirname, 'fixtures/es6.js'));
    return umd.build(pack, umd.defaults(pack, {
      dest: output,
      browserify: {
        transform: [
          ['babelify', {
            comments: false
          }]
        ]
      }
    }))
    .return('es6')
    .then(assertBuild)
    .then((code) => {
      assert(!code.includes('COMMENT'));
    });
  });

});
