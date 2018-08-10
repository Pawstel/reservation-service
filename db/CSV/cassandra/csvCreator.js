const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();

const prefixes = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Madam', 'Master', 'Prince', 'Princess', 'Duke', 'Baron'];

const firstNames = ['Demarcus', 'Rose', 'Curtis', 'Dean', 'Neil', 'Hortense', 'Ines', 'Kariane', 'Darrick', 'Yesenia', 'Constance', 'Cicero', 'Angelina', 'Roosevelt', 'Julia', 'Mark', 'Zakary', 'Ernestina', 'Darlene', 'Cleve', 'John', 'Roberta', 'Edythe', 'Jonatan', 'Joan', 'Summer', 'Berniece', 'Marcelina', 'Dejon', 'Sydnie', 'Malvina', 'Royal', 'Eula', 'Jannie', 'Felicity', 'Randall', 'Jovanny', 'Breana', 'Berenice', 'Earnest', 'Chris', 'Yvette', 'Miller', 'Else', 'Cali', 'Monty', 'Donald', 'Camille', 'Jadon', 'Sharon', 'Jordane', 'Timothy', 'Ron', 'Colby', 'Emery', 'Rusty', 'Brendon', 'Kacey', 'Drake', 'Joelle', 'Alfred', 'Raleigh', 'Arlo', 'Camille', 'Giles', 'Kariane', 'Adelle', 'Lucinda', 'Rickie', 'Darien', 'Rod', 'Kassandra', 'Rosanna', 'Melyssa', 'Amari', 'Arne', 'Efrain', 'Nicole', 'Gordon', 'Isobel', 'Karli', 'Josue', 'Tanya', 'Amber', 'Earnestine', 'Catharine', 'Anabelle', 'Kristy', 'Elise', 'Lance', 'Marvin', 'Christophe', 'Paul', 'Phoebe', 'Carlotta', 'Robbie', 'Dave', 'Zula', 'Yadira', 'Holly'];

const lastNames = ['Farrell\'s', 'DuBuque\'s', 'Kiehn\'s', 'Swaniawski\'s', 'Marks\'s', 'Murray\'s', 'West\'s', 'Lesch\'s', 'Kautzer\'s', 'Rippin\'s', 'McClure\'s', 'Nicolas\'s', 'Beer\'s', 'Roob\'s', 'Thiel\'s', 'Bosco\'s', 'Kuvalis\'s', 'Quitzon\'s', 'Doyle\'s', 'Fadel\'s', 'Gislason\'s', 'Kassulke\'s', 'Haley\'s', 'Runte\'s', 'Monahan\'s', 'Goldner\'s', 'Hyatt\'s', 'Wolff\'s', 'Beatty\'s', 'Tromp\'s', 'Friesen\'s', 'Mertz\'s', 'Rolfson\'s', 'Will\'s', 'Simonis\'s', 'Nikolaus\'s', 'Klein\'s', 'Mosciski\'s', 'Rosenbaum\'s', 'McKenzie\'s', 'Yost\'s', 'Powlowski\'s', 'Cummerata\'s', 'Leffler\'s', 'Bailey\'s', 'Kessler\'s', 'Keeling\'s', 'Davis\'s', 'Corkery\'s', 'Doyle\'s', 'Feest\'s', 'Champlin\'s', 'Bashirian\'s', 'Stokes\'s', 'Schaden\'s', 'Effertz\'s', 'Roberts\'s', 'Stoltenberg\'s', 'Dickens\'s', 'Simonis\'s', 'Carter\'s', 'D\'Amore\'s', 'VonRueden\'s', 'Dibbert\'s', 'Bergnaum\'s', 'Hagenes\'s', 'McClure\'s', 'Mayert\'s', 'Heathcote\'s', 'Bogan\'s', 'Dach\'s', 'Hyatt\'s', 'Buckridge\'s', 'Stoltenberg\'s', 'Oberbrunner\'s', 'Abshire\'s', 'Graham\'s', 'Gulgowski\'s', 'Boyer\'s', 'Lemke\'s', 'Schroeder\'s', 'Donnelly\'s', 'Pfeffer\'s', 'Stark\'s', 'Williamson\'s', 'Greenfelder\'s', 'Weissnat\'s', 'Hamill\'s', 'Walker\'s', 'Schmeler\'s', 'Haley\'s', 'Zemlak\'s', 'Tromp\'s', 'Ziemann\'s', 'Wuckert\'s', 'Hartmann\'s', 'Graham\'s', 'Shanahan\'s', 'Bergstrom\'s', 'Mertz\'s'];

const locations = ['Ashy Pawstel', 'Black Pawstel', 'Blue Pawstel', 'Gray Pawstel', 'Green Pawstel', 'Icy Pawstel', 'Lemon Pawstel', 'Mango Pawstel', 'Orange Pawstel', 'Purple Pawstel', 'Red Pawstel', 'Salmon Pawstel', 'White Pawstel', 'Yellow Pawstel', 'Agreeable Pawstel', 'Ambitious Pawstel', 'Brave Pawstel', 'Calm Pawstel', 'Delightful Pawstel', 'Eager Pawstel', 'Faithful Pawstel', 'Gentle Pawstel', 'Happy Pawstel', 'Jolly Pawstel', 'Kind Pawstel', 'Lively Pawstel', 'Nice Pawstel', 'Obedient Pawstel', 'Polite Pawstel', 'Proud Pawstel', 'Silly Pawstel', 'Thankful Pawstel', 'Victorious Pawstel', 'Witty Pawstel', 'Wonderful Pawstel', 'Zealous Pawstel', 'Big Pawstel', 'Colossal Pawstel', 'Fat Pawstel', 'Gigantic Pawstel', 'Great Pawstel', 'Huge Pawstel', 'Immense Pawstel', 'Large Pawstel', 'Little Pawstel', 'Mammoth Pawstel', 'Massive Pawstel', 'Microscopic Pawstel', 'Miniature Pawstel', 'Petite Pawstel', 'Puny Pawstel', 'Scrawny Pawstel', 'Short Pawstel', 'Small Pawstel', 'Tall Pawstel', 'Teeny Pawstel', 'Tiny Pawstel', 'Ancient Pawstel', 'Brief Pawstel', 'Early Pawstel', 'Fast Pawstel', 'Futuristic Pawstel', 'Late Pawstel', 'Long Pawstel', 'Modern Pawstel', 'Old Pawstel', 'Old-fashioned Pawstel', 'Prehistoric Pawstel', 'Quick Pawstel', 'Rapid Pawstel', 'Short Pawstel', 'Slow Pawstel', 'Swift Pawstel', 'Young Pawstel', 'Breezy Pawstel', 'Cool Pawstel', 'Cuddly Pawstel', 'Damp Pawstel', 'Fluffy Pawstel', 'Warm Pawstel', 'Wooden Pawstel', 'Acidic Pawstel', 'Bitter Pawstel', 'Cool Pawstel', 'Creamy Pawstel', 'Delicious Pawstel', 'Disgusting Pawstel', 'Fresh Pawstel', 'Greasy Pawstel', 'Juicy Pawstel', 'Hot Pawstel', 'Moldy Pawstel', 'Nutritious Pawstel', 'Nutty Pawstel', 'Putrid Pawstel', 'Rancid Pawstel', 'Ripe Pawstel', 'Rotten Pawstel', 'Salty Pawstel', 'Savory Pawstel'];

const createCSV = () => {
  let count = 7500001;
  for (let i = 0; i < prefixes.length; i += 1) {
    for (let j = 0; j < firstNames.length; j += 1) {
      for (let k = 0; k < lastNames.length; k += 1) {
        for (let l = 75; l < 100; l += 1) {
          const randHost = Math.ceil(Math.random() * 10000000);
          const randUser = Math.ceil(Math.random() * 10000000);
          const randStay = Math.ceil(Math.random() * 10);
          const randViews = 100 + Math.ceil(Math.random() * 500);
          const randGuests = 1 + Math.ceil(Math.random() * 5);
          const randFees = 2 + Math.ceil(Math.random() * 8);
          const randTax = Math.ceil(Math.random() * 10);
          const randRate = 60 + Math.ceil(Math.random() * 100);
          const randUserName = faker.internet.userName();
          const randReviewNum = Math.ceil(Math.random() * 500);
          const randRating = JSON.stringify(Math.random() * 5).split('').splice(0, 4).join('');
          const totalRating = randRating + '/5';
          const randId = Math.ceil(Math.random() * 10000000);
          const randMonth = Math.ceil(Math.random() * 12);
          const randDay = Math.ceil(Math.random() * 28);
          const randYearEnd = 18 + Math.ceil(Math.random() * 81);
          const randYear = '20' + randYearEnd;
          const randDuration = Math.ceil(Math.random() * 6);
          const checkIn = createDate(randYear, randMonth, randDay);
          const checkOut = createDate(randYear, randMonth, randDay + randDuration);
          const randId3 = Math.ceil(Math.random() * 10000000);
          const randId2 = Math.ceil(Math.random() * 10000000);
          const randAdults = Math.ceil(Math.random() * 9);
          const randPups = createPupCount(randAdults);
          const randCharge = (randAdults + randPups) * 60;
          console.log(`${count}, ${prefixes[i]} ${firstNames[j]} ${lastNames[k]} ${locations[l]}, ${randHost}, ${randUser}, ${randViews}, ${randStay}, ${randGuests}, ${randFees}, ${randTax}, ${randRate}, ${randUserName}, ${randReviewNum}, ${totalRating}, ${randId}, ${checkIn}, ${checkOut}, ${randId3}, ${randId2}, ${randAdults}, ${randPups}, ${randCharge}`);
          count += 1;
        }
      }
    }
  }
};

const createDate = (year, month, day) => {
  let date = '' + year;
  date = (month >= 10) ? date + '-' + month + '-' : date + '-0' + month + '-';
  if (month === 2 && day > 22) {
    date += (day - 6);
  } else {
    date += day;
  }
  return date;
};

const createPupCount = (adultCount) => {
  const randPupCount = Math.floor(Math.random() * 4);
  const pupCount = (adultCount < 5) ? randPupCount : 9 - adultCount;
  return pupCount;
};

createCSV();
