import { argv } from 'node:process';
import chalk from 'chalk';
import toHex from 'colornames';
import randomHex from 'random-hex';
import randomColor from 'randomcolor';

// total columns of box - minimum size (vertHashMargin * 2 + 7)
const hashWidth = 31;
// total rows of box - must be odd
const hashHeight = 9;
// margin of hashes from the sides
const vertHashMargin = 3;
// margin of hashes from the top and bottom
const horizHashMargin = 5;

let theme;
let hexColor;

// define text theme & hex colour
if (!argv[2]) {
  hexColor = randomHex.generate();
  theme = chalk.hex(hexColor);
} else {
  if (!toHex(argv[2])) {
    console.log(
      "Invalid input - please give a real colour! For a treat, here's a random one anyway.",
    );
  } else {
    hexColor = toHex(argv[2]);
    if (!argv[3]) {
      theme = chalk.hex(hexColor);
    } else if (argv[3] === 'light') {
      hexColor = randomColor({ hue: hexColor, luminosity: 'light' });
      theme = chalk.hex(hexColor);
    } else if (argv[3] === 'dark') {
      hexColor = randomColor({ hue: hexColor, luminosity: 'dark' });
      theme = chalk.hex(hexColor);
    }
  }
}

// box construction
for (let j = 0; j < hashHeight; j++) {
  if (j < vertHashMargin || j > hashHeight - vertHashMargin - 1) {
    for (let i = 0; i < hashWidth; i++) {
      process.stdout.write(theme('#'));
    }
  } else if (j === (hashHeight - 1) / 2) {
    for (let i = 0; i < hashWidth; i++) {
      if (i < horizHashMargin || i > hashWidth - horizHashMargin - 1) {
        process.stdout.write(theme('#'));
      } else if ((i > 4 && i < 12) || (i > 18 && i < 26)) {
        process.stdout.write(' ');
      } else if (i === 12) {
        process.stdout.write(theme(hexColor));
      }
    }
  } else {
    for (let i = 0; i < hashWidth; i++) {
      if (i < horizHashMargin || i > hashWidth - horizHashMargin - 1) {
        process.stdout.write(theme('#'));
      } else {
        process.stdout.write(' ');
      }
    }
  }
  process.stdout.write('\n');
}
