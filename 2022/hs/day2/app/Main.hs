module Main where



result :: String -> String -> Int
result "A" "Y" = 1
result "B" "X" = 2
result "C" "Z" = 3
result _ _ = 0

parse :: String -> [[String]]
parse =  map words . lines

taskA :: String -> [Int]
taskA = map(\[x,y]  -> result x y) . parse 

main :: IO ()
main = do
  content <- readFile "./res/test.txt"
  print ( taskA content)
