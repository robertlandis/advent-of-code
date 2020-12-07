
$(function () {
	const FormattedInput = PrepData();
	console.log({ FormattedInput });
	// part 1
	const Count = _.reduce(
		FormattedInput,
		(Total, GroupData) => {
			return Total + CountGroupAnswers(GroupData);
		},
		0
	);
	Solution1 = Count;

	// part 2
	const Count_2 = _.reduce(
		FormattedInput,
		(Total, GroupData) => {
			return Total + CountGroupAnswers_2(GroupData);
		},
		0
	);
	Solution2 = Count_2;
});

function PrepData() {
	const FormattedInput = [];
	let CurrentIndex = 0;

	_.each(Input_06, (StringRow) => {
		StringRow = StringRow.trim();
		if (!StringRow) {
			FormattedInput[CurrentIndex] = FormattedInput[CurrentIndex].trim();
			CurrentIndex++;
		}

		if (!(CurrentIndex in FormattedInput)) {
			FormattedInput[CurrentIndex] = "";
		}

		FormattedInput[CurrentIndex] += ` ${StringRow}`;
	});

	FormattedInput[CurrentIndex] = FormattedInput[CurrentIndex].trim();

	return FormattedInput;
}

// Part 1
function CountGroupAnswers(GroupData) {
	const QuestionsAnswered = {};
	const GroupParts = GroupData.split(" ");

	_.each(GroupParts, (OnePerson) => {
		const Letters = OnePerson.split("");
		_.each(Letters, (Letter) => (QuestionsAnswered[Letter] = true));
	});

	return _.size(QuestionsAnswered);
}

// Part 2

function CountGroupAnswers_2(GroupData) {
	let QuestionsAnswered = [];
	const GroupParts = GroupData.split(" ");

	_.each(GroupParts, (OnePerson, Index) => {
		const Letters = OnePerson.split("");
		if (Index === 0) {
			QuestionsAnswered = Letters;
		}
		QuestionsAnswered = _.intersection(QuestionsAnswered, Letters);
	});

	console.log({ QuestionsAnswered });

	return _.size(QuestionsAnswered);
}
