const http = require('http');

const pingServer = () => http.get('http://localhost:3000/', (res) => {
  console.log(res.statusCode);
});

for(let i = 0; i < 10; i++) {
  pingServer();
}
