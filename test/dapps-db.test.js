const vm = require('vm');
const fs = require('fs');

const dappsDB = fs.readFileSync('dapps-db.js', 'utf8');

const sb = {};
vm.runInNewContext(dappsDB, sb);
console.log = () => {};

// CONSTANTS
const MANDATORY_FIELDS = ['name', 'price', 'author', 'license', 'excerpt', 'description', 'social', 'created', 'logo', 'chains'];
const MAX_NAME = 40;
const MAX_AUTHOR = 40;
const MAX_EXCERPT = 150;
const MAX_DESC = 2000;
test('all manadatory fields exist', () => sb.dappsDB.forEach(dapp => MANDATORY_FIELDS.forEach(field => expect(field in dapp).toBeTruthy())));

test(`all names shorter than ${MAX_NAME} characters`, () => {
  sb.dappsDB.forEach(dapp => expect(dapp.name.length < MAX_NAME).toBeTruthy());
});

test(`all authors shorter than ${MAX_AUTHOR} characters`, () => {
  sb.dappsDB.forEach(dapp => expect(dapp.author.length < MAX_AUTHOR).toBeTruthy());
});

test(`all excerpts shorter than ${MAX_EXCERPT} characters`, () => {
  sb.dappsDB.forEach(dapp => expect(dapp.excerpt.length < MAX_EXCERPT).toBeTruthy());
});

test(`all descriptions shorter than ${MAX_DESC} characters`, () => {
  sb.dappsDB.forEach(dapp => expect(dapp.description.length < MAX_DESC).toBeTruthy());
});

test('all created fields are correct dates', () => {
  sb.dappsDB.forEach(dapp => expect(!Number.isNaN(Date.parse(dapp.created))).toBeTruthy());
});
