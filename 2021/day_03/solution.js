let TestInput = ["00100", "11110", "10110", "10111", "10101", "01111", "00111", "11100", "10000", "11001", "00010", "01010"];

$(function () {
	// part 1
	// console.log({ Input_03 });
	const Results = CalculatePowerConsumption(Input_03);
	Solution1 = Results.PowerConsumption;

	// //part 2
	Solution2 = Results.LifeSupport;
});

function FindCommonBits(Input) {
	const CounterTemplate = {
		0: 0,
		1: 0
	};

	const Counts = {};

	_.each(Input, (BinaryString) => {
		_.each(BinaryString, (Character, Index) => {
			if (!_.has(Counts, Index)) {
				Counts[Index] = { ...CounterTemplate };
			}
			Counts[Index][Character]++;
		});
	});

	return Counts;
}

function CalculateGammaAndEpsilon(Counts) {
	let GammaBinary = [];
	let EpsilonBinary = [];
	let Gamma = (Epsilon = 0);

	_.each(Counts, (CountForIndex, Index) => {
		if (CountForIndex[0] > CountForIndex[1]) {
			GammaBinary[Index] = "0";
			EpsilonBinary[Index] = "1";
		} else {
			GammaBinary[Index] = "1";
			EpsilonBinary[Index] = "0";
		}
	});
	GammaBinary = GammaBinary.join("");
	EpsilonBinary = EpsilonBinary.join("");
	Gamma = parseInt(GammaBinary, 2);
	Epsilon = parseInt(EpsilonBinary, 2);
	return { Gamma, Epsilon };
}

function CalculateRatings(Input) {
	OxygenRating = C02ScrubberRating = 0;
	let OxygenList = [...Input];
	let C02List = [...Input];

	const MaxLength = Input[0].length;
	let CurrentIndex = 0;

	while (CurrentIndex < MaxLength && OxygenList.length > 1) {
		const CountsForIndex = FindCommonBits(OxygenList)[CurrentIndex];
		const CommonChar = CountsForIndex[0] > CountsForIndex[1] ? "0" : "1";
		OxygenList = _.filter(OxygenList, (BinaryString) => {
			return BinaryString[CurrentIndex] === CommonChar;
		})
		CurrentIndex++;
	}

	CurrentIndex = 0;

	while (CurrentIndex < MaxLength && C02List.length > 1) {
		const CountsForIndex = FindCommonBits(C02List)[CurrentIndex];
		const CommonChar = CountsForIndex[0] <= CountsForIndex[1] ? "0" : "1";
		C02List = _.filter(C02List, (BinaryString) => {
			return BinaryString[CurrentIndex] === CommonChar;
		})
		CurrentIndex++;
	}

	OxygenRating = parseInt(OxygenList[0], 2);
	C02ScrubberRating = parseInt(C02List[0], 2);
	return {
		OxygenRating,
		C02ScrubberRating
	};
}

function CalculatePowerConsumption(Input) {
	const Counts = FindCommonBits(Input);
	const { Gamma, Epsilon } = CalculateGammaAndEpsilon(Counts);
	const { OxygenRating, C02ScrubberRating } = CalculateRatings(Input);
	return {
		PowerConsumption: Gamma * Epsilon,
		LifeSupport: OxygenRating * C02ScrubberRating
	};
}
