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
    return (
      this.rounds.filter((r) => r.contains(colorAmount)).length ===
        this.rounds.length
    );
  }

  smallestPossible() {
    return this.rounds.reduce((acc: ColorAmount, curr: Round) => {
      const { red, green, blue } = curr.boxes;
      if (red > acc.red) acc.red = red;
      if (green > acc.green) acc.green = green;
      if (blue > acc.blue) acc.blue = blue;

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
    const { green, red, blue } = colorAmount;
    let ret = true;
    const r = this.boxes["red"];
    const g = this.boxes["green"];
    const b = this.boxes["blue"];
    if (r) ret = ret && r <= red;
    if (g) ret = ret && g <= green;
    if (b) ret = ret && b <= blue;
    return ret;
  }
}

const games = input
  .split("\n")
  .map((el) => el.split(":")[1] || "")
  .filter((e) => e !== "")
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
