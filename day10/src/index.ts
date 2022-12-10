import * as fs from 'fs'
import * as readline from 'readline'

const getLine = (name:string) => {
    return readline.createInterface({input: fs.createReadStream(name)})
}


const task = async (rl) =>{

    let cycles = 0
    let x = 1
    let check = [20, 60,100,140,180,220]
    let sum = 0
    for await (let line of rl ){
        cycles++
        if(check.includes(cycles))
            sum += cycles * x
        let cmd = line.split(" ")
        if(cmd.length > 1){
            cycles++
        if(check.includes(cycles))
            sum += cycles * x

            x += parseInt(cmd[1])
        }
    }
    console.log(sum)
}

let inp = getLine('./static/input')
let test= getLine('./static/test')

task(inp)

