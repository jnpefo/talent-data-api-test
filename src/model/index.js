const fs = require('fs').promises;
const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const getProctudModel = async (name) => {
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

const filterOrganization = async (organization) => {
  const organizationFilter = [];
  const data = await readOrganzation();
  organizationFilter.push(data.filter((value) => value.name.includes(organization)));
  console.log('model', organizationFilter);
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
  filterOrganization,
};
