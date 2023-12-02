import re

numAsWords = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}

def findNumCharInStr(strToParse, numsByIndex):
    for index, char in enumerate(strToParse):
            if(char.isnumeric()):
               numsByIndex[index] = int(char)
    return numsByIndex

def findWordCharInStr(strToParse, numsByIndex):
    for word in numAsWords:
            wordIndices = [m.start() for m in re.finditer(word, strToParse)]
            wordIndices.sort()
            for workIndex in wordIndices:
                numsByIndex[workIndex] = numAsWords[word]
    return numsByIndex
               
with open('./2023/day1/input.txt') as f:
    total = 0
    for lineCount, line in enumerate(f):
        lineToParse = line.strip()
         # get the numbers from the string
        numsByIndex = findNumCharInStr(lineToParse, {})
        numsByIndex = findWordCharInStr(lineToParse, numsByIndex)
        
        foundIndices = list(numsByIndex.keys())
        foundIndices.sort()
        
        firstNum = numsByIndex[foundIndices[0]]
        lastNum = numsByIndex[foundIndices[-1]]
        actualNum = (firstNum * 10) + lastNum
        total += actualNum
    print("Answer: " + str(total))
