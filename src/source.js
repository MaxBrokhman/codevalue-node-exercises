const EventEmitter = require('events');

const event = new EventEmitter();

const generateRandomNumber = () => Math.floor(Math.random() * 100);

const emitNums = () => event.emit('nums', {
  x: generateRandomNumber(), 
  y: generateRandomNumber(),
});

const init = () => setInterval(emitNums, 2000);

module.exports = {
  event,
  init,
}
