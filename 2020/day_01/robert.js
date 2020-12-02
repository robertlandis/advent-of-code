const Sum = 2020;
const DefaultBounds = { LowestValue: 0, HighestValue: 2020 }

$(function () {
	const SortedInput = SortArray(Input_01);

	// part 1
	const SolutionPair1 = FindPairOfInts(SortedInput, Sum);
	Solution1 = SolutionPair1.FirstInt * SolutionPair1.SecondInt;

	//part 2
	const SolutionSet2 = FindSetOfInts(SortedInput);
	Solution2 = SolutionSet2.FirstInt * SolutionSet2.SecondInt * SolutionSet2.ThirdInt;
});

function SortArray(InputArray) {
	return _.sortBy(InputArray, (number) => {
		return number;
	});
}

// Part 1

function FindPairOfInts(SortedInput, SumToMatch) {
	const FirstInt = _.find(SortedInput, (number) => {
		const Difference = Math.abs(SumToMatch - number);
		if(Difference < SortedInput[0]) {
			return false;
		}
		return _.indexOf(SortedInput, Difference) > -1;
	});
	const SecondInt = SumToMatch - FirstInt;
	return { FirstInt, SecondInt };
}

// Part 2

function FindSetOfInts(SortedInput) {
	const LowestValue = SortedInput[0];
	let OtherPair;

	const ThirdInt = _.find(SortedInput, (number, index) => {
		const Difference = Math.abs(Sum - number);
		const FilteredInput = _.filter(SortedInput, (number) => { return number < Difference; });
		if(FilteredInput.length < 2) {
			return false;
		}

		if(Difference > LowestValue) {
			OtherPair = FindPairOfInts(FilteredInput, Difference);
			if(OtherPair) {
				return true;
			}
		}
		return false;
	})

	OtherPair.ThirdInt = ThirdInt;
	return OtherPair;
}