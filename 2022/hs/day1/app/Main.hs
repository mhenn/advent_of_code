module Main where

import Data.List.Split (splitWhen)
import Data.Either (rights, isLeft)
import Data.Text.Read (Reader)
import Data.Text as T (null)
import Data.Text (Text)
import qualified Data.Text.Read as T (decimal)
import qualified Data.Text as T (lines)
import qualified Data.Text.IO as TIO
import Data.List (sort)
import Data.Ord (comparing)

readLine :: Reader a -> Text -> Either String a
readLine reader input = do
            (a, t) <- reader input
            if T.null t then Right a else Left "failed parse" 

parse :: Text -> [Int]
parse =  map(sum . rights) . (splitWhen isLeft) . map(readLine T.decimal) . T.lines

taskA :: Text -> Int
taskA = maximum . parse

taskB :: Text -> Int
taskB = sum . take 3 . reverse . sort . parse

main :: IO ()
main = do
    content <- TIO.readFile "./res/input.txt"
    print (taskA content)
    print (taskB content)

