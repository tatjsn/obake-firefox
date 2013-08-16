var tabs = require('tabs');
var self = require('self');
var pageWorkers = require('page-worker');

exports.main = function(options, callbacks) {
  console.log('start');
  var wsWorker = pageWorkers.Page({
    contentUrl: 'about:blank',
    contentScriptFile: self.data.url('worker.js')
  });
  wsWorker.on('message', function(m) {
    console.log(m);
    // tabs.activeTab.url = cmd;
  });
}

exports.onUnload = function(reason) {
  console.log('end');
}
