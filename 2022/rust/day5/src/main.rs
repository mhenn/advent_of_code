use std::{fs, usize};

fn get_data<'a>(name: &str) -> Vec<String> {
    let data = fs::read_to_string(format!("src/res/{}", name)).unwrap();
    data.split("\n\n").map(|x| x.to_string()).collect()
}

fn get_start_position(data: &String) -> Vec<Vec<char>> {
    let mut ret: Vec<Vec<char>> = vec![];
    let mut break_split: Vec<&str> = data.split("\n").collect();
    break_split.pop();
    for line in break_split.iter().rev() {
        let chunks: Vec<Vec<char>> = line
            .chars()
            .collect::<Vec<char>>()
            .chunks(4)
            .map(|x| x.to_vec())
            .collect();
        let symbols: Vec<char> = chunks.iter().map(|x| x[1]).collect();

        if ret.is_empty() {
            symbols.iter().for_each(|_| ret.push(vec![]))
        }

        for (i, &v) in symbols.iter().enumerate() {
            if v != ' ' {
                ret[i].push(v);
            }
        }
    }
    ret
}

fn parse_instructions(data: &String) -> Vec<(u8, u8, u8)> {
    let split_line: Vec<&str> = data.split("\n").collect();
    let mut split_white: Vec<Vec<&str>> = split_line
        .iter()
        .map(|x| x.split_whitespace().collect())
        .collect();
    split_white = split_white.into_iter().filter(|x| !x.is_empty()).collect();
    split_white
        .iter()
        .map(|x| {
            (
                x[1].parse::<u8>().unwrap(),
                x[3].parse::<u8>().unwrap(),
                x[5].parse::<u8>().unwrap(),
            )
        })
        .collect()
}

fn apply_instructions(
    mut stacks: Vec<Vec<char>>,
    instructions: Vec<(u8, u8, u8)>,
) -> Vec<Vec<char>> {
    for (amount, from, to) in instructions {
        let am = amount as usize;
        let from_idx = (from - 1) as usize;
        let to_idx = (to - 1) as usize;
        let len = stacks[from_idx].len().min(am);
        let mut val = stacks[from_idx].split_off(len);
        val.reverse();
        stacks[to_idx].append(&mut val);
    }
    stacks
}

fn main() {
    let data = get_data("input.txt");
    let start = get_start_position(&data[0]);
    let instructions = parse_instructions(&data[1]);
    let stacks = apply_instructions(start, instructions);
    let res: Vec<char> = stacks.iter().map(|x| *x.last().unwrap()).collect();
    println!("{:?}", res);
}

#[test]
fn name() {
    let data = get_data("test.txt");
    let start = get_start_position(&data[0]);
    print!("{:?}", start);
    assert!(false)
}
