require("colors");

const Colors = { GREEN: 0, YELLOW: 1, RED: 2 };

let currentColors = Colors.GREEN;
const leftRest = process.argv[2];
const righttRest = process.argv[3];
let noPrimeNum = true;

if (isNaN(leftRest) || isNaN(righttRest)) {
  console.log(`Incorrect number.`.red);
  return;
}

const isPrimeNum = (num) => {
  if (num <= 1) {
    return false;
  }

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }

    return true;
  }
};

const changeColor = () => {
  currentColors++;
  if (currentColors > Colors.RED) {
    currentColors = Colors.GREEN;
  }
};

const colorPrint = () => {
  if (noPrimeNum) {
    noPrimeNum = false;
  }
  switch (currentColors) {
    case Colors.RED:
      return console.log(`${num}`.red);
    case Colors.GREEN:
      return console.log(`${num}`.green);
    case Colors.YELLOW:
      return console.log(`${num}`.yellow);
  }
  changeColor();
};

for (let i = leftRest; i <= righttRest; i++) {
  if (isPrimeNum(i)) {
    return colorPrint(i);
  }
}

if (noPrimeNum) {
  console.log(`Thereare no prime in this range[${leftRest} ${righttRest}]`.red);
}
