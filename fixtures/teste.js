// const fs = require('fs');

// const myReadStream = fs.createReadStream(__dirname + '/teste.txt', 'utf8');

// myReadStream.on('data', function(c) {
//   // const d = [];
//   const a = c.replace(/(\r\n|\n|\r)/gm, ' ');

//   const b = JSON.parse(a);
//   console.log(b);
// });

// const p = {
//   'name': 'Handcrafted Plastic Keyboard',
//   'department': 'Music',
//   'material': 'Soft',
//   'price': '173.00',
//   'tags': ['Practical','Small','Licensed','Practical'],
// };

const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

(async function processLineByLine() {
  try {
    const rl = createInterface({
      input: createReadStream('./teste.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      // Process the line.
      const a = JSON.parse(line);
      console.log(a);
    });

    await once(rl, 'close');

    console.log('File processed.');
  } catch (err) {
    console.error('to aqui Neto', err);
  }
})();

// const fs = require('fs');

// const inJson = [];
// fs.readFile('./teste.txt', 'utf-8', function(err, data){
//   let linhas = data.split(/\r?\n/);
//   linhas.forEach(function(linha){
//     console.log(linha); // aqui podes fazer o que precisas com cada linha
//     // inJson.push(JSON.parse(linha));
//   });

//   // console.log({inJson});
// });
