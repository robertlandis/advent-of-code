const PrimaryBagToFind = "shiny gold bag";
let BagsSearched = {};

$(function () {
	// part 1
	Solution1 = CountPossibleCombos(PrimaryBagToFind) - 1;

	// part 2
	Solution2 = FindBagRequirements(PrimaryBagToFind) - 1;
});

// Part 1
function CountPossibleCombos(BagToFind) {
	let TotalCount = 0;

	_.each(Input_07, (BagIdentifier) => {
		const ContainsBag = BagIdentifier.indexOf(BagToFind) > -1;
		const BagParts = BagIdentifier.split(" bags");

		if (ContainsBag && !BagsSearched[BagParts[0]]) {
			TotalCount++;
			BagsSearched[BagParts[0]] = true;
			TotalCount += CountPossibleCombos(BagParts[0] + " bag");
		}
	})

	return TotalCount;
}

// Part 2

function FindBagRequirements(BagToFind) {
	let TotalCount = 0;
	const BagRequirements = _.find(Input_07, (BagRule) => {
		return BagRule.indexOf(BagToFind) == 0;
	});
	const BagParts = BagRequirements.replace(".", "").split(" contain ");
	const OtherBags = BagParts[1].split(",");

	_.each(OtherBags, (Bag) => {
		if(Bag === "no other bags") {
			return 0;
		}
		const ThisBagParts = /(\d+)\s(\w+\s\w+)/g.exec(Bag);
		const NumBags = parseInt(ThisBagParts[1], 10);
		const BagToSearch = ThisBagParts[2];

		const BagsInside = FindBagRequirements(BagToSearch + " bag");
		if(BagsInside) {
			TotalCount += (NumBags * BagsInside);
		} else {
			TotalCount += NumBags;
		}
	})

	return TotalCount + 1;
}