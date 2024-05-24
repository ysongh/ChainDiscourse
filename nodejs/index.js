const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const LitJsSdk = require("@lit-protocol/lit-node-client");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.locals.litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
  alertWhenUnauthorized: false,
  litNetwork: 'habanero',
});


app.get('/', (req, res) => res.send('It Work'));

app.get('/connect', async (req, res) => {
  await app.locals.litNodeClient.connect();
  res.send('Connecting');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
