const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();

const prefixes = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Madam', 'Master', 'Prince', 'Princess', 'Duke', 'Baron'];

const firstNames = ['Demarcus', 'Rose', 'Curtis', 'Dean', 'Neil', 'Hortense', 'Ines', 'Kariane', 'Darrick', 'Yesenia', 'Constance', 'Cicero', 'Angelina', 'Roosevelt', 'Julia', 'Mark', 'Zakary', 'Ernestina', 'Darlene', 'Cleve', 'John', 'Roberta', 'Edythe', 'Jonatan', 'Joan', 'Summer', 'Berniece', 'Marcelina', 'Dejon', 'Sydnie', 'Malvina', 'Royal', 'Eula', 'Jannie', 'Felicity', 'Randall', 'Jovanny', 'Breana', 'Berenice', 'Earnest', 'Chris', 'Yvette', 'Miller', 'Else', 'Cali', 'Monty', 'Donald', 'Camille', 'Jadon', 'Sharon', 'Jordane', 'Timothy', 'Ron', 'Colby', 'Emery', 'Rusty', 'Brendon', 'Kacey', 'Drake', 'Joelle', 'Alfred', 'Raleigh', 'Arlo', 'Camille', 'Giles', 'Kariane', 'Adelle', 'Lucinda', 'Rickie', 'Darien', 'Rod', 'Kassandra', 'Rosanna', 'Melyssa', 'Amari', 'Arne', 'Efrain', 'Nicole', 'Gordon', 'Isobel', 'Karli', 'Josue', 'Tanya', 'Amber', 'Earnestine', 'Catharine', 'Anabelle', 'Kristy', 'Elise', 'Lance', 'Marvin', 'Christophe', 'Paul', 'Phoebe', 'Carlotta', 'Robbie', 'Dave', 'Zula', 'Yadira', 'Holly'];

const lastNames = ['Farrell\'s', 'DuBuque\'s', 'Kiehn\'s', 'Swaniawski\'s', 'Marks\'s', 'Murray\'s', 'West\'s', 'Lesch\'s', 'Kautzer\'s', 'Rippin\'s', 'McClure\'s', 'Nicolas\'s', 'Beer\'s', 'Roob\'s', 'Thiel\'s', 'Bosco\'s', 'Kuvalis\'s', 'Quitzon\'s', 'Doyle\'s', 'Fadel\'s', 'Gislason\'s', 'Kassulke\'s', 'Haley\'s', 'Runte\'s', 'Monahan\'s', 'Goldner\'s', 'Hyatt\'s', 'Wolff\'s', 'Beatty\'s', 'Tromp\'s', 'Friesen\'s', 'Mertz\'s', 'Rolfson\'s', 'Will\'s', 'Simonis\'s', 'Nikolaus\'s', 'Klein\'s', 'Mosciski\'s', 'Rosenbaum\'s', 'McKenzie\'s', 'Yost\'s', 'Powlowski\'s', 'Cummerata\'s', 'Leffler\'s', 'Bailey\'s', 'Kessler\'s', 'Keeling\'s', 'Davis\'s', 'Corkery\'s', 'Doyle\'s', 'Feest\'s', 'Champlin\'s', 'Bashirian\'s', 'Stokes\'s', 'Schaden\'s', 'Effertz\'s', 'Roberts\'s', 'Stoltenberg\'s', 'Dickens\'s', 'Simonis\'s', 'Carter\'s', 'D\'Amore\'s', 'VonRueden\'s', 'Dibbert\'s', 'Bergnaum\'s', 'Hagenes\'s', 'McClure\'s', 'Mayert\'s', 'Heathcote\'s', 'Bogan\'s', 'Dach\'s', 'Hyatt\'s', 'Buckridge\'s', 'Stoltenberg\'s', 'Oberbrunner\'s', 'Abshire\'s', 'Graham\'s', 'Gulgowski\'s', 'Boyer\'s', 'Lemke\'s', 'Schroeder\'s', 'Donnelly\'s', 'Pfeffer\'s', 'Stark\'s', 'Williamson\'s', 'Greenfelder\'s', 'Weissnat\'s', 'Hamill\'s', 'Walker\'s', 'Schmeler\'s', 'Haley\'s', 'Zemlak\'s', 'Tromp\'s', 'Ziemann\'s', 'Wuckert\'s', 'Hartmann\'s', 'Graham\'s', 'Shanahan\'s', 'Bergstrom\'s', 'Mertz\'s'];

const locations = ['Ashy Pawstel', 'Black Pawstel', 'Blue Pawstel', 'Gray Pawstel', 'Green Pawstel', 'Icy Pawstel', 'Lemon Pawstel', 'Mango Pawstel', 'Orange Pawstel', 'Purple Pawstel', 'Red Pawstel', 'Salmon Pawstel', 'White Pawstel', 'Yellow Pawstel', 'Agreeable Pawstel', 'Ambitious Pawstel', 'Brave Pawstel', 'Calm Pawstel', 'Delightful Pawstel', 'Eager Pawstel', 'Faithful Pawstel', 'Gentle Pawstel', 'Happy Pawstel', 'Jolly Pawstel', 'Kind Pawstel', 'Lively Pawstel', 'Nice Pawstel', 'Obedient Pawstel', 'Polite Pawstel', 'Proud Pawstel', 'Silly Pawstel', 'Thankful Pawstel', 'Victorious Pawstel', 'Witty Pawstel', 'Wonderful Pawstel', 'Zealous Pawstel', 'Big Pawstel', 'Colossal Pawstel', 'Fat Pawstel', 'Gigantic Pawstel', 'Great Pawstel', 'Huge Pawstel', 'Immense Pawstel', 'Large Pawstel', 'Little Pawstel', 'Mammoth Pawstel', 'Massive Pawstel', 'Microscopic Pawstel', 'Miniature Pawstel', 'Petite Pawstel', 'Puny Pawstel', 'Scrawny Pawstel', 'Short Pawstel', 'Small Pawstel', 'Tall Pawstel', 'Teeny Pawstel', 'Tiny Pawstel', 'Ancient Pawstel', 'Brief Pawstel', 'Early Pawstel', 'Fast Pawstel', 'Futuristic Pawstel', 'Late Pawstel', 'Long Pawstel', 'Modern Pawstel', 'Old Pawstel', 'Old-fashioned Pawstel', 'Prehistoric Pawstel', 'Quick Pawstel', 'Rapid Pawstel', 'Short Pawstel', 'Slow Pawstel', 'Swift Pawstel', 'Young Pawstel', 'Breezy Pawstel', 'Cool Pawstel', 'Cuddly Pawstel', 'Damp Pawstel', 'Fluffy Pawstel', 'Warm Pawstel', 'Wooden Pawstel', 'Acidic Pawstel', 'Bitter Pawstel', 'Cool Pawstel', 'Creamy Pawstel', 'Delicious Pawstel', 'Disgusting Pawstel', 'Fresh Pawstel', 'Greasy Pawstel', 'Juicy Pawstel', 'Hot Pawstel', 'Moldy Pawstel', 'Nutritious Pawstel', 'Nutty Pawstel', 'Putrid Pawstel', 'Rancid Pawstel', 'Ripe Pawstel', 'Rotten Pawstel', 'Salty Pawstel', 'Savory Pawstel'];

const createCSV = (fileName) => {
  // fileName = fileName || 'data.csv';
  // writer.pipe(fs.createWriteStream(fileName));
  // for (let i = 0; i < 10000000; i += 1) {
  //   writer.write({ username: faker.name.lastName() });
  // }
  // for (let i = 0; i < 5000000; i += 1) {
  //   let prefixRand = Math.floor(Math.random() * prefixes.length);
  //   let firstRand = Math.floor(Math.random() * firstNames.length);
  //   let lastRand = Math.floor(Math.random() * lastNames.length);
  //   let locationRand = Math.floor(Math.random() * locations.length);
  //   writer.write({ username: prefixes[prefixRand] + firstNames[firstRand] + lastNames[lastRand] + locations[locationRand], id: i + 1 });
  // }
  for (let i = 0; i < prefixes.length; i += 1) {
    for (let j = 0; j < firstNames.length; j += 1) {
      for (let k = 0; k < lastNames.length; k += 1) {
        for (let l = 0; l < 50; l += 1) {
          console.log(`${prefixes[i]} ${firstNames[j]} ${lastNames[k]} ${locations[l]}`);
        }
      }
    }
  }
  // writer.end();
  // console.log('Done');
};

createCSV();
