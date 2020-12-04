const RequiredFields = {
	byr: (Value) => ValidateYear(Value, 1920, 2002),
	iyr: (Value) => ValidateYear(Value, 2010, 2020),
	eyr: (Value) => ValidateYear(Value, 2020, 2030),
	hgt: (Value) => ValidateHeight(Value),
	hcl: (Value) => ValidateHairColor(Value),
	ecl: (Value) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(Value) > -1,
	pid: (Value) => Value.toString().length === 9
};
const OptionalFields = "cid";

$(function () {
	const FormattedInput = PrepData();

	// part 1
	const ValidPassports_1 = _.countBy(FormattedInput, (Passport) => {
		return IsValidPassport(Passport, false) ? "valid" : "invalid";
	});

	Solution1 = ValidPassports_1.valid;

	// part 2
	ValidPassports_2 = _.countBy(FormattedInput, (Passport) => {
		return IsValidPassport(Passport, true) ? "valid" : "invalid";
	});
	Solution2 = ValidPassports_2.valid;
});

function PrepData() {
	const FormattedInput = [];
	let CurrentIndex = 0;

	_.each(Input_04, (StringRow) => {
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

function IsValidPassport(Passport, ValidateFields) {
	const HasRequiredFields = _.every(RequiredFields, (_Validator, RequiredField) => {
		return Passport.indexOf(RequiredField) > -1;
	});

	if (!ValidateFields || !HasRequiredFields) {
		return HasRequiredFields;
	}

	const PassportFields = Passport.split(" ");

	return _.every(PassportFields, (Property) => {
		const PropertyParts = Property.split(":");
		const PropertyName = PropertyParts[0];
		const PropertyValue = PropertyParts[1];

		if (PropertyName === OptionalFields) {
			return true;
		}

		return RequiredFields[PropertyName](PropertyValue);
	});
}

// Part 2

function ValidateYear(Value, LowerBound, UpperBound) {
	if (Value.toString().length < 4) {
		return false;
	}

	Value = parseInt(Value);
	return Value >= LowerBound && Value <= UpperBound;
}

function ValidateHeight(Value) {
	Value = Value.toString();
	const IsCm = Value.indexOf("cm") > 0;
	const IsIn = Value.indexOf("in") > 0;

	if (!IsCm & !IsIn) {
		return false;
	}

	if (IsCm) {
		const IntValue = parseInt(Value.replace("cm", ""));
		return IntValue >= 150 && IntValue <= 193;
	} else {
		const IntValue = parseInt(Value.replace("in", ""));
		return IntValue >= 59 && IntValue <= 76;
	}
}

function ValidateHairColor(Value) {
	return /#([a-f,0-9])*/.test(Value);
}
