var tabs = require('tabs');
var self = require('self');
var pageWorkers = require('page-worker');
var widgets = require('widget');
var widget;

exports.main = function(options, callbacks) {
  console.log('start');
  var verified = false;
  var wsWorker = pageWorkers.Page({
    contentUrl: 'about:blank',
    contentScriptFile: self.data.url('worker.js')
  });
  wsWorker.on('message', function(msg) {
    console.log('func:', msg.func, 'args:', JSON.stringify(msg.args));
    if (msg.func === 'verified') {
      console.log('verified');
      verified = true;
    } else if (msg.func === 'attach') {
      tabs.activeTab.attach(msg.args);
    }
  });

  widget = widgets.Widget({
    id: 'obake',
    label: 'Obake',
    contentURL: self.data.url('favicon.png'),
    onClick: function() {
      console.log('verified:' + verified);
      tabs.activeTab.attach({
        contentScript: '(function() {' +
          'var prevTitle = document.title;' +
          '  document.title = "verified:' + verified + '";' +
          '  setTimeout(function() {' +
          '    document.title = prevTitle;' +
          '  }, 300);' +
          '})();'
      });
    }
  });
}

exports.onUnload = function(reason) {
  console.log('end');
  widget.destroy();
}
