const http = require('http');
const cluster = require('cluster');
const os = require('os');

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

// By default one request will be processed once in 2 seconds
const handleRequest = async (req, res) => {
  await sleep(2000);
  res
    .writeHead(200)
    .end('Request done!');
};

// with clusters every request will be either processed by available cluster or put into a queue
if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer(handleRequest)
    .listen(3000, () => {
      console.log('Server is up!');
    });
}
