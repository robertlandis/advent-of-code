const AllSlopes = [
	{
		x: 1,
		y: 1
	},
	{
		x: 3,
		y: 1
	},
	{
		x: 5,
		y: 1
	},
	{
		x: 7,
		y: 1
	},
	{
		x: 1,
		y: 2
	}
];

$(function () {
	// part 1
	Solution1 = CountTrees(Input_03, AllSlopes[1]);

	//part 2
	Solution2 = _.reduce(
		AllSlopes,
		(TotalTrees, Slope) => {
			return CountTrees(Input_03, Slope) * TotalTrees;
		},
		1
	);
});

// Part 1

function CountTrees(Input, Slope) {
	let NumTrees = 0;
	const Coordinates = {
		x: 0,
		y: 0
	};

	while (Coordinates.y < Input.length) {
		const IsTree = Input[Coordinates.y].charAt(Coordinates.x) === "#";

		if (IsTree) {
			NumTrees++;
		}

		Coordinates.x += Slope.x;
		Coordinates.y += Slope.y;

		if (Coordinates.x > Input[Coordinates.y - Slope.y].length - 1) {
			Coordinates.x = Coordinates.x - Input[Coordinates.y - Slope.y].length;
		}
	}
	return NumTrees;
}
