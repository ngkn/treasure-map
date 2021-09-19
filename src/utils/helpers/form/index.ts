import AdventurerType from 'interfaces/AdventurerType'
import elementsInstructionsValidationType from 'interfaces/ElementsInstructionsValidationType'
import MountainType from 'interfaces/MountainType'
import TreasureType from 'interfaces/TreasureType'

import { validateAdventurer, validateMountain, validateTreasure } from 'utils/validations/regex'

/**
 * Gets several lines of string type and transforms it into an array
 * where each line becomes an item.
 *
 * @param {string} instructions Sequence of instructions in string type
 *
 * @returns {Array} Sequence of instructions in array
 */
export function instructionsToArray(instructions: string): string[] {
  const REGEX_DETECT_BREAKLINE = /^/gm
  const REGEX_DETECT_WHITESPACE = /(\r\n|\n|\r)/gm

  const instructionsArray = instructions.split(REGEX_DETECT_BREAKLINE)
  const instructionsWithoutWhitespace = instructionsArray
    .map((instruction) => instruction.replace(REGEX_DETECT_WHITESPACE, ''))
    .filter(Boolean)

  return instructionsWithoutWhitespace
}

/**
 * Gets one line of string type and transforms it into an array
 *
 * @param {string} line line of instruction in string type
 *
 * @returns {Array} Sequence of instructions in array
 */
export function stringToArray(line: string): string[] {
  const array = line.split(/[- ]/).filter(Boolean)

  return array
}

/**
 * Validate the instruction of the map creation by checking it
 * structure, shape, numbers of cells and elements
 *
 * @param {string} mapInstruction line of map instruction
 * @param {number} instructionsTotal total instructions
 *
 * @returns {Object} Empty object if map instruction isn't correct or not
 */
export function mapInstructionValidation(mapInstruction: string, instructionsTotal: number): Record<string, number> {
  let mapSize = {}
  // Structure validation
  const REGEX_STRUCTURE_MAP_VALIDATION = /^[Cc]\s-\s[1-9]\s-\s[1-9]$/gm
  const isMapStructureValid = REGEX_STRUCTURE_MAP_VALIDATION.test(mapInstruction)

  // Rectangular shape validation
  const mapInstructionArray = stringToArray(mapInstruction)
  const firstNumber = Number(mapInstructionArray[1])
  const secondNumber = Number(mapInstructionArray[2])
  const isRectangularMap = firstNumber !== secondNumber

  // Checking the number of cells in the map and the number of elements
  const cellsTotal = firstNumber * secondNumber
  const isNumberOfElementsValid = cellsTotal >= instructionsTotal

  const isMapInstructionValid = isMapStructureValid && isRectangularMap && isNumberOfElementsValid

  if (isMapInstructionValid) {
    mapSize = {
      width: firstNumber,
      length: secondNumber,
    }
  }

  return mapSize
}

/**
 * Validate instructions of elements by checking it
 *
 * @param {array} elementsInstructions list of instructions
 * @param {string} mapLineInstruction the instruction line that refers to the size of the map
 *
 * @returns {object} map instruction is correct or not
 */
export function elementsInstructionsValidation(
  elementsInstructions: string[],
  mapLineInstruction: string,
): elementsInstructionsValidationType {
  let isElementsValid = true
  const mountainsCoords: Array<MountainType> = []
  const treasuresCoords: Array<TreasureType> = []
  const adventurerCoords: Array<AdventurerType> = []

  const mapLineInstructionArray = stringToArray(mapLineInstruction)
  const mapInstructionWidthNumber = Number(mapLineInstructionArray[1]) - 1
  const mapInstructionLengthNumber = Number(mapLineInstructionArray[2]) - 1

  const coordsElements = elementsInstructions.map((instruction: string, index: number) => {
    let coords

    const elementInstruction = stringToArray(instruction)
    const isMapInstruction = /^[Cc]/.test(instruction)
    const isAdventurerInstruction = /^[Aa]/.test(instruction)
    const isMountainInstruction = /^[Mm]/.test(instruction)
    const isTreasureInstruction = /^[Tt]/.test(instruction)

    const isMountainStructureValid = validateMountain(instruction)
    const isTreasureStructureValid = validateTreasure(instruction)
    const isAdventurerStructureValid = validateAdventurer(instruction)

    const isOneStructureValid = isMountainStructureValid || isTreasureStructureValid || isAdventurerStructureValid

    const isMountainOrTreasureOutOfMapCoords =
      Number(elementInstruction[1]) > mapInstructionWidthNumber ||
      Number(elementInstruction[2]) > mapInstructionLengthNumber
    const isAdventurerOutOfMapCoords =
      Number(elementInstruction[2]) > mapInstructionWidthNumber ||
      Number(elementInstruction[3]) > mapInstructionLengthNumber

    // Check if elements structure are correct
    if (!isOneStructureValid) isElementsValid = false

    // Check if there is only one C line
    if (isMapInstruction) isElementsValid = false

    // check if coord element are not out of map coords
    if ((isMountainInstruction || isTreasureInstruction) && isMountainOrTreasureOutOfMapCoords) isElementsValid = false
    if (isAdventurerInstruction && isAdventurerOutOfMapCoords) isElementsValid = false

    const indexHorizontally = isAdventurerInstruction ? Number(elementInstruction[2]) : Number(elementInstruction[1])
    const indexVertically = isAdventurerInstruction ? Number(elementInstruction[3]) : Number(elementInstruction[2])

    // Get coords depends on element type
    if (isMountainInstruction) {
      coords = elementInstruction[1] + elementInstruction[2]

      mountainsCoords.push({
        id: `mountain-${index}`,
        horizontally: indexHorizontally,
        vertically: indexVertically,
        type: 'mountain',
      })
    }

    if (isTreasureInstruction) {
      coords = elementInstruction[1] + elementInstruction[2]

      treasuresCoords.push({
        idTreasure: `treasure-${index}`,
        horizontally: indexHorizontally,
        vertically: indexVertically,
        total: Number(elementInstruction[3]),
        type: 'treasure',
      })
    }

    if (isAdventurerInstruction) {
      coords = elementInstruction[2] + elementInstruction[3]

      adventurerCoords.push({
        id: `adventurer-${index}`,
        name: elementInstruction[1],
        horizontally: indexHorizontally,
        vertically: indexVertically,
        orientation: elementInstruction[4],
        movements: elementInstruction[5],
        priority: index + 1,
        treasureRecovered: 0,
        type: 'adventurer',
      })
    }

    return coords
  })

  // check if there is any duplicate coords
  const isDuplicate = coordsElements.some((item, index) => index !== coordsElements.indexOf(item))
  if (isDuplicate) isElementsValid = false

  return {
    mountains: mountainsCoords,
    treasures: treasuresCoords,
    adventurers: adventurerCoords,
    isValid: isElementsValid,
  }
}

/**
 * Checks the validity of the data
 *
 * @param {Array} instructions Sequence of instructions in array
 *
 * @returns {boolean} all instructions are valid or not
 */
export function instructionsValidation(
  instructions: string[],
): { mapValid: Record<string, number>; elementsValid: elementsInstructionsValidationType } | Record<string, never> {
  const instructionsCopy = [...instructions] // avoid side-effect, no change by reference
  const mapLineInstruction = instructionsCopy.shift() || ''
  const fileLineNumbers = instructionsCopy.length

  // Map line validation
  const mapValid = mapInstructionValidation(mapLineInstruction, fileLineNumbers)
  const isEmptyMapObect = Object.keys(mapValid).length === 0

  if (isEmptyMapObect) return {}

  // Elements lines validation
  const elementsValid = elementsInstructionsValidation(instructionsCopy, mapLineInstruction)

  return { mapValid, elementsValid }
}
