const createCSV = () => {
  for (let i = 0; i < 10000000; i += 1) {
    const randId = Math.ceil(Math.random() * 10000000);
    const randMonth = Math.ceil(Math.random() * 12);
    const randDay = Math.ceil(Math.random() * 28);
    const randYear = '2018';
    const randDuration = Math.ceil(Math.random() * 6);
    const checkIn = createDate(randYear, randMonth, randDay);
    const checkOut = createDate(randYear, randMonth, randDay + randDuration);
    console.log(`${randId}, ${checkIn}, ${checkOut}`);
  }
};

const createDate = (year, month, day) => {
  let date = year;
  date = (month >= 10) ? date + '-' + month + '-' : date + '-0' + month + '-';
  if (month === 2 && day > 22) {
    date += (day - 6);
  } else {
    date += day;
  }
  return date;
};

createCSV();
