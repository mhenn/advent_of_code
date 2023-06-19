module Main where

data Tree a = Leaf a | Node a [Tree a]

tree :: Tree (Int, String, Int)
tree = Node (0, "/", 0)
    [Node (1,"a", 1)[ Leaf (2,"t", 2)],
     Leaf (3, "c", 3)
     ]

bfs :: Tree a -> [a]
bfs (Leaf x) = [x]
bfs (Node x []) = [x]
bfs (Node x xs) = x: concat (map bfs xs)

applyCmd :: [Char] -> 

taskA :: [String] -> [(String,String,Int)]
taskA =  map  . tail . lines 

main :: IO ()
main = do
  content <- readFile "./res/test.txt"
  print $ bfs tree
