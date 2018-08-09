const faker = require('faker');

const createCSV = () => {
  for (let i = 0; i < 10000000; i += 1) {
    const randUser = faker.internet.userName();
    console.log(`${randUser}`);
  }
};

createCSV();
