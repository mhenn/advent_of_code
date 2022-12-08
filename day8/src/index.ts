import * as fs from 'fs'
import * as readline from 'readline'

type Position = {
    x:number,
    y:number
}


const getLines = (name :string) => {
    return readline.createInterface({input: fs.createReadStream(name)})
}

const linesTo2D = async(rl) => {
    let result = []
    for await(let line of rl)
       result.push(line.split("").map(e => parseInt(e)))
   return result
}

const checkLine = (line: number[], start:number) =>{
    let val = line[start]
    let [scoreL,scoreR] = [0,0]

    for(let i = start -1; i >=0; i--){
        scoreL++
        if(  line[i] >=  val) break;
    }

    for(let i = start +1; i < line.length; i++){
        scoreR++;
        if(  line[i] >= val) break;
    }

    return [scoreL , scoreR]
}


const checkDirections = (forest, pos:Position) =>{
    let vertical = forest.map(e => e.filter((e,i)=> i == pos.x)).map(e => e[0])

    let [top,bottom]= checkLine(vertical, pos.y)
    let[left,right] =  checkLine(forest[pos.y], pos.x)
    return top * bottom * left*right
}

const task =async  (forest ) => {
    let pos:Position;
    let scenicScores = []
    let visibleTrees = (forest[0].length * 2) + (forest.length - 2) * 2
    for(let y = 1; y < forest.length -1; y++){
        let line = forest[y]
        for(let x = 1; x < line.length -1;x++){
            pos = {x,y}
            scenicScores.push( checkDirections(forest, pos))

        }
    }
    scenicScores.sort((a,b) => b-a)
    console.log(scenicScores)
}

let forest = await linesTo2D(getLines('./static/input'))
task(forest)
