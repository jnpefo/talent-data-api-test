const teste = [
  { name: 'STUFF C', level: 0 },
  { name: 'STUFF C01', level: 3, parent: 'STUFF C' }
];

const result = teste.filter(value => value.name.includes('STUFF C'));

console.log(result);
