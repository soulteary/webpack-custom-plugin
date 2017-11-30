'use strict';

const debug = require('./log')('[webpack-custom-plugin@update-package]');
const fs = require('story-fs');

module.exports = function(source, dist, enable) {
  return fs.readJSON(source).then(function(sourceContent) {
    return fs.readJSON(dist).then(function(distContent) {
      let result = distContent;
      if (enable) {
        if (result.hexo) {
          result.hexoOrigin = result.hexo;
          //todo check version is match
          result.hexo = sourceContent.hexo;
        }
        result.hexoExtendFeature = sourceContent.hexoExtendFeature;
        result.hexoPlugin = sourceContent.hexoPlugin;
      } else {
        if (result.hexoOrigin) {
          result.hexo = result.hexoOrigin;
          delete result.hexoOrigin;
        }
        if (result.hexoExtendFeature) {
          delete result.hexoExtendFeature;
        }
      }
      debug.log('update dist source:', result);
      return result;
    }).catch(function(e) {
      throw e;
    });
  }).then(function(content) {
    return fs.writeJSON(dist, content, {spaces: 2, replacer: null}, false);
  }).catch(function(e) {
    throw e;
  });
};
