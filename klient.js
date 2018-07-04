/**
 * Vastastikuse autentimise näiterakendus
 * 
 * TARA-Mutual-Client
 */

/* HTTP kliendi teek
  Vt https://www.npmjs.com/package/request 
  http://stackabuse.com/the-node-js-request-module/
*/
const requestModule = require('request');

const fs = require('fs');
const path = require('path');

console.log('__dirname: \n');
console.log(__dirname);

const certFile = path.resolve(__dirname,
  '../clientKeys/Keystore/TARA-Mutual-Client.crt');

console.log('certFile: \n');
console.log(certFile);
  
const keyFile = path.resolve(__dirname,
  '../clientKeys/Keystore/TARA-Mutual-Client.key');
const caFile = path.resolve(__dirname,
  '../clientKeys/Truststore/TARA-Mutual-CA.crt');

var options = {
  url: 'https://localhost:5001',
  method: 'GET',
  cert: fs.readFileSync(certFile),
  key: fs.readFileSync(keyFile),
  passphrase: 'changeit',
  ca: fs.readFileSync(caFile)  
}

requestModule(
  options,
  function (error, response, body) {
    if (error) {
      console.log('--- Viga TARA-Mutual-Server-i poole pöördumisel: ', error);
      return
    }
    console.log('--- Vastus TARA-Mutual-Server-st saadud. HTTP staatuskood: ' +
      response.statusCode);
  }
);