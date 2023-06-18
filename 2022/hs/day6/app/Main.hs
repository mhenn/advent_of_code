module Main where
import qualified Data.Set as Set

sliding :: [Char] -> Int -> Int -> Int
sliding xs size i 
        | Set.size (Set.fromList cmp) /= size  = sliding newSlide size (i + 1)
        | otherwise = i
        where newSlide = tail xs
              cmp  = take size xs

main :: IO ()
main =  do 
      content <- readFile "./res/input.txt" 
      print $ sliding content a a
      print $ sliding content b b
      where a = 4 
            b = 14
