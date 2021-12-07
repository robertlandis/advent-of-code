// Input_NumsCalled = "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1";
// Input_04 = "22,13,17,11,0;8,2,23,4,24;21,9,14,16,7;6,10,3,18,5;1,12,20,15,19;end3,15,0,2,22;9,18,13,17,5;19,8,7,25,23;20,11,10,24,4;14,21,16,12,6;end14,21,17,24,4;10,16,15,9,19;18,8,23,26,20;22,11,13,6,5;2,0,12,3,7";
let CardsByIndex = {};
let WinningCards = [];

$(function () {
	// part 1
	console.log({ Input_NumsCalled, Input_04 });
	PrepData(Input_NumsCalled, Input_04);

	// const Results = CalculatePowerConsumption(Input_03);
	Solution1 = CallNumbers(Input_NumsCalled);

	// //part 2
	// Solution2 = Results.LifeSupport;
});

function PrepData(NumbersCalled, Cards) {
	Input_NumsCalled = NumbersCalled.split(",");
	Input_04 = Cards.split("end");

	_.each(Input_04, (IndividualCard, CardIndex) => {
		IndividualCard = IndividualCard.split(";");
		if (IndividualCard[IndividualCard.length - 1] == '') {
			IndividualCard.splice(IndividualCard.length - 1, 1);
		}

		CardsByIndex[CardIndex] = {
			Rows: {},
			Columns: {},
		};

		_.each(IndividualCard, (Row, RowIndex) => {
			Row = Row.split(",");
			CardsByIndex[CardIndex].Rows[RowIndex] = [...Row];

			_.each(Row, (RowNum, ColIndex) => {
				if (typeof CardsByIndex[CardIndex].Columns[ColIndex] === 'undefined') {
					CardsByIndex[CardIndex].Columns[ColIndex] = [];
				}
				CardsByIndex[CardIndex].Columns[ColIndex].push(RowNum);
			})
		});
	});
}

function CallNumbers(NumbersToCall) {
	let SumUnmarked = 0;
	let FinalNumber;
	let WinningCard;

	_.each(NumbersToCall, (NumberCalled) => {
		_.each(CardsByIndex, (Card, CardIndex) => {
			let Bingo = false;
			if(!WinningCard) {
				_.each(Card.Rows, (Row) => {
					const IndexOfNumber = _.indexOf(Row, NumberCalled);
					if (IndexOfNumber > -1) {
						Row.splice(IndexOfNumber, 1);
						Bingo = Row.length === 0;
					}
				});
				if (!Bingo) {
					_.each(Card.Columns, (Column) => {
						const IndexOfNumber = _.indexOf(Column, NumberCalled);
						if (IndexOfNumber > -1) {
							Column.splice(IndexOfNumber, 1);
							Bingo = Column.length === 0;
						}
					});
				}


				if (Bingo && _.indexOf(WinningCards, CardIndex) == -1) {
					console.log(_.size(CardsByIndex), WinningCards.length, Bingo, _.indexOf(WinningCards, CardIndex))
					// FinalNumber = NumberCalled;
					// WinningCard = CardIndex;
					if (WinningCards.length < _.size(CardsByIndex) - 1) {
						WinningCards.push(CardIndex);
					} else {
						console.log("winning card", { CardIndex, NumberCalled })
						WinningCard = CardIndex;
						FinalNumber = NumberCalled;
					}
				}
			}
			
			// return Bingo;
		});
	});

	_.each(CardsByIndex[WinningCard].Rows, (Row) => {
		SumUnmarked += _.reduce(Row, (Memo, Num) => parseInt(Num, 10) + Memo, 0);
	});

	return SumUnmarked * FinalNumber;
}