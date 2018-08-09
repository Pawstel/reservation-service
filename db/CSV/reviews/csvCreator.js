const createCSV = () => {
  for (let i = 0; i < 10000000; i += 1) {
    const randReviewNum = Math.ceil(Math.random() * 500);
    const randRating = JSON.stringify(Math.random() * 5).split('').splice(0, 4).join('');
    const totalRating = randRating + '/5';
    console.log(`${randReviewNum}, ${totalRating}`);
  }
};

createCSV();
