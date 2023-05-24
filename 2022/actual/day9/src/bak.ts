import { Console } from 'console'
import * as fs from 'fs'
import * as readline from 'readline'



type Grid = {
    body: boolean[][],
    h: Pos
    t: Pos
}


type Pos = {
    x:number,
    y:number
}

const getLine = (name:string) =>{
    return readline.createInterface({input: fs.createReadStream(name)})
}



const initGrid = ( size:number) =>{
    let body = Array(size)
    for(let i =0; i < size; i++)
        body[i] = Array(size).fill(false)
    let grid : Grid = { body: body,
        h:{x:0,y:0}, t:{x:0,y:0}}
    grid.body[0][0] = true
    return grid
}


const pullTail = (grid:Grid) => {

    let {x:tx,y:ty} = grid.t
    let {x:hx,y:hy} = grid.h

    let [x,y] = [Math.abs(hx-tx), Math.abs(hy-ty)]

    let d:string = x +"" + y
    let sym = "t"

    switch(d){
        case "20":
            hx > tx ? right(sym,grid): left(sym, grid)
        break;
        case "02":
            hy > ty ? up(sym,grid): down(sym, grid)
            break;
        case "21":
            hy > ty ? up(sym,grid): down(sym, grid)
            hx > tx ? right(sym,grid): left(sym, grid)
            break;
        case "12":
            hy > ty ? up(sym,grid): down(sym, grid)
            hx > tx ? right(sym,grid): left(sym, grid)
            break;
    }

    let {x:txn,y:tyn} = grid.t
    grid.body[tyn][txn] = true

}

const left = (sym: string, grid:Grid) => {
    if(grid[sym].x > 0)
        grid[sym].x--
}

const right = (sym: string, grid:Grid) => {
    if(grid[sym].x < grid.body[0].length-1)
        grid[sym].x++
}

const up = (sym: string, grid:Grid) => {
    if(grid[sym].y < grid.body.length-1)
        grid[sym].y++
}

const down = (sym: string, grid:Grid) => {
    if(grid[sym].y > 0)
        grid[sym].y--
}

const move = (dir:string, steps:number, grid: Grid) =>{

    const movement = {"R": right, "L": left, "U":up, "D":down}
 //   console.log("--------" + dir + " " +steps + "--------------")
    for(let i = 0; i < steps; i++){
        movement[dir]("h", grid)
        pullTail(grid)
//        printGrid(grid)
    }
}

const printGrid = (grid:Grid) =>{

    let {x:tx,y:ty} = grid.t
    let {x:hx,y:hy} = grid.h
    let s = ""

    for(let y in grid.body){
        s = ""
        for(let x in  grid.body[y]){
            if (x == tx && y == ty){
                s += "T"
                continue
            }
            if (x == hx && y == hy){
                s += "H"
                continue
            }
            s += "*"
        }
        console.log(s)
    }
    console.log()
}

const printGridMov = (grid:Grid) =>{

    let s = ""

    for(let y in grid.body){
        s = ""
        for(let x in  grid.body[y]){
            if (grid.body[y][x]){
                s += "#"
                continue
            }
            s += "*"
        }
        console.log(s)
    }
    console.log()
}




const task = async (rl) => {

    let grid = initGrid(6 )
    for await(let line of rl){
        let [dir, steps] = line.split(" ")
        move(dir,parseInt(steps), grid)
    }
    printGridMov(grid)
    console.log(grid.body.reduce((acc,e) =>  acc + e.reduce((a,l)=> l? a+1 :a,0) ,0))
}


task(getLine('./static/test'))
