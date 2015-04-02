'use strict';

import assert from 'assert';
import umd from '../';
import {Package as Pack} from 'packhorse';
import {sync as rmSync} from 'rimraf';
import {mkdirSync, readFileSync} from 'fs';
import {join} from 'path';
import {runInNewContext as run} from 'vm';

describe('publicist-umd', () => {

  const output = join(__dirname, 'output');
  console.log(output);

  let pack;
  beforeEach(() => {
    mkdirSync(output);
    pack = new Pack('');
  });
  afterEach(() => {
    rmSync(output);
  });

  it('builds a umd bundle', () => {
    pack.set('name', 'normal');
    pack.set('main', join(__dirname, 'fixtures/normal.js'));
    return umd(pack, {
      destination: output
    })
    .then(() => {
      return readFileSync(join(output, 'normal.js'));
    })
    .call('toString')
    .then((code) => {
      const window = {};
      run(code, {window});
      assert.equal(window.normal, 'foo');
    });
  });

});
