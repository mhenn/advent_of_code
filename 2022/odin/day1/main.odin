package main

import "core:fmt"
import "core:os"
import "core:strings"

read_file :: proc(filepath: string) -> []u8 {
	data, ok := os.read_entire_file(filepath, context.allocator)
	return data
}

main :: proc() {
	data := read_file("./test.txt")
	defer delete(data, context.allocator)
	it := string(data)

	for line in strings.split_lines_iterator(&it) {
		fmt.println(line)
	}

}
