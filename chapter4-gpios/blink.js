var gpio = require('pi-gpio'); //#A
var interval;

gpio.open(7, "output", function (err) { //#B
  if(err) console.log('error during initial open:', err);
  gpio.write(7, 1, function(err) {
    if(err) console.log('error during initial write:', err);
    console.log()
  });
});

interval = setInterval(function () { //#C
  var value = (led.readSync() + 1) % 2; //#D
  gpio.write(7, value, function(err) { //#E
    if(err) console.log('error during timeout write:', err);
    console.log("Changed LED state to: " + value);
  });
}, 2000);

process.on('SIGINT', function () { //#F
  clearInterval(interval);
  gpio.write(7, 0); //#G
  gpio.close(7);
  console.log('Bye, bye!');
  process.exit();
});

// #A Import the pi-gpio library
// #B Initialize pin 4 to be an output pin
// #C This interval will be called every 2 seconds
// #D Synchronously read the value of pin 4 and transform 1 to 0 or 0 to 1
// #E Asynchronously write the new value to pin 4
// #F Listen to the event triggered on CTRL+C
// #G Cleanly close the GPIO pin before exiting