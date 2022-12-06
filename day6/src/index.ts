import * as fs from 'fs'


const readFile = (name:string, fn)=>{

    fs.readFile(name, 'utf8', (err, data) =>{
        console.log(parseInt(fn(data,14)) + 1 )
    })
}


const isMarker = (seq:string) => {
    let map = {}
    for(let char of seq){
        if(map[char])
            return false
        map[char] = true
    }
    return true
}

const getMarkerIndex = (data: string, length: number) =>{
    let sliding = ''
    let char
    for(let i in data.split("")){
        char = data[i]
        sliding += char
        if(sliding.length == length){
            if(isMarker(sliding))
                return i
            sliding = sliding.slice(1)

        }
    }
}

const task = () => {
    readFile("./static/test", getMarkerIndex)
}

task()
