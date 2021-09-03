const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const test = () => {
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
};

test();


// {
//   "name": "Handcrafted Plastic Keyboard",
//   "department": "Music",
//   "material": "Soft",
//   "price": "173.00",
//   "tags": ["Practical","Small","Licensed","Practical"]
// }
