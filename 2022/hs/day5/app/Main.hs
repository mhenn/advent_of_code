module Main where

import Data.List.Split (splitOn)
import Data.List.Split (chunksOf)
import Data.List (transpose)


remWhiteSpace :: String -> String
remWhiteSpace = filter (`notElem` [' ', '[', ']'])


parseStack :: String -> [[String]]
parseStack =   map(filter(not . null)) . map(map (remWhiteSpace)). transpose . map( chunksOf 4) . lines 

toInt :: [Char] -> Int
toInt = read  

toTriplet :: [String] -> (Int,Int,Int)
toTriplet [_,x,_,y,_,z] = ( toInt x,  toInt y,  toInt z) 
toTriplet _ = (0,0,0)

parseCommands :: String -> [(Int,Int,Int)]
parseCommands = map toTriplet . map words . lines


taskA :: [[String]] -> (Int,Int,Int) -> [String]
taskA = -- TODO

taskB :: [[String]] -> (Int,Int,Int) -> [String]
taskB = -- TODO 

main :: IO ()
main = do
  content <- readFile "./res/test.txt"
  let splitContent = splitOn "\n\n" content
  let stack =  parseStack (splitContent !! 0)
  let commands =  parseCommands (splitContent !! 1)
  print stack 
  print commands 
