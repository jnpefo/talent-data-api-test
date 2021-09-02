const fs = require('fs');

const myReadStream = fs.createReadStream(__dirname + '/teste.txt', 'utf8');

myReadStream.on('data', function(c) {
  // const d = [];
  const a = c.replace(/(\r\n|\n|\r)/gm, ' ');

  const b = JSON.parse(a);
  console.log(b);
});

// const p = {
//   'name': 'Handcrafted Plastic Keyboard',
//   'department': 'Music',
//   'material': 'Soft',
//   'price': '173.00',
//   'tags': ['Practical','Small','Licensed','Practical'],
// };
