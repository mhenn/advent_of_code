const input = Deno.readTextFileSync("./input2.txt");

const in_arr = input.split("\n").filter((i) => i);

function testForNumber(input: string): boolean {
  if (parseInt(input)) {
    return true;
  }
  return false;
}

function slidingWindow(content: string, window: number): string {
  let n = "";
  for (let i = 0; i < content.length; i++) {
    n += replaceItBadly(content.slice(i, i + window));
  }
  return n;
}

function replaceItBadly(content: string) {
  return content
    .replace(/one/g, "1")
    .replace(/two/g, "2")
    .replace(/three/g, "3")
    .replace(/four/g, "4")
    .replace(/five/g, "5")
    .replace(/six/g, "6")
    .replace(/seven/g, "7")
    .replace(/eight/g, "8")
    .replace(/nine/g, "9");
}

const sum = in_arr.reduce((acc, line) => {
  console.log(line);
  let numbers = slidingWindow(line, 5);
  console.log(numbers);

  numbers = numbers
    .split("")
    .filter((inp) => testForNumber(inp))
    .join("");
  const num = numbers[0] + numbers.slice(-1)[0];
  return acc + parseInt(num);
}, 0);

console.log(sum);
