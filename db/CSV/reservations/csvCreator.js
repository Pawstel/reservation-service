const faker = require('faker');

const createCSV = () => {
  for (let i = 0; i < 10000000; i += 1) {
    const randId = Math.ceil(Math.random() * 10000000);
    const randId2 = Math.ceil(Math.random() * 10000000);
    const randAdults = Math.ceil(Math.random() * 9);
    const randPups = createPupCount(randAdults);
    const randCharge = (randAdults + randPups) * 60;
    const createdAt = faker.date.past();
    console.log(`${randId}, ${randId2}, ${randAdults}, ${randPups}, ${randCharge}, ${createdAt}`);
  }
};

const createPupCount = (adultCount) => {
  const randPupCount = Math.floor(Math.random() * 4);
  const pupCount = (adultCount < 5) ? randPupCount : 9 - adultCount;
  return pupCount;
};

createCSV();
