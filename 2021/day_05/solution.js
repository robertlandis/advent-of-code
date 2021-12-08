const MaxGrid = { x: 999, y: 999 };

$(function () {
	// part 1
	const AllLines = PrepData(Input_05);
	let Graph = CreateCard(MaxGrid);
	Solution1 = PlotLines(AllLines, Graph, true);

	// //part 2
	Graph = CreateCard(MaxGrid);
	Solution2 = PlotLines(AllLines, Graph, false);
});

function PrepData(Input, IgnoreDiagonals) {
	let NewData = {};
	_.each(Input, (Row, Index) => {
		const [x1, y1, x2, y2] = Row.replace(" -> ", ",").split(",");
		const RowInfo = {
			x1: parseInt(x1, 10),
			y1: parseInt(y1, 10),
			x2: parseInt(x2, 10),
			y2: parseInt(y2, 10)
		};

		if (x1 === x2) {
			RowInfo.Direction = "Vertical";
			RowInfo.Slope = Math.abs(y2 - y1);
		} else if (y1 === y2) {
			RowInfo.Direction = "Horizontal";
			RowInfo.Slope = Math.abs(x2 - x1);
		} else {
			RowInfo.Direction = "Diagonal";
			RowInfo.SlopeX = x2 - x1;
			RowInfo.SlopeY = y2 - y1;
		}

		if (RowInfo.Direction) {
			NewData[Index] = RowInfo;
		}
	})

	return NewData;
};

function CreateCard(GridSize) {
	const Card = [];
	const Array_Y = [];

	for (let y = 0; y <= GridSize.y; y++) {
		Array_Y.push(0);
	}

	for (let x = 0; x <= GridSize.x; x++) {
		Card.push([...Array_Y]);
	}

	return Card;
}

function PlotLines(Coordinates, Graph, IgnoreDiagonals) {
	_.each(Coordinates, (CoordInfo) => {
		let {
			x1,
			y1,
			x2,
			y2,
			Direction,
			Slope
		} = CoordInfo;


		if (Direction == "Horizontal") {
			let StartX = x1 < x2 ? x1 : x2;
			while (Slope >= 0) {
				Graph[y1][StartX]++;
				StartX++;
				Slope--;
			}
		} else if (Direction == "Vertical") {
			let StartY = y1 < y2 ? y1 : y2;
			while (Slope >= 0) {
				Graph[StartY][x1]++;
				StartY++;
				Slope--;
			}
		} else if (!IgnoreDiagonals && Direction == "Diagonal") {
			let StartX = x1;
			let StartY = y1;
			const { SlopeX, SlopeY } = CoordInfo;
			let LastRun = false;

			while ((StartX != x2 && StartY != y2) || LastRun) {
				Graph[StartY][StartX]++;
				
				if(LastRun) {
					LastRun = false;
				} else {
					SlopeX > 0 ? StartX++ : StartX--;
					SlopeY > 0 ? StartY++ : StartY--;
					if (StartX == x2 || StartY == y2) {
						LastRun = true;
					}
				}
			} 
		}
	});

	let TotalHits = 0;

	_.each(Graph, (Row) => {
		_.each(Row, (CurrentValue) => {
			if (CurrentValue > 1) {
				TotalHits++;
			}
		})
	})

	return TotalHits;
}