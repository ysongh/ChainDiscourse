const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const LitJsSdk = require("@lit-protocol/lit-node-client");
const siwe = require('siwe');

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

app.get('/siwe-message', async (req, res) => {
  let nonce = await app.locals.litNodeClient.getLatestBlockhash();

  const domain = 'localhost';
  const origin = 'https://localhost/login';
  const statement =
    'This is a test statement.  You can put anything you want here.';

  // expiration time in ISO 8601 format.  This is 7 days in the future, calculated in milliseconds
  const expirationTime = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7 * 10000
  ).toISOString();

  const siweMessage = new siwe.SiweMessage({
    domain,
    address: address,
    statement,
    uri: origin,
    version: '1',
    chainId: 1,
    nonce,
    expirationTime,
  });
  const messageToSign = siweMessage.prepareMessage();
  res.send(messageToSign);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
