import { validateAdventurer, validateMountain, validateTreasure } from 'utils/validations/regex'

export function stringToArray(line: string): string[] {
  const array = line.split(/[- ]/).filter(Boolean)

  return array
}

export function mapValidation(mapLine: string, fileLineNumbers: number) {
  // Structure validation
  const REGEX_STRUCTURE_MAP_VALIDATION = /^[Cc]\s-\s[1-9]\s-\s[1-9]$/gm
  const isMapStructureValid = REGEX_STRUCTURE_MAP_VALIDATION.test(mapLine)

  // Rectangular shape
  const mapLineArray = stringToArray(mapLine)
  const firstNumber = Number(mapLineArray[1])
  const secondNumber = Number(mapLineArray[2])
  const isRectangularMap = firstNumber !== secondNumber

  // Checking the number of cells in the map and the number of elements
  const cellsTotal = firstNumber * secondNumber
  const isNumberOfElementsValid = cellsTotal > fileLineNumbers

  // console.log(`cellsTotal`, cellsTotal)
  // console.log(`fileLineNumbers`, fileLineNumbers)

  const isMapLineValid = isMapStructureValid && isRectangularMap && isNumberOfElementsValid

  // console.log(`isMapStructureValid`, isMapStructureValid)
  // console.log(`isRectangularMap`, isRectangularMap)
  // console.log(`isNumberOfElementsValid`, isNumberOfElementsValid)

  return isMapLineValid
}

export function elementsValidation(mapLines: string[], mapLine: string) {
  let isElementsValid = true

  // Map line
  const mapLineArray = stringToArray(mapLine)
  const mapLineFirstNumber = Number(mapLineArray[1])
  const mapLineSecondNumber = Number(mapLineArray[2])

  const coordsElements = mapLines.map((line: string) => {
    let coords

    // Check if elements structure are correct
    const isMountainStructureValid = validateMountain(line)
    const isTreasureStructureValid = validateTreasure(line)
    const isAdventurerStructureValid = validateAdventurer(line)

    console.log(`isMountainStructureValid`, isMountainStructureValid)
    console.log(`isTreasureStructureValid`, isTreasureStructureValid)
    console.log(`isAdventurerStructureValid`, isAdventurerStructureValid)
    console.log('---')

    if (!isMountainStructureValid && !isTreasureStructureValid && !isAdventurerStructureValid) {
      isElementsValid = false
    }

    // Check Duplicate
    if (/^[Aa]/.test(line)) {
      const adventurerLine = stringToArray(line)
      coords = adventurerLine[2] + adventurerLine[3]
    }

    if (/^[Mn]/.test(line) || /^[Tt]/.test(line)) {
      const elementLine = stringToArray(line)

      if (Number(elementLine[1]) > mapLineFirstNumber || Number(elementLine[2]) > mapLineSecondNumber) {
        isElementsValid = false
      }
      coords = elementLine[1] + elementLine[2]
    }

    // Check if there is another map line creation
    if (/^[Cc]/.test(line)) {
      isElementsValid = false
    }

    return coords
  })

  const isDuplicate = coordsElements.some((item, index) => index !== coordsElements.indexOf(item))

  if (isDuplicate) isElementsValid = false

  return isElementsValid
}

export function mountainValidation() {
  return true
}

// export function treasureValidation() {}

// export function adventurerValidation() {}
