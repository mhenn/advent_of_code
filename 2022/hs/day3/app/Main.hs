module Main where
import Data.Char (ord)


charToInt :: Char -> Int
charToInt = ord 

splitHalf :: String -> (String,String)
splitHalf input = splitAt ((length input) `div` 2) input

parse :: String -> [(String,String)]
parse =  map splitHalf . lines

taskA:: [(String,String)] -> [Int] 
taskA = map charToInt .  map (head) . map(\(x,y) -> filter (\c -> elem c y) x)

main :: IO ()
main = do
  content <- readFile "./res/test.txt"
  print (taskA (parse content))
