fn main() {
    let data: String = include_str!("./res/input.txt").to_string();
    let mut calories: Vec<u32> = data
        .split("\n\n")
        .map(|x| x.split("\n").map(|s| s.parse::<u32>().ok()).flatten().sum())
        .collect();
    calories.sort_by(|a, b| b.cmp(a));
    println!("{:?}", calories[0..3].iter().sum::<u32>());
}
