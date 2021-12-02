$(function () {
	// part 1
	Solution1 = CountNumIncreases_1(Input_01);

	// //part 2
	Solution2 = CountNumIncreases_2(Input_01);
});

function CountNumIncreases_1 (Input) {
	let NumIncreases = 0;

	_.each(Input, (Value, Index) => {
		if(Index !== 0) {
			if(Value > Input[Index - 1]) {
				NumIncreases++;
			}	
		}
	});
	return NumIncreases;
}

function CountNumIncreases_2(Input) {
	let NumIncreases = 0;
	const InputSize = _.size(Input);

	_.each(Input, (Value, Index) => {
		if (Index !== 0 && Index < InputSize - 1) {
			const Value1 = Input[Index - 1] + Value + Input[Index + 1];
			const Value2 = Value + Input[Index + 1] + Input[Index + 2];
			if(Value2 > Value1) {
				NumIncreases++;
			}
		}
	});
	return NumIncreases;
}