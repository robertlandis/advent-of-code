$(function () {
	// part 1
	Solution1 = ParseDirections_1(Input_02);

	// //part 2
	Solution2 = ParseDirections_2(Input_02);
});

function ParseDirections_1(Input) {
	let Horizontal = Depth = 0;

	_.each(Input, (Directions) => {
		let [ Direction, Amount ] = Directions.split(" ");
		Amount = parseInt(Amount, 10);
		switch(Direction) {
			case "up":
				Depth -= Amount;
				break;
			case "forward":
				Horizontal += Amount;
				break;
			case "down":
				Depth += Amount;
				break;
		}
	});
	return Horizontal * Depth;
}

function ParseDirections_2(Input) {
	let Horizontal = (Depth = Aim = 0);
	console.log({ Horizontal, Depth, Aim });

	_.each(Input, (Directions) => {
		let [Direction, Amount] = Directions.split(" ");
		// console.log({ Direction, Amount });
		Amount = parseInt(Amount, 10);
		switch (Direction) {
			case "up":
				Aim -= Amount;
				break;
			case "forward":
				Horizontal += Amount;
				Depth += Aim * Amount;
				break;
			case "down":
				Aim += Amount;
				break;
		}
	});
	console.log({ Horizontal, Depth, Aim });
	return Horizontal * Depth;
}