const fs = require('fs').promises;

const readJson = () => {
  return fs.readFile('../../fixtures/users.json', 'utf-8')
    .then((data) => JSON.parse(data));
}

const findOne = async (email) => {
  const data = await readJson();
  const result = data.filter((value) => value.email === email)
  return result[0];
}

module.exports = {
  findOne,
};
