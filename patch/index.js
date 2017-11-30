#!/usr/bin/env node

'use strict';

const debug = require('../lib/log')('[webpack-custom-plugin@patch-index]');

const path = require('path');
const backup = require('../lib/backup');
const restore = require('../lib/restore');

let webpackBaseDir = path.resolve(__dirname, '../../webpack');

const hijackPathList = [
  {
    src: path.resolve(__dirname, 'webpack/lib/MainTemplate'),
    dist: path.resolve(webpackBaseDir, 'lib/MainTemplate.js'),
    md5: '1D7DF7D74D780B8E9DE9355FB255C18E',
    ver: '3.8.1',
  },
];

let action = null;
switch (process.argv[2].slice(2)) {
  case 'backup':
    action = backup;
    break;
  case 'restore':
    action = restore;
    break;
  default:
    debug.log('current only support `backup` or `restore` files.');
    process.exit(1);
    break;
}

Promise.all(hijackPathList.map(action)).then(function() {
  debug.log('execute patch done.');
}).catch(function(e) {
  let err = 'execute patch fail:' + e;
  debug.error(err);
  throw err;
});
