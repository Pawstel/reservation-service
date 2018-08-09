const createCSV = () => {
  for (let i = 0; i < 10000000; i += 1) {
    const randUser = Math.ceil(Math.random() * 10000000);
    console.log(`${randUser}`);
  }
};

createCSV();
