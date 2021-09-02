const fs = require('fs').promises;
const path = require('path');

// const readProducts = () => {
//   return fs.readFile('../../fixtures/products.txt', 'utf-8')
//     .then((data) => JSON.parse(data));
// };

// const getOrganizationName = async() => {
//   const data = await readProducts();
//   console.log(data);
// };

// getOrganizationName();

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

console.log(findOneEmail('junior.salesrep@stit.talent'));

module.exports = {
  findOneEmail,
};
