'use strict';

var assert   = require('assert');
var resource = require('./resource');

module.exports = resource.create('Company', {
  api: 'company',
  path: '/companies/domain/<%= domain %>'
})
.on('preFind', function (options) {
  assert(options.domain, 'A domain must be provided');
}).include({
  flag: function(params, options){
    return this.client.request(_.extend({
      api: this._options.api,
      method: 'post',
      path: _.template('/people/<%= id %>/flag', this),
      query: params || {}
    }, options));
  }
});
