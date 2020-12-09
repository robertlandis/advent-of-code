const PreambleLength = 25;

$(function () {
	// part 1
	Solution1 = FindInvalidNumber();

	// part 2
	Solution2 = FindWeaknessSet(Solution1);
});

// Part 1
function FindInvalidNumber() {
	let ErrorFound, NumToCheck = false;
	let NumToCheckIndex = PreambleLength;

	do {
		NumToCheck = Input_09[NumToCheckIndex];
		const LowerBound = NumToCheckIndex - (PreambleLength); // - 1 maybe needed?
		const PossibleNumbers = Input_09.slice(LowerBound, NumToCheckIndex);

		ErrorFound = _.find(PossibleNumbers, (Num) => {
			const Difference = NumToCheck - Num;
			return _.indexOf(PossibleNumbers, Difference) > -1;
		}) ? false : true;
		
		NumToCheckIndex++;
	} while (!ErrorFound && NumToCheckIndex < Input_09.length - 1);

	return NumToCheck;
}

// Part 2
function FindWeaknessSet(InvalidNumber) {
	let StartIndex, EndIndex, NumberRange;
	
	_.find(Input_09, (_NumberToCheck, NumberIndex) => {
		StartIndex = NumberIndex;
		EndIndex = NumberIndex + 1;
		NumberRange = Input_09.slice(StartIndex, EndIndex + 1);
		let Sum = _.reduce(NumberRange, (Total, Number) => { return Total + Number; }, 0);
		while (Sum < InvalidNumber) {
			EndIndex++;
			NumberRange = Input_09.slice(StartIndex, EndIndex + 1);
			Sum = _.reduce(
				NumberRange,
				(Total, Number) => {
					return Total + Number;
				},
				0
			);
		}
		return Sum === InvalidNumber;
	})

	const MinValue = _.min(NumberRange);
	const MaxValue = _.max(NumberRange)
	return MinValue + MaxValue;

}