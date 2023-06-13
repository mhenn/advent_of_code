module Main where
import Data.List.Split (splitOn)

parse :: String -> [[String]]
parse =  map(concatMap (splitOn "-")) .map (splitOn ",") . lines

inRange :: [String] -> Bool
inRange [l1,r1,l2,r2] = True --TODO
inRange _ = False

main :: IO ()
main = do
  content <- readFile "./res/test.txt"
  print $ parse content
