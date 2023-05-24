import * as fs from 'fs';
import * as readline from 'readline';



const splitHalf = (line:string) =>{
    let splitIndex = Math.ceil(line.length / 2)
    let start = line.split("").splice(0, splitIndex)
    let rest = line.split("").splice(-splitIndex)
    return [start, rest]
}

const getCharValue = (char: string) =>{
   return char == char.toLowerCase()
       ? char.charCodeAt(0) -96
       : char.charCodeAt(0) -38
}


const getDuplicates = (left:string[], right:string[]) => {
    return  left.filter((e) => right.includes(e))

}

const task1 = async (text) =>{

    let sum = 0
    for await(let line of text){
        let [left, right] = splitHalf(line)
        let duplicate = getDuplicates(left,right)[0]
        sum+= getCharValue(duplicate)
    }
    return sum
}

const task2 = async (text) =>{

    let sum =0
    let group = []
    for await(let line of text){
        if(group.length < 2){
            group.push(line)
            continue
        }
        group.push(line)
        group = group.map((e) => e.split(""))
        let [left, middle, right] = group
        let dups = getDuplicates(left, middle)
        dups = getDuplicates(dups, right)
        dups = dups.filter((v,i,a) => a.indexOf(v) ==i)
        sum+= getCharValue(dups[0])
        group = []

    }
    return sum

}

const rl = readline.createInterface({input: fs.createReadStream("./static/input")})
console.log(await task1(rl))
console.log(await task2(rl))
