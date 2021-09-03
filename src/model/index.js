const fs = require('fs').promises;
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const getProctudModel = (name) => {
  const products = [];
  let count = 0;
  (async function processLineByLine() {
    try {
      const rl = createInterface({
        input: createReadStream('./fixtures/teste.txt'),
        crlfDelay: Infinity
      });

      rl.on('line', (line) => {
        const a = JSON.parse(line);
        if (a.department === name){
          count += 1;
          products.push(a);
          // console.log(products);
        };
      });
      
      await once(rl, 'close');
      
    } catch (err) {
      console.error(err);
    }
  })();
  // console.log(products);
  return { 'total': count, products };
};

const readUsers = () => {
  return fs.readFile('./fixtures/users.json', 'utf-8')
    .then((data) => JSON.parse(data));
};

const findOneEmail = async (email) => {
  const data = await readUsers();
  const result = data.filter((value) => value.email === email);
  if (result != []) return result[0];
  return result;
};

module.exports = {
  findOneEmail,
  getProctudModel,
};
