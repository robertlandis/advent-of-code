// Input_10 = [
// 	16,
// 	10,
// 	15,
// 	5,
// 	1,
// 	11,
// 	7,
// 	19,
// 	6,
// 	12,
// 	4,
// ];

$(function () {
	// part 1
	Solution1 = FindChargerSpread(Input_10);

	// part 2
	// Solution2 = FindWeaknessSet(Solution1);
});

// Part 1
function FindChargerSpread(Adapters) {
	const SortedAdapters = _.sortBy(Adapters, number => number);
	const Spreads = {
		1: 0,
		2: 0,
		3: 0
	};

	const MaxJoltage = _.last(SortedAdapters) + 3;
	SortedAdapters.push(MaxJoltage);
	let CurrentJoltage = 0;

	_.each(SortedAdapters, (Adapter, Index) => {
		const Difference = Adapter - CurrentJoltage;
		if(Difference < 4 && Difference != 0) {
			Spreads[Difference]++;
			CurrentJoltage += Difference;
		}
	})

	return Spreads[1] * Spreads[3];
}

// Part 2
