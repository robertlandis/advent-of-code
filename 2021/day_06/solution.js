Input_06 = "3,4,3,1,2";

$(function () {
	// part 1
	const InputArray = ConvertDataToArray(Input_06);
	Solution1 = PassDays(InputArray, 80);

	// //part 2
	// Solution2 = PlotLines(AllLines, Graph, false);
});

function ConvertDataToArray(Input) {
	Input = Input.split(",");
	Input = _.map(Input, (Row) => parseInt(Row, 10));
	return Input;
}

function EndDay(Input) {
	// let BabieksToAdd = 0;

	_.each(Input, (Row, Index) => {
		if (Row === 0) {
			//start again
			Row = 6;
			// BabiesToAdd++; 
			Input.push(8)
		} else {
			Row--;
		}
		Input[Index] = Row;
	});

	// if (BabiesToAdd) {
	// 	while (BabiesToAdd > 0) {
	// 		Input.push(8);
	// 		BabiesToAdd--;
	// 	}
	// }

	return Input;
}

function PassDays(Input, DaysToPass) {
	while (DaysToPass > 0) {
		EndDay(Input);
		DaysToPass--;
	}
	return Input.length;
}