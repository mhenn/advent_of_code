var fs = require('fs');
var readline = require('readline')
//Opponent  A: Rock(1), B: Paper(2), C: Scissors(3)
//Player    X: Rock(1), Y: Paper(2), Z: Scissors(3)
// Win: 6pts, Draw: 3pts, Loss: 0pts

type OpponentKey = "A" | "B" | "C"
type PlayerKey = "X" | "Y" | "Z"

const Decision = {
    X: 1,
    Y: 2,
    Z: 3
}

const OutcomeScore = {
    Loss: 0,
    Draw: 3,
    Win: 6
}

const Matchup = {
    A: {
        X: "Draw",
        Y: "Win",
        Z: "Loss"
    },
    B:{
        X: "Loss",
        Y: "Draw",
        Z: "Win"
    },
    C:{
        X: "Win",
        Y: "Loss",
        Z: "Draw"
    }
}


function reverse(Matchup){
    let reversed = {}
    for(const key in Matchup){
        let rev = Object.entries(Matchup[key]).map(([k,v]) => [v,k])
        reversed[key] = Object.fromEntries(rev)
    }
    return reversed
}


const GameOutcome = {
    X: "Loss",
    Y: "Draw",
    Z: "Win"
}

function calculateScore(opponent: OpponentKey, player: PlayerKey ){
    return Decision[player] + OutcomeScore[Matchup[opponent][player]]
}

function calcRoundTwo(opponent: OpponentKey, outcome: PlayerKey , matchup){
    const state = GameOutcome[outcome]
    const decisionScore =Decision[matchup[opponent][state]]
    return OutcomeScore[state] + decisionScore
}

async function main(){
    let sum = 0
    let match = reverse(Matchup)
    const rl = readline.createInterface({input: fs.createReadStream("./static/input")})
    for await(const line of rl){
        let [opponent, player] = line.split(" ")
        //sum += calculateScore(opponent, player)
        sum += calcRoundTwo(opponent, player, match)

    }
    console.log(sum)
}
main()
