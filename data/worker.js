var ws = new WebSocket('ws://localhost:8080/slave');
ws.onmessage = function(event) {
  var msg = JSON.parse(event.data);
  self.postMessage(msg);
}
