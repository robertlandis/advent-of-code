import re

maxNumColors = {
    "red": 12,
    "green": 13,
    "blue": 14
}

def isValidGame(game):
    colorsShown = game.split(",")
    for color in colorsShown:
        [number, thisColor] = color.strip().split()
        if(int(maxNumColors[thisColor]) < int(number)):
            return False
    return True

def getSetsOfGames(lineToParse, currentGame):
    lineToParse = lineToParse.strip()
    lineWithoutGame = lineToParse.replace("Game " + str(currentGame) + ": ", "");
    return lineWithoutGame.split(";")

def getMinColorsByGame(game, minNumByColor):
    colorsShown = game.split(",")
    for color in colorsShown:
        [number, thisColor] = color.strip().split()
        if(minNumByColor[thisColor] < int(number)):
            minNumByColor[thisColor] = int(number)
    return minNumByColor

def part1(input): 
    total = 0
    currentGame = 1
    for line in input:
        setsOfGames = getSetsOfGames(line, currentGame)
        isValid = True
        for game in setsOfGames:
            isValid = isValidGame(game)
            if(isValid == False):
                break
        if(isValid):
            total += currentGame
        currentGame += 1
    print("Part 1 answer: " + str(total))

def part2(input):
    total = 0
    currentGame = 1
    for line in input:
        setsOfGames = getSetsOfGames(line, currentGame)
        minNumByColor = { "red": 0, "blue": 0, "green": 0 }
        for game in setsOfGames:
            minNumByColor = getMinColorsByGame(game, minNumByColor)
        power = minNumByColor["blue"] * minNumByColor["red"] * minNumByColor["green"]
        total += power
        currentGame += 1
    print("Part 2 answer: " + str(total))

with open('input.txt') as input:
    # part1(input)
    part2(input)