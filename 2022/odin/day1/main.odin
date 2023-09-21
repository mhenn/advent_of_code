package main

import "core:fmt"
import "core:os"
import "core:strconv"
import "core:strings"

Elf :: struct {
	capacity: int,
	rations:  [dynamic]int,
}

read_file :: proc(filepath: string) -> []u8 {
	data, ok := os.read_entire_file(filepath, context.allocator)
	return data
}

sum :: proc(nums: ..int) -> (sum: int) {
	for n in nums do sum += n
	return
}

main :: proc() {
	data := read_file("./test.txt")
	defer delete(data, context.allocator)
	it := string(data)

	elf_caravan: [dynamic]Elf
	elf: Elf = Elf{}

	for line in strings.split_lines_iterator(&it) {
		n, ok := strconv.parse_int(line)
		if ok do append_elem(&elf.rations, n)

		if len(line) == 0 {
			elf.capacity = sum(..elf.rations[:])
			fmt.println(elf)
			append(&elf_caravan, elf)
			elf = Elf{}

		}
	}
}
