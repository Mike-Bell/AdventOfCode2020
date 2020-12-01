const fs = require('fs');
const range = require('./utils/range');

range(1, 26).forEach(i => {
   const paddedDay = i < 10 ? `0${i}` : `${i}`;
   const folderPath = `./${paddedDay}`;
   if (!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
  }

  if (!fs.existsSync('./inputs')){
   fs.mkdirSync('./inputs');
}

  fs.copyFileSync('./solution-template.js', `${folderPath}/solution.js`);
  fs.copyFileSync('./input-template.txt', `./inputs/input${paddedDay}.txt`);
});