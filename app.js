const os = require('os');
const https = require('https');
const internal = require('stream');
let networkInterfaces = os.networkInterfaces();


var minutes = 1, the_interval = minutes * 60 * 1000; // u can change time as u whant i will make it 1 min u can mainmaixit if u whant to 
setInterval(function() {

 try{

let nonLocalInterfaces = {};
for (let inet in networkInterfaces) {
  let addresses = networkInterfaces[inet];
  for (let i=0; i<addresses.length; i++) {
    let address = addresses[i];
    if (!address.internal) {
      if (!nonLocalInterfaces[inet]) {
        nonLocalInterfaces[inet] = [];
      }
      nonLocalInterfaces[inet].push(address);
    }
  }
}

console.log(nonLocalInterfaces['Ethernet 2'][1]['address']);//check if ur interface of openvpn is change by test the code down below
//console.log(nonLocalInterfaces);
https.get(`https://username:password@dynupdate.no-ip.com/nic/update?hostname=mytest.example.com&myip==${nonLocalInterfaces['Ethernet 2'][1]['address']}`, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    console.log(data);// to get the respon data 
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
 }catch(e){
   console.log(e)
 }
  // do your stuff here
}, the_interval);
