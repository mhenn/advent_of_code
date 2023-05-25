//const input = Deno.readTextFileSync("./test.txt");
const input = Deno.readTextFileSync("./input.txt");

const entries = input.split("\n").filter((n) => n);

const choice = {
  X: 1,
  Y: 2,
  Z: 3,
};

const outcome = {
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
};

const outcomeMap = {
  A: {
    X: "DRAW",
    Y: "WIN",
    Z: "LOSS",
  },
  B: {
    X: "LOSS",
    Y: "DRAW",
    Z: "WIN",
  },
  C: {
    X: "WIN",
    Y: "LOSS",
    Z: "DRAW",
  },
};

const outcomeMapSecond = reversed(outcomeMap);

function reversed(match) {
  let reversed = {};
  for (const key in match) {
    let rev = Object.entries(match[key]).map(([k, v]) => [v, k]);
    reversed[key] = Object.fromEntries(rev);
  }
  return reversed;
}

function getRoundValues(rounds: string[]) {
  return rounds.map((current: string) => {
    const [left, right]: string[] = current.split(" ");
    return outcome[outcomeMap[left][right]] + choice[right];
  });
}

const outcomeSecond = {
  X: "LOSS",
  Y: "DRAW",
  Z: "WIN",
};

function getRoundValuesSecond(rounds: string[]) {
  return rounds.map((current: string) => {
    const [left, right]: string[] = current.split(" ");
    const out = outcomeSecond[right];
    return (outcome[out] + choice[outcomeMapSecond[left][out]]);
  });
}

console.log(entries);
console.log(outcomeMapSecond);

const val = getRoundValues(entries);
console.log(val.reduce((acc, c) => acc + c));

const valSec = getRoundValuesSecond(entries);
console.log(valSec.reduce((acc, c) => acc + c));
