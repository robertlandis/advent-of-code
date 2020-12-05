const MaxRow = [0, 127];
const MaxSeat = [0, 7];

const SeatMap = {};

$(function () {
	// part 1
	const Row = _.max(Input_05, (SeatCode) => {
		return FindSeatId(SeatCode);
	});

	Solution1 = FindSeatId(Row);

	// part 2
	BuildSeatMap();
	_.each(Input_05, (SeatCode) => {
		const SeatId = FindSeatId(SeatCode);
		if(SeatId in SeatMap) {
			SeatMap[SeatId] = true;
		}
		
	})
	// Solution2 = ValidPassports_2.valid;
});

// Part 1
function FindSeatId(SeatCode) {
	let RowRange = [...MaxRow];
	let SeatRange = [...MaxSeat];

	for (let Code of SeatCode) {
		const RowRangeDiff = (RowRange[1] - RowRange[0]) / 2;
		const SeatRangeDiff = (SeatRange[1] - SeatRange[0]) / 2;
		if (Code === "F") {
			RowRange = [RowRange[0], RowRange[1] - RowRangeDiff];
		} else if (Code == "B") {
			RowRange = [RowRange[0] + RowRangeDiff, RowRange[1]];
		} else if (Code === "L") {
			SeatRange = [SeatRange[0], SeatRange[1] - SeatRangeDiff];
		} else {
			SeatRange = [SeatRange[0] + SeatRangeDiff, SeatRange[1]];
		}
	}

	return (Math.ceil(RowRange[0]) * 8) + Math.ceil(SeatRange[0]);
}

// Part 2

function BuildSeatMap() {
	for(let x = MaxRow[0]; x <= MaxRow[1]; x++) {
		for(let y = MaxSeat[0]; y <= MaxSeat[1]; y++) {
			SeatMap[(x * 8) + y] = false;
		}
	}
}