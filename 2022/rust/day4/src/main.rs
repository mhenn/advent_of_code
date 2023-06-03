use std::ops::RangeInclusive;

fn get_data<'a>() -> Vec<&'a str> {
    let data = include_str!("./res/input.txt");
    data.split("\n").collect()
}

fn to_range(input: Vec<&str>) -> RangeInclusive<i32> {
    let start: i32 = input[0].parse::<i32>().unwrap();
    let end: i32 = input[1].parse::<i32>().unwrap();
    start..=end
}

fn convert_data(data: Vec<&str>) -> Vec<(RangeInclusive<i32>, RangeInclusive<i32>)> {
    let mut ret: Vec<RangeInclusive<i32>> = vec![];
    for line in data {
        let c_split: Vec<&str> = line.split(',').filter(|&x| x != "").collect();
        ret.extend(c_split.iter().map(|x| to_range(x.split("-").collect())));
    }
    ret.chunks_exact(2)
        .map(|chunk| (chunk[0].clone(), chunk[1].clone()))
        .collect()
}

fn encapsulates_another(left: &RangeInclusive<i32>, right: &RangeInclusive<i32>) -> bool {
    left.start() <= right.start() && left.end() >= right.end()
}

fn check_ranges(ranges: &(RangeInclusive<i32>, RangeInclusive<i32>)) -> bool {
    let (left, right) = ranges;
    encapsulates_another(&left, &right) || encapsulates_another(&right, &left)
}

fn main() {
    let data: Vec<&str> = get_data();
    let converted_data = convert_data(data);
    let result_list: Vec<bool> = converted_data
        .iter()
        .map(|ranges| check_ranges(ranges))
        .filter(|&x| x)
        .collect();
    println!("{}", result_list.len());
}
