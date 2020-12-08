
$(function () {
	// part 1
	const { Acc } = FindAccValue()
	Solution1 = Acc;

	// part 2
	Solution2 = FixInstructions();
});

// Part 1

function FindAccValue() {
	let KeepRunning = true;
	let InstructionIndex = 0;
	const LastInstruction = Input_08.length;
	const InstructionsRun = {};
	let Acc = 0;
	let LastInstructionRan = false;

	do {
		if (InstructionIndex in InstructionsRun || InstructionIndex === LastInstruction) {
			KeepRunning = false;
		} else {
			InstructionsRun[InstructionIndex] = true;
			const ThisInstruction = Input_08[InstructionIndex];
			const [Instruction, Value] = ThisInstruction.split(" ");

			if (Instruction === "acc") {
				Acc += parseInt(Value, 10);
			}

			if (Instruction === "jmp") {
				InstructionIndex += parseInt(Value, 10);
			} else {
				InstructionIndex++;
			}
		}
	} while (KeepRunning);

	LastInstructionRan = InstructionIndex === LastInstruction;
	return { Acc, LastInstructionRan };
}

// Part 2
function FixInstructions() {
	for(let i = 0; i < Input_08.length - 1; i++) {
		const OriginalInstruction = Input_08[i];

		if(OriginalInstruction.indexOf("nop") > -1) {
			Input_08[i] = OriginalInstruction.replace("nop", "jmp");
		} else if (OriginalInstruction.indexOf("jmp") > -1) {
			Input_08[i] = OriginalInstruction.replace("jmp", "nop");
		}

		if(OriginalInstruction.indexOf("acc") === -1) {
			const { Acc, LastInstructionRan } = FindAccValue();
			if(LastInstructionRan) {
				return Acc;
			} else {
				Input_08[i] = OriginalInstruction;
			}
		}
	}
}