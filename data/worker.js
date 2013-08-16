var ws = new WebSocket('ws://localhost:8080/slave');
ws.onopen = function() {
  ws.send('hello from slave');
}

ws.onmessage = function(e) {
  self.postMessage(e.data);
}
