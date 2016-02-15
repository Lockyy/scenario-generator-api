import React from 'react';
import _ from 'lodash';

const ImageMixin = {
  getRightImageUrl: function (urls, typeSize) {
    const typeSizeBase = 'original';
    const urlMap =  _.find(urls, function(url) { return url.type_size == typeSize; });
    if(!urlMap && typeSize != typeSizeBase){
      return this.getRightImageUrl(urls, typeSizeBase);
    }
    return urlMap.url;
  }
};

export default ImageMixin;
