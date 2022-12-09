import * as fs from 'fs'
import * as readline from 'readline'


type Pos = {
    x:number,
    y:number
}

const getLine = (name:string) =>{
    return readline.createInterface({input: fs.createReadStream(name)})
}

const pullTail = (h:Pos,t:Pos) => {

    let [x,y] = [Math.abs(h.x-t.x), Math.abs(h.y-t.y)]
    let d:string = x +"" + y

    switch(d){
        case "20":
            t = h.x > t.x ? right(t): left(t )
        break;
        case "02":
            t = h.y > t.y ? up(t): down( t)
            break;
        case "21":
            t = h.y > t.y ? up(t): down( t)
            t = h.x > t.x ? right(t): left( t)
            break;
        case "12":
            t = h.y > t.y ? up(t): down( t)
            t = h.x > t.x ? right(t): left( t)
            break;
    }

    return t
}

const left = (pos: Pos) => {
    return {x:--pos.x, y:pos.y}
}

const right = (pos: Pos) => {
    return {x:++pos.x, y:pos.y}
}

const up =  (pos: Pos) => {
    return {x:pos.x, y:++pos.y}
}

const down = (pos: Pos) => {
    return {x:pos.x, y:--pos.y}
}

const move = (dir:string, steps:number , positions: Pos[], visited:Set<string>) =>{

    let h = positions[0]
    let t = positions[1]

    const movement = {"R": right, "L": left, "U":up, "D":down}
    for(let i = 0; i < steps; i++){
        h = movement[dir](h)
        t =  pullTail(h,t)
        visited.add(t.x+""+t.y)
    }
}


const task = async (rl) => {

    let visited = new Set<string>()
    let positions = [{x:0,y:0},{x:0,y:0}]
    for await(let line of rl){
        let [dir, steps] = line.split(" ")
        move(dir,parseInt(steps),positions, visited )
    }
    console.log(visited.size)
//    console.log(grid.body.reduce((acc,e) =>  acc + e.reduce((a,l)=> l? a+1 :a,0) ,0))
}


task(getLine('./static/input'))
