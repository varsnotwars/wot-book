var Gpio = require('onoff').Gpio;
var sensor = new Gpio(17, 'in', 'both');    //#A
var led = new Gpio(4, 'out');

sensor.watch(function (err, value) { //#B
  if (err) exit(err);
  if(value) {
    // body detected    
    var ledOnState = 1;
    led.write(ledOnState, function() {
    // led turned on
    });
  } else {
    // body not detected
    var ledOffState = 0;
    led.write(ledOffState, function() {
      // led turned off
    });
  }
});

function exit(err) {
  if (err) console.log('An error occurred: ' + err);
  // sensor
  sensor.unexport();
  // led
  led.writeSync(0);
  led.unexport();
  console.log('Bye, bye!')
  process.exit();
}
process.on('SIGINT', exit);

// #A Initialize pin 17 in input mode, 'both' means we want to handle both rising and falling interrupt edges
// #B Listen for state changes on pin 17, if a change is detected the anonymous callback function will be called with the new value
