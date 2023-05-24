function sum(arr: number[]) {
  return arr.reduce((acc, cur) => acc + cur);
}
class Elf {
  calories: number[] = [];

  get total(): number {
    return sum(this.calories);
  }
}

function getElfs(calories: string[]): Elf[] {
  const elfs: Elf[] = [];
  calories.forEach((entry) => {
    const elf = new Elf();
    elf.calories = entry.split("\n").map(Number);
    elfs.push(elf);
  });
  return elfs;
}

const input = await Deno.readTextFile("./input.txt");

const values = input.split("\n\n");

const elfs = getElfs(values);
elfs.sort((a, b) => b.total - a.total);
const max = sum(elfs.slice(0, 3).map((a) => a.total));

console.log(max);
