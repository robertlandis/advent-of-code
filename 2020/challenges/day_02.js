$(function () {

	// part 1
	const ValidatedPasswords = _.countBy(Input_02, (FullString) => {
		const Parts = FullString.split(": ");
		return IsPasswordValid_1(Parts[0], Parts[1]) ? "valid" : "invalid";
	});
	Solution1 = ValidatedPasswords.valid;

	//part 2
	const ValidatedPasswords_2 = _.countBy(Input_02, (FullString) => {
		const Parts = FullString.split(": ");
		return IsPasswordValid_2(Parts[0], Parts[1]) ? "valid" : "invalid";
	});
	Solution2 = ValidatedPasswords_2.valid;
});

// Part 1

function IsPasswordValid_1(Policy, Password) {
	const PolicyParts = Policy.split(" ");
	const Bounds = PolicyParts[0].split("-");
	const RequiredLetter = PolicyParts[1];
	const PasswordParts = Password.split(RequiredLetter);
	return PasswordParts.length - 1 >= Bounds[0] && PasswordParts.length - 1 <= Bounds[1];
}

// Part 2

function IsPasswordValid_2(Policy, Password) {
	const PolicyParts = Policy.split(" ");
	const Positions = PolicyParts[0].split("-");
	const RequiredLetter = PolicyParts[1];
	let Matches = 0;

	_.each(Positions, (Position) => {
		const LetterAtPos = Password.charAt(Position - 1) === RequiredLetter;
		if(LetterAtPos) {
			Matches++;
		}
	});
	return Matches === 1 ? true : false;
}