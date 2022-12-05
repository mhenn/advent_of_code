import * as fs from 'fs'
import * as readline from 'readline'

const getLinesFromFile = (fileName: string)=>{
    return readline.createInterface({input: fs.createReadStream(fileName)})
}

const stacksFromFile = async (rl) =>{

    let stacks = Array(9).fill([])
    for await (let line of rl){
        let count = -1
        let filtered = line.split("").filter(() => (count++ % 4) ==0 || count ==1 )
        stacks = stacks.map((e,i) => filtered[i] != ' '   ? [filtered[i]].concat(e) : e)
    }
    stacks = stacks.map((e)=> e.filter((el) => el))
    return stacks
}

const instructionsFromFile = async (rl) =>{
    let instructions = []
    for await (let line of rl){
        let ins: string[] = line.split(" ").filter((e: string) => parseInt(e))
        instructions.push(ins)
    }
    return instructions
}

const restack = (stacks, instructions) =>{

    let a =0
    for(let [amount,from,to] of instructions){
        from--
        to--
        let stack = []
        for(let i = 0; i < amount; i++){
            if(stacks[from].length> 0)
                stack.unshift(stacks[from].pop())
        }
        console.log(stack)
        stacks[to] = stacks[to].concat(stack)
    }
    return stacks
}

const task1 = async () => {
    let stacks = await stacksFromFile(getLinesFromFile("./static/stack"))
    let instructions = await instructionsFromFile(getLinesFromFile("./static/input"))
    stacks = restack(stacks, instructions)
    console.log(stacks.reduce((acc,e) => e.length > 0 ? acc+= e.at(-1): acc,""))
}

task1()
