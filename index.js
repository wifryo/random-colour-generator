import chalk from 'chalk';
import randomHex from 'random-hex';
import randomColor from 'randomcolor';
import promptSync from 'prompt-sync';

let hashWidth = 31;
let hashHeight = 9;

let theme;
let inputHue;
let inputLum;
let renderColour;
const args = process.argv.slice(2);
const prompt = promptSync();

// Process arguments
// If no additional arguments given, generate box of random colour with predefined dimensions
if (args.length === 0) {
  inputHue = randomHex.generate();
  theme = chalk.hex(inputHue);
  boxConstruct(hashWidth, hashHeight, theme, renderColour);
  // If "ask" is used, prompt user for hue/luminosity and render box of predefined dimensions with them
} else if (args.length === 1) {
  if (args[0] === 'ask') {
    inputHue = prompt('Input colour hue: ');
    inputLum = prompt('Input colour luminosity: ');
    renderColour = randomColor({ hue: inputHue, luminosity: inputLum });
    theme = chalk.hex(renderColour);
    boxConstruct(hashWidth, hashHeight, theme, renderColour);
  }
  // If the first character of the first argument is a number, process dimensions
} else if (hasNumber(args[0][0])) {
  const dims = args[0].split('X');
  hashWidth = Number(dims[0]);
  hashHeight = Number(dims[1]);
  if (isEven(hashWidth)) {
    hashWidth += 1;
    console.log(
      'Dimensions must be odd to preserve symmetry; width was auto-corrected.',
    );
  }
  if (isEven(hashHeight)) {
    hashHeight += 1;
    console.log(
      'Dimensions must be odd to preserve symmetry; height was auto-corrected.',
    );
  }
  inputHue = args[1];
  inputLum = args[2];
  renderColour = randomColor({ hue: inputHue, luminosity: inputLum });
  theme = chalk.hex(renderColour);
  boxConstruct(hashWidth, hashHeight, theme, renderColour);
}
// Construct box
function boxConstruct(hashWidth, hashHeight, theme, renderColour) {
  let vertHashMargin = 3;
  let horizHashMargin = 5;
  // Adjust margins for small box sizes
  if (hashHeight < 7) {
    vertHashMargin = (hashHeight - 1) / 2;
  }
  if (hashWidth < 17) {
    horizHashMargin = (hashWidth - 7) / 2;
  }
  let internalPadding = (hashWidth - horizHashMargin * 2 - 7) / 2;
  // Loop over each row
  for (let j = 0; j < hashHeight; j++) {
    // Draw top hashes
    if (j < vertHashMargin || j > hashHeight - vertHashMargin - 1) {
      for (let i = 0; i < hashWidth; i++) {
        process.stdout.write(theme('#'));
      }
    }
    // Draw central area
    else if (j === (hashHeight - 1) / 2) {
      for (let i = 0; i < hashWidth; i++) {
        // Draw margins
        if (i < horizHashMargin || i > hashWidth - horizHashMargin - 1) {
          process.stdout.write(theme('#'));
          // Draw empty space
        } else if (
          (i >= horizHashMargin && i < horizHashMargin + internalPadding) ||
          (i >= horizHashMargin + internalPadding + 7 &&
            i < hashWidth - horizHashMargin)
        ) {
          process.stdout.write(' ');
        } else if (i === (hashWidth - 1) / 2) {
          // Render colour name
          process.stdout.write(theme(renderColour));
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
}

// Function to determine if a string contains a number
function hasNumber(myString) {
  return /\d/.test(myString);
}
// Function to determine if a number is even
function isEven(n) {
  return n % 2 == 0;
}
