var fs = require('fs')
const { argv0 } = require('process')
var readline = require('readline')


function getData(){

    r = readline.createInterface({input: fs.createReadStream("./static/input")})

    return r
}

function main(data){
    let sum = 0
    let max = 0
    let arr = []

    data.on('line', (text) =>{
        if(!text){
            if(sum > max){
                max = sum
            }
            arr.push(sum)
            sum = 0

        } else if(text && text != 'q'){
            sum += parseInt(text)
        }
        if(text == 'q'){
            arr.sort((a,b) => b - a)
            console.log(arr[0] + arr[1] + arr[2])
        }
    })
}

main(getData())
