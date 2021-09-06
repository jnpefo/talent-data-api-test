const fs = require('fs').promises;
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const getProductModel = async (name) => {
  const products = [];
  let count = 0;
  try {
    const rl = createInterface({
      input: createReadStream('./fixtures/products.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      const a = JSON.parse(line);
      if (a.department === name){
        count += 1;
        products.push(a);
      };
    });
    
    await once(rl, 'close');
    
  } catch (err) {
    console.error(err);
  }
  return { 'total': count, products };
};

const readUsers = () => {
  return fs.readFile('./fixtures/users.json', 'utf-8')
    .then((data) => JSON.parse(data));
};

const readOrganzation = () => {
  return fs.readFile('./fixtures/organization.json', 'utf-8')
    .then((data) => JSON.parse(data));
};

const filterOrganization = async (organization, level) => {
  const data = await readOrganzation();
  return data.filter((value) => value.name.includes(organization))
    .filter((value) =>  level.includes(value.level));
};

const filterStuffOrganization = async (organization) => {
  const data = await readOrganzation();
  return data.filter((value) => value.parent === organization);
};

const findOneEmail = async (email) => {
  const data = await readUsers();
  const result = data.filter((value) => value.email === email);
  if (result != []) return result[0];
  return result;
};

module.exports = {
  findOneEmail,
  getProductModel,
  filterOrganization,
  filterStuffOrganization,
};
