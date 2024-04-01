package main

import "core:fmt"
import "core:os"
import "core:slice"
import "core:strconv"
import "core:strings"
import "core:unicode/utf8"

filepath := "./test2.txt"

task_1 :: proc(line: string) -> int {

    shortNum := make([]rune, 2)

    num: []rune = slice.filter(
        utf8.string_to_runes(line),
        proc(e: rune) -> bool {
            switch e {
            case '0' ..= '9':
                return true
            case:
                return false
            }
        },
    )

    lastElementIndex := len(num) - 1
    shortNum[0] = num[0]
    shortNum[1] = num[lastElementIndex]

    stringValue := utf8.runes_to_string(shortNum[:])
    ret, success := strconv.parse_int(stringValue)
    return ret
}


main :: proc() {
    data, ok := os.read_entire_file(filepath, context.allocator)
    it := string(data)
    res := 0

    for line in strings.split_lines_iterator(&it) {
        res += task_1(line)
    }
    fmt.println(res)
}
