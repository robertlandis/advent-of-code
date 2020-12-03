let Coordinates = {
	x: 0,
	y: 0
};

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
	let TotalTrees = 1;
	_.each(AllSlopes, (Slope) => {
		Coordinates = {x: 0, y:0}
		TotalTrees *= CountTrees(Input_03, Slope);
	})
	Solution2 = TotalTrees;
});

// Part 1

function CountTrees(Input, Slope) {
	let NumTrees = 0;

	while (Coordinates.y < Input.length) {		
		const IsTree = Input[Coordinates.y].charAt(Coordinates.x) === "#";

		if (IsTree) {
			NumTrees++;
		}

		if(Coordinates.y < Input.length){
			Coordinates.x += Slope.x;

			if (Coordinates.x > Input[Coordinates.y].length - 1) {
				Coordinates.x = Coordinates.x - Input[Coordinates.y].length;
			}
		}

		Coordinates.y += Slope.y;
	}
	return NumTrees;
}

// Part 2
