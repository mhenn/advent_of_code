struct Round {
    left: i8,
    right: i8,
}

fn str_to_byte_normalized(input: &str) -> i8 {
    let mut value: u8 = input.to_string().as_bytes()[0];
    if value > 80 {
        value -= 23;
    }
    (value - 64) as i8
}

fn str_to_round<'a>(input: &'a str) -> Option<Round> {
    let str_round: Vec<&str> = input.split_whitespace().collect();
    if str_round.len() != 2 {
        return None;
    }
    Some(Round {
        left: str_to_byte_normalized(str_round[0]),
        right: str_to_byte_normalized(str_round[1]),
    })
}

fn get_data<'a>() -> Vec<Round> {
    let data: &str = include_str!("./res/input.txt");
    let entries: Vec<&str> = data.split("\n").collect();
    entries.iter().filter_map(|x| str_to_round(x)).collect()
}

fn calculate_round_outcome(round: &Round) -> i8 {
    let Round { left, right } = round;
    let mut ret: i8 = right.to_owned();
    let diff: i8 = left - right;
    ret += match diff {
        0 => 3,
        -1 | 2 => 6,
        _ => 0,
    };

    ret
}

fn handle_win(inp: i8) -> i8 {
    let v = if inp == 3 { 1 } else { inp + 1 };
    v + 6
}

fn handle_loss(inp: i8) -> i8 {
    let v = if inp == 1 { 3 } else { inp - 1 };
    v
}

fn calculate_round_outcome_second(round: &Round) -> i8 {
    let Round { left, right } = round;
    let mut ret: i8 = 0;
    ret += match right {
        1 => handle_loss(left.to_owned()),
        2 => left.to_owned() + 3,
        3 => handle_win(left.to_owned()),
        _ => 0,
    };

    ret
}

fn main() {
    let data: Vec<Round> = get_data();
    let outcomes: Vec<i8> = data
        .iter()
        .map(|x| calculate_round_outcome_second(x))
        .collect();
    let total: u32 = outcomes.iter().map(|&x| x as u32).sum();
    println!("{}", total);
}
