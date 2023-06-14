module Main where
import Data.List.Split (splitOn)

parse :: String -> [[Int]]
parse =  map(map read .concatMap (splitOn "-")) .map (splitOn ",") . lines

inRange :: [Int] -> Bool
inRange [l1,r1,l2,r2] =  minimum [r1,r2] >= maximum [l1,l2] 
inRange _ = False

rangeContains:: [Int] -> Bool 
rangeContains [l1,r1,l2,r2] =  l1 <= l2 && r1 >= r2
rangeContains _ = False

rangeEncapsulates :: [Int] -> Bool
rangeEncapsulates [l1,r1,l2,r2] =  rangeContains [l1,r1,l2,r2] || rangeContains [l2,r2,l1,r1] 
rangeEncapsulates _ = False

taskA :: [[Int]] -> Int
taskA =   length . filter id . map rangeEncapsulates 

taskB :: [[Int]] -> Int
taskB =   length . filter id . map inRange

main :: IO ()
main = do
  content <- readFile "./res/input.txt"
  print $  taskA . parse $ content
  print $  taskB . parse $ content
