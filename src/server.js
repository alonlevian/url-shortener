require('dotenv').config();
const app = require('./app');
const port = 3000;

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
