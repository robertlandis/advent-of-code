$(function () {
	// process data
	const ProcessedData = CalculateElfCalories(Input_01);
	// part 1
	Solution1 = ProcessedData[0];

	// //part 2
	Solution2 = DetermineThreeHighestCalElves(ProcessedData);
});

function CalculateElfCalories(RawData) {
	const Split = RawData.split(";");

	const TotalsByElf = Split.map((ElfFood) => {
		const Items = ElfFood.split(",");
		return Items.reduce((Item, Total) => parseInt(Item, 10) + parseInt(Total, 10), 0);
	});

	TotalsByElf.sort((a, b) => {
		return b - a;
	});

	return TotalsByElf;
}

function DetermineThreeHighestCalElves(ProcessedData) {
	return ProcessedData[0] + ProcessedData[1] + ProcessedData[2];
}