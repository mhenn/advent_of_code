const input = Deno.readTextFileSync("./input.txt");

function stringToRounds(rounds: string[]): Round[] {
  return rounds.map((e) => new Round(e.split(",")));
}

class ColorAmount {
  green: number;
  blue: number;
  red: number;

  constructor(r: number = 0, g: number = 0, b: number = 0) {
    this.red = r;
    this.green = g;
    this.blue = b;
  }
  product() {
    return this.red * this.green * this.blue;
  }
}

class Game {
  id: number;
  rounds: Round[];
  constructor(id: number, rounds: string[]) {
    this.id = id;
    this.rounds = stringToRounds(rounds);
  }

  containsColorAmount(colorAmount: ColorAmount) {
    return this.rounds.every((r) => r.contains(colorAmount));
  }

  smallestPossible() {
    return this.rounds.reduce((acc: ColorAmount, curr: Round) => {
      Object.keys(acc).forEach((color) => {
        const colorAmount = curr.boxes[color];
        if (colorAmount && colorAmount > acc[color]) {
          acc[color] = colorAmount;
        }
      });
      return acc;
    }, new ColorAmount());
  }
}

class Round {
  boxes: { [color: string]: number };

  constructor(boxes: string[]) {
    this.boxes = {};
    boxes.forEach((box) => {
      const [_, amount, color] = box.split(" ");
      this.boxes[color] = parseInt(amount);
    });
  }

  contains(colorAmount: ColorAmount) {
    return Object.keys(colorAmount).every((color) => {
      const value = this.boxes[color];
      return !value || value <= colorAmount[color];
    });
  }
}

const games = input
  .split("\n")
  .map((el) => el.split(":")[1] || "")
  .filter(Boolean)
  .map((el, i) => new Game(i + 1, el.split(";")));

function taskA(games: Game[]) {
  const colorAmount = new ColorAmount(12, 13, 14);
  return games.reduce((acc, curr) => {
    if (curr.containsColorAmount(colorAmount)) return acc + curr.id;
    return acc;
  }, 0);
}

function taskB(games: Game[]) {
  return games.reduce((acc, curr) => {
    const sP = curr.smallestPossible().product();
    return acc + sP;
  }, 0);
}

const ret = taskA(games);
console.log(ret);
const ret2 = taskB(games);
console.log(ret2);
