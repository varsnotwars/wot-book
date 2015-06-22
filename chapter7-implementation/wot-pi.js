var httpServer = require('./servers/http'),
  wsServer = require('./servers/websockets'),
  resources = require('./resources/model');

// Internal Plugins
var ledsPlugin = require('./plugins/ledsPlugin'),
  pirPlugin = require('./plugins/pirPlugin'),
  dhtPlugin = require('./plugins/DHT22SensorPlugin');
//pirPlugin.start({'simulate': true, 'frequency': 2000});
//ledsPlugin.start({'simulate': true, 'frequency': 10000});
//dhtPlugin.start({'simulate': true, 'frequency': 10000});

// External Plugins
var coapPlugin = require('./plugins/external/coapPlugin');
coapPlugin.start({'simulate': false, 'frequency': 10000});

// HTTP Server
var server = httpServer.listen(resources.pi.port, function () {
  console.log('HTTP server started...');

  // Websockets server
  wsServer.listen(server);

  console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
})


/*
 //Initial version:
 var httpServer = require('./servers/http'), //#A
 resources = require('./resources/model');

 var server = httpServer.listen(resources.pi.port, function () { //#B
 console.info('Your WoT Pi is up and running on port %s', resources.pi.port); //#C
 });

 //#A Load the http server and the model
 //#B Start the HTTP server by invoking listen() on the Express application
 //#C Once the server is started the callback is invoked
 */
