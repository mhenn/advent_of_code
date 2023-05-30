use std::collections::HashMap;

struct Rucksack {
    left: String,
    right: String,
}

fn get_data<'a>() -> Vec<&'a str> {
    let data: &str = include_str!("./res/test.txt");
    data.split("\n").collect()
}

fn partition_content<'a>(rucksack_content: &'a str) -> Rucksack {
    let content_length = rucksack_content.len();
    let (left, right) = rucksack_content.split_at(content_length / 2);
    Rucksack {
        left: left.to_string(),
        right: right.to_string(),
    }
}

fn get_common_symbol(rucksack: &Rucksack) -> Option<char> {
    let mut common: HashMap<char, u8> = HashMap::new();
    let mut return_symbol: Option<char> = None;

    for symbol in rucksack.left.chars() {
        if !common.contains_key(&symbol) {
            common.insert(symbol, 1);
        }
    }

    for symbol in rucksack.right.chars() {
        if common.contains_key(&symbol) {
            return_symbol = Some(symbol);
            break;
        }
    }
    return_symbol
}

fn get_common_group_symbol(group: (String, String, String)) -> Option<char> {
    let mut return_symbol: Option<char> = None;
    return_symbol
}

fn symbol_to_priority(symbol: char) -> u32 {
    let value = symbol as u32;
    if symbol.is_uppercase() {
        value - 64 + 26
    } else {
        value - 96
    }
}

fn part_a(content: Vec<&str>) -> u32 {
    let partitioned_rucksacks: Vec<Rucksack> =
        content.into_iter().map(|x| partition_content(x)).collect();
    let symbols: Vec<char> = partitioned_rucksacks
        .iter()
        .map(|x| get_common_symbol(x))
        .flatten()
        .collect();
    symbols.iter().map(|&x| symbol_to_priority(x)).sum()
}

fn main() {
    let content = get_data();
    //let prio: u32 = part_a(content);
    println!("{}", prio);
}
