module Main where

import Data.List.Split (splitOn)
import Data.List.Split (chunksOf)
import Data.List (transpose, foldl')

remWhiteSpace :: String -> String
remWhiteSpace = filter (`notElem` [' ', '[', ']'])

setNth :: [[a]] -> Int -> [a] -> [[a]]
setNth [] _ _ = error "Empty List"
setNth (_:xs) 0 v = v:xs
setNth (x:xs) i v = x : setNth xs (i -1) v

parseStack :: String -> [[String]]
parseStack =   map(filter(not . null)) . map(map (remWhiteSpace)). transpose . map( chunksOf 4) . lines 

toInt :: [Char] -> Int
toInt = read  

toTriplet :: [String] -> (Int,Int,Int)
toTriplet [_,x,_,y,_,z] = ( toInt x,  toInt y,  toInt z) 
toTriplet _ = (0,0,0)

popFront :: [a] -> (a, [a])
popFront [] = error "Empty List"
popFront (x:xs) = (x,xs)

parseCommands :: String -> [(Int,Int,Int)]
parseCommands = map toTriplet . map words . lines

updStackA :: [[String]] -> (Int, Int) -> [[String]]
updStackA stack (f, t)=  setNth newStack to newTo 
          where newStack = setNth stack from xs
                newTo = x : stack !! to 
                (x, xs) = popFront $ stack !! from
                to = t -1
                from = f -1

updStack :: [[String]] -> (Int, Int, Int) -> [[String]]
updStack stack (i, f, t)  = setNth newStack to newTo 
          where newStack  = setNth stack from xs
                newTo     = x ++ oldTo
                (x, xs)   = (take i oldFrom, drop i oldFrom) 
                oldFrom   = stack !! from
                oldTo     = stack !! to
                from      = f -1
                to        = t -1

applyCmd :: [[String]] -> (Int, Int, Int) -> [[String]]
applyCmd stack (0,_,_) = stack
applyCmd stack (i,f,t) = applyCmd (updStack stack (i,f,t)) (x,f,t)
        where x = i -1

task :: [[String]] -> [(Int, Int, Int)] -> [[String]]
task stack cmds =  (foldl' applyCmd  stack) cmds 

main :: IO ()
main = do
  content <- readFile "./res/test.txt"
  let splitContent = splitOn "\n\n" content
  let stack =  parseStack (splitContent !! 0)
  let commands =  parseCommands (splitContent !! 1)
  print stack 
  print commands 
  print $  task stack commands
