const input = Deno.readTextFileSync('./test2.txt');

const in_arr = input.split('\n').filter(i => i);

const worded = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']


function testForNumber(input:string): boolean{
  if(parseInt(input)){
    return true;
  }
  return false;
}





const sum = in_arr.reduce((acc,line) => {
  console.log(line)
  const numbers = line.split('').filter(inp => testForNumber(inp)).join('')
  const num = numbers[0] + numbers.slice(-1)[0] 
  return acc + parseInt(num);

}, 0);


console.log(sum)
