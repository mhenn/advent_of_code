import * as fs from 'fs'
import * as readline from 'readline'

const inRange = (r1:number[] , r2:number[]):boolean =>{
    const cmp = (l,r) => l[0] <= r[0] && r[1] <= l[1]
    return  cmp(r1,r2) || cmp(r2,r1)
}

const rangeOverlap = (r1: number[], r2:number[]): boolean =>{
    const cmp = (l, r) => l.map((e) => inRange([e,e],r)).reduce((acc,e) => acc ||e,false )
    let ret =  cmp(r1,r2) || cmp(r2,r1)
    return ret
}

const splitToRanges = (line:string) => {
    return line.split(",").map((e:string)=> e.split("-").map((e:string) => parseInt(e)))
}

const task = async (rl, fn) => {
    let sum = 0
    for await(let line of rl){
        let [left, right] = splitToRanges(line)
        sum += fn(left,right)? 1:0
    }
    console.log(sum)
}


const rl = readline.createInterface({input : fs.createReadStream('./static/input')})
// First Task
//task(rl,inRange)
// Second Task
task(rl,rangeOverlap)
