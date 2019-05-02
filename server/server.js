/* eslint no-console: 0 */
const app = require('./app');

const PORT = process.env.port || 8090;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
