
$(function () {
	const SortedAdapters = _.sortBy(Input_10, (number) => number);
	const MaxJoltage = _.last(SortedAdapters) + 3;
	SortedAdapters.push(MaxJoltage);

	// part 1
	Solution1 = FindChargerSpread(SortedAdapters);

	// part 2
	Solution2 = BreakInputApart(SortedAdapters);
});

// Part 1
function FindChargerSpread(SortedAdapters) {
	const Spreads = {
		1: 0,
		2: 0,
		3: 0
	};
	let CurrentJoltage = 0;

	_.each(SortedAdapters, (Adapter) => {
		const Difference = Adapter - CurrentJoltage;
		if (Difference < 4 && Difference != 0) {
			Spreads[Difference]++;
			CurrentJoltage += Difference;
		}
	});
	return Spreads[1] * Spreads[3];
}

// Part 2
