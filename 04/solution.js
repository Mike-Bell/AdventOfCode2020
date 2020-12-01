const parseInput = input => input.split('\r\n\r\n').map(passport => passport.trim().split(/\s+/));

const runPart1 = input => {
   return input.filter(passport => {
      const passportCodes = passport.map(p => p.split(':')[0]);
      return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(code => {
         return passportCodes.includes(code);
      });
   }).length;
};

const runPart2 = input => {
   const validations = {
      'byr': val => val >= 1920 && val <= 2002,
      'iyr': val => val >= 2010 && val <= 2020,
      'eyr': val => val >= 2020 && val <= 2030,
      'hgt': val => {
         const unit = val.slice(val.length - 2, val.length);
         const n = val.slice(0, val.length - 2);
         return (unit === 'cm' && n >= 150 && n <= 193) || (unit === 'in' && n >= 59 && n <= 76);
      },
      'hcl': val => /^#[a-f0-9]{6}$/.test(val),
      'ecl': val => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
      'pid': val => /^[0-9]{9}$/.test(val)
   };

   return input.filter(passport => {
      const validCodes = passport.reduce((codes, entry) => {
         const [code, val] = entry.split(':');
         codes[code] = codes[code] || (validations[code] && validations[code](val));
         return codes;
      }, {});
      return Object.keys(validations).every(k => validCodes[k]);
   }).length;
};

module.exports = {parseInput, runPart1, runPart2};