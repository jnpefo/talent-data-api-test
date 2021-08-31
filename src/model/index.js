const fs = require('fs').promises;

const readJson = () => {
  return fs.readFile('./fixtures/users.json', 'utf-8')
    .then((data) => JSON.parse(data));
};

const findOneEmail = async (email) => {
  const data = await readJson();
  const result = data.filter((value) => value.email === email);
  if (result != []) return result[0];
  return result;
};

module.exports = {
  findOneEmail,
};
