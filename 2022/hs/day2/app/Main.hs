module Main where



stateScore :: String -> Int
stateScore "WIN"  = 6
stateScore "DRAW" = 3
stateScore _      = 0

result :: String -> String -> String
result "A" "X" = "DRAW"
result "A" "Y" = "WIN"
result "A" "Z" = "LOSS"
result "B" "X" = "LOSS"
result "B" "Y" = "DRAW"
result "B" "Z" = "WIN"
result "C" "X" = "WIN"
result "C" "Y" = "LOSS"
result "C" "Z" = "DRAW"
result _ _ =  "LOSS"


tent :: String -> String -> [String]
tent "A" "X" = ["A", "Z"]
tent "A" "Y" = ["A", "X"]
tent "A" "Z" = ["A", "Y"]
tent "C" "X" = ["C", "Y"]
tent "C" "Y" = ["C", "Z"]
tent "C" "Z" = ["C", "X"]
tent a b =  [a,b]

score ::  String -> Int
score "X" = 1
score "Y" = 2
score "Z" = 3
score _ = 0

parse :: String -> [[String]]
parse =  map words . lines

taskA :: String -> Int
taskA = sum . map(\[x,y]  -> (( stateScore  (result x y)) + (score y)) ) . parse 

taskB :: String -> Int
taskB = sum . map(\[x,y]  -> (( stateScore  (result x y)) + (score y)) ) . map(\[x,y] -> tent x y) . parse 

main :: IO ()
main = do
  content <- readFile "./res/input.txt"
  print ( taskA content)
  print ( taskB content)
