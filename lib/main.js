var tabs = require('tabs');
var self = require('self');
var pageWorkers = require('page-worker');

exports.main = function(options, callbacks) {
  console.log('start');
  var wsWorker = pageWorkers.Page({
    contentUrl: 'about:blank',
    contentScriptFile: self.data.url('worker.js')
  });
  wsWorker.on('message', function(msg) {
    console.log('func:', msg.func, 'args:', JSON.stringify(msg.args));
    if (msg.func === 'attach') {
      tabs.activeTab.attach(msg.args);
    }
  });
}

exports.onUnload = function(reason) {
  console.log('end');
}
