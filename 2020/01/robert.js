const Sum = 2020;

$(function () {
	const SortedInput = SortArray(Input_01);
	const SolutionPair = FindPairOfInts(SortedInput);
	Solution = SolutionPair.FirstInt * SolutionPair.SecondInt;
});

function SortArray(InputArray) {
	return _.sortBy(InputArray, (number) => {
		return number;
	});
}

// Part 1

function FindPairOfInts(SortedInput) {
	const FirstInt = _.find(SortedInput, (number) => {
		const Difference = Math.abs(Sum - number);
		return _.indexOf(SortedInput, Difference) > -1;
	});
	const SecondInt = Sum - FirstInt;
	return { FirstInt, SecondInt };
}
