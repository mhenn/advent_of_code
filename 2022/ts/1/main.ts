function sum(arr: number[]) {
  return arr.reduce((acc, cur) => acc + cur);
}
class Elf {
  constructor(public calories: number[]) {}
  get total(): number {
    return sum(this.calories);
  }
}

function getElfs(calories: string[]): Elf[] {
  return calories.map((entry) => {
    const elfCalories = entry.split("\n").map(Number);
    return new Elf(elfCalories);
  });
}

const input = await Deno.readTextFile("./input.txt");

const values = input.split("\n\n");

const elfs = getElfs(values);
elfs.sort((a, b) => b.total - a.total);
const maxSum = sum(elfs.slice(0, 3).map((a) => a.total));

console.log(maxSum);
