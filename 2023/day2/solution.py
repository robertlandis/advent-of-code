import re

maxNumColors = {
    "Red": 12,
    "Green": 13,
    "Blue": 14
}

def isValidGame(game):
    colorsShown = game.split(",")
    for color in colorsShown:
        [number, thisColor] = color.strip().split()
        if(int(maxNumColors[thisColor.capitalize()]) < int(number)):
            return False
    return True

def getSetsOfGames(lineToParse, currentGame):
    lineToParse = lineToParse.strip()
    lineWithoutGame = lineToParse.replace("Game " + str(currentGame) + ": ", "");
    return lineWithoutGame.split(";")

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

with open('input.txt') as input:
    part1(input)