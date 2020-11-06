const sum = require('./app');
const { event, init } = require('./source');

event.on('nums', async ({ x, y }) => {
  console.log(await sum(x, y))
})

init();
