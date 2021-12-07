Input_14 = [
	"mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
	"mem[8] = 11",
	"mem[7] = 101",
	"mem[8] = 0"
];

$(function () {
	// part 1
	Solution1 = ReadBitmask(Input_14);

	// part 2
	Solution2 = ReadBitmask_02(Input_14);
});

// Part 1
function ReadBitmask(Instructions) {
	const Memory = {};
	let CurrentMask = [];

	_.each(Instructions, (Instruction) => {
		const IsMask = Instruction.indexOf("mask") === 0;

		if(IsMask) {
			const MaskPieces = /(mask = )([X10]*)/.exec(Instruction);
			CurrentMask = MaskPieces[2].split(""); // set the new mask
		} else {
			const MemoryPieces = /(mem\[)(\d*)(\] = )(\d*)/.exec(Instruction);
			const MemoryLocation = parseInt(MemoryPieces[2], 10);
			const DecimalValue = parseInt(MemoryPieces[4], 10);
			const BinaryValue = DecimalValue.toString(2);

			let MemoryArray = [];
			MemoryArray.length = 36;
			MemoryArray.fill(0);
			
			for(let i = BinaryValue.length - 1; i >= 0; i--) {
				const InputValue = BinaryValue.charAt(i);
				MemoryArray[MemoryArray.length - (BinaryValue.length - i)] = parseInt(InputValue, 10);
			}

			MemoryArray = ApplyMaskToValue(CurrentMask, MemoryArray);
			Memory[MemoryLocation] = parseInt(MemoryArray.join(""), 2);
		}
	});

	return _.reduce(Memory, (Total, CurrentValue) => {
		return CurrentValue + Total;
	}, 0);
}

function ApplyMaskToValue(CurrentMask, MemoryArray) {
	_.each(CurrentMask, (Value, Index) => {
		if(Value != "X") {
			Value = parseInt(Value, 10);
			MemoryArray[Index] = Value;
		}
	});

	return MemoryArray;
}

// Part 2
function ReadBitmask_02(Instructions) {

	Instructions = [
		"mask = 000000000000000000000000000000X1001X",
		"mem[42] = 100",
		"mask = 00000000000000000000000000000000X0XX",
		"mem[26] = 1",
	];
	let CurrentMask = [];
	const Memory = {};

	_.each(Instructions, (Instruction) => {
		const IsMask = Instruction.indexOf("mask") === 0;

		if (IsMask) {
			const MaskPieces = /(mask = )([X10]*)/.exec(Instruction);
			CurrentMask = MaskPieces[2].split(""); // set the new mask
		} else {
			const MemoryPieces = /(mem\[)(\d*)(\] = )(\d*)/.exec(Instruction);
			const MemoryLocation = parseInt(MemoryPieces[2], 10);
			const Value = parseInt(MemoryPieces[4], 10);
			const BinaryValue = MemoryLocation.toString(2);

			let MemoryArray = [];
			MemoryArray.length = 36;
			MemoryArray.fill(0);

			for (let i = BinaryValue.length - 1; i >= 0; i--) {
				const InputValue = BinaryValue.charAt(i);
				MemoryArray[MemoryArray.length - (BinaryValue.length - i)] = parseInt(InputValue, 10);
			}

			console.log({MemoryArray, MemoryLocation, BinaryValue})

			ApplyMaskToAddress(CurrentMask, MemoryArray, Value, Memory);
			// Memory[MemoryLocation] = parseInt(MemoryArray.join(""), 2);
		}
	});
}

function ApplyMaskToAddress(CurrentMask, MemoryArray, Value) {
	// const NumFloats = CurrentMask.match(/X/g).length;
	console.log({ Value, MemoryArray, CurrentMask });
	const FloatIndices = [];

	_.each(CurrentMask, (Bit, Index) => {
		if(Bit === "X") {
			// this is where we do our recursion later, for now just count it
			FloatIndices.push(Index);
		} else if (Bit === 0) {
			//do nothing
		} else if (Bit === 1) {
			//change the value to one
			MemoryArray[Index] = 1;
		}
	})

	console.log({FloatIndices})
}