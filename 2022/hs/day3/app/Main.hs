module Main where

import Data.Char (ord)
import Data.List.Split (chunksOf)


charToInt :: Char -> Int
charToInt = ord 

calcCharVal :: Char -> Int
calcCharVal  c
          | i <= 95   = i - 64 + 26 
          | otherwise = i - 96 
  where i = charToInt c

splitHalf :: String -> (String,String)
splitHalf input = splitAt ((length input) `div` 2) input


elemInList :: String -> String -> [Char]
elemInList x y = filter(\c -> elem c y) x

elemInThreeLists :: [String] -> Char
elemInThreeLists [a,b,c] = head $ elemInList (elemInList a b) c 
elemInThreeLists _= 'f' 

taskA:: String -> Int 
taskA = sum . map calcCharVal .  map (head) . map(\(x,y) -> elemInList x y)  . map splitHalf . lines

taskB:: String -> Int
taskB =  sum . map calcCharVal .map elemInThreeLists .chunksOf 3 . lines


main :: IO ()
main = do
  content <- readFile "./res/input.txt"
  print $ taskA  content
  print $ taskB  content
