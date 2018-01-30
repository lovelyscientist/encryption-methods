class ColumnShuffleCipher {
	constructor () {}

	encrypt (originalString) {
		originalString = originalString.replace("Й",'*');
    
		let length = inputTableSize(originalString),
			generatedData = generateNewIndexes(length, originalString),
			encodedString = [],
			stringTable,
			shuffleArray;

		stringTable = generatedData.stringTable;
		shuffleArray = generatedData.shuffleArray;

		for (let i = 0; i < length; i++) { // put column on new generated indexes
			let newLine = [];

			for (let j = 0; j < length; j++) {
				newLine.push(stringTable[i][shuffleArray[j]]);
			}

			encodedString.push(newLine);
		}

		return tableToString(encodedString);
	}
}


class ColumnRawShuffleCipher {
	constructor () {}

	encrypt (originalString) {
		let columnEncodedString = encryptor.encrypt(originalString),
			length = inputTableSize(originalString),
			generatedData = generateNewIndexes(length, columnEncodedString),
			doubleEncodedString = [],
			stringTable,
			shuffleArray;

		stringTable = generatedData.stringTable;
		shuffleArray = generatedData.shuffleArray;
		
		for (let i = 0; i < length; i++) { // put column on new generated indexes
			doubleEncodedString.push(stringTable[shuffleArray[i]]);
		}

		return tableToString(doubleEncodedString);
	}
}


function generateNewIndexes (length, originalString) {
	let generatedNumbers = [0],
		shuffleArray = [],
		stringTable = [];

	for (let i = 0; i < length; i++) { // initialize two dimensional array 
		stringTable.push([]);
	}

	for (let i = 0; i < length; i++) { // fill with letters
		for (let j = 0; j < length; j++) {
			stringTable[i].push(originalString[i*length + j])
		}
	}

	for (let j = 0; j < length; j++) { // generate new index for each column
		let number = 0;

		while (generatedNumbers.includes(number) || (j === 0 && number === 1)) {
			number =  Math.floor(Math.random() * (length + 1));
		}

		shuffleArray.push(number - 1);
		generatedNumbers.push(number)
	}

	return {stringTable: stringTable, shuffleArray: shuffleArray};
}

function tableToString (string) {
	return string
		.reduce((arr1, arr2) => arr1.concat(arr2), [])
		.reduce((s1, s2) => s1 + s2);
}

function inputLength (string) {
	return string.legnth;
}

function inputTableSize (string) {
	return Math.floor(Math.sqrt(string.length));
}

let encryptor = new ColumnShuffleCipher(),
	rawEncryptor = new ColumnRawShuffleCipher();

console.log(encryptor.encrypt('ВОСПОЛЬЗУЙТЕСЬ_ПОДСКАЗКОЙ'));
console.log(rawEncryptor.encrypt('ВОСПОЛЬЗУЙТЕСЬ_ПОДСКАЗКОЙ'));